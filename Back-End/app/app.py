#Importando  flask y algunos paquetes
import csv
from flask import Flask, request, session, jsonify , g
from flask_cors import CORS
from flask_mysqldb import *
from flask_mail import Mail, Message
from werkzeug.security import *


app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'altamar_sunglases'

mysql = MySQL(app)

import re



app.secret_key = '97110c78ae51a45af397be6534caef90ebb9b1dcb3380af008f90b23a5d1616bf19bc29098105da20fe'


# Modulo Login 
@app.route('/login', methods=['POST'])

def login():

    if request.method == 'POST' and request.is_json:  # Verificar que la solicitud sea JSON

        data = request.get_json()  # Obtener los datos del cuerpo de la solicitud JSON
        correo = data.get('correo')
        password = data.get('password')

        # Consultar el correo en todas las tablas de usuarios usando UNION
        cursor = mysql.connection.cursor()
        
        cursor.execute('''
            SELECT  id, tipo_usuario, nombre, correo, password  FROM usuario WHERE correo = %s
            UNION
            SELECT  id, tipo_usuario, nombre, correo, password FROM administrador WHERE correo = %s
        ''', (correo, correo))

        usuario = cursor.fetchone()
        cursor.close()

        # Si los datos son válidos
        if usuario and check_password_hash(usuario[4], password):
            # Crear datos de sesión
            
            print("Usuario encontrado y contraseña coincidente")
            session['conectado'] = True
            session['id'] = usuario[0]
            session['tipo_usuario'] = usuario[1]
            session['nombre'] = usuario[2]
            session['email'] = usuario[3]
            print(session)

            response = {
                "message": "Logged in successfully",
                "dataLogin": {
                    "tipo_usuario": usuario[1],
                    "nombre": usuario[2],
                    "email": usuario[3],
                    "id": usuario[0]
                }
            }
            print(response)
            return jsonify(response), 200 
        else:
            print("Usuario o contraseña incorrectos")
            response = {
                "message": "Email o contraseña incorrectos"
            }
            print(response)
            return jsonify(response), 401
    else:
        response = {
            "message": "Solicitud incorrecta"
        }
        return jsonify(response), 400
    

###########################################################################################
@app.route('/cerrarsesion', methods=['POST'])
def cerrarsesion():
    try:
        return jsonify({"mensaje": "Sesión cerrada exitosamente"})

    except Exception as e:
        return jsonify({"informacion": str(e)})


##################################################################################################    
@app.route('/register_usuario', methods=['POST'])
def register_usuario():
    
    if request.method == 'POST' and request.is_json:
        
        data = request.get_json()  # Obtener los datos del cuerpo de la solicitud JSON
        tipo_user = 1
        nombre = data.get('nombre')
        correo = data.get('correo')
        password = data.get('password')

        cursor = mysql.connection.cursor()
        
        # Buscar si ya existe el correo ingresado en el formulario en la base de datos
        cursor.execute('''
                SELECT correo FROM usuario WHERE correo = %s
                UNION
                SELECT correo FROM administrador WHERE correo = %s
            ''', (correo, correo))

        usuario = cursor.fetchone()
        cursor.close()  # Cerrar la conexión SQL

        if usuario:
            response = {
                "message": "El correo ya está registrado"
            }
            
            return jsonify(response), 401  # Credenciales no validas
       
        else:
            # La cuenta no existe y los datos del formulario son válidos,
            # Crear contraseña encriptada

            password_encriptada = generate_password_hash(password, method='scrypt')
            
            # Conexión a la base de datos y guardar los datos de la cuenta creada
            cursor = mysql.connection.cursor()

            # Insertar en la base de datos
            cursor.execute('INSERT INTO usuario (nombre, correo, password, tipo_usuario) VALUES (%s, %s, %s, %s)',
                           (nombre, correo, password_encriptada, tipo_user))

            mysql.connection.commit()
            cursor.close()
            
            response = {

                "message": "Cliente registrado exitosamente"
            
            }
            
            return jsonify(response), 200
    else:
        response = {
            "message": "Solicitud incorrecta"
        }
        return jsonify(response), 400 
    
#############################################################################################################


@app.route('/añadir_producto', methods=['POST'])
def añadir_producto():
    if request.method == 'POST' and request.is_json:
        data = request.get_json()
        
        nombre_producto = data.get('nombre_producto')
        categoria = data.get('categoria')
        descripcion = data.get('descripcion')
        talla = data.get('talla')
        peso = data.get('peso')
        precio_unitario = data.get('precio_unitario')
        iva = data.get('iva')
        

        cursor = mysql.connection.cursor()
        
        cursor.execute('''
            INSERT INTO productos (nombre_producto, categoria, descripcion, talla, peso, precio_unitario, iva)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (nombre_producto, categoria,descripcion, talla, peso, precio_unitario, iva))

        mysql.connection.commit()
        cursor.close()

        response = {
            "message": "Producto añadido correctamente"
        }
        return jsonify(response), 200
    else:
        response = {
            "message": "Solicitud incorrecta"
        }
        return jsonify(response), 400


####################################################################################################
@app.route('/añadir_categoria', methods=['POST'])
def añadir_categoria():
    if request.method == 'POST' and request.is_json:
        data = request.get_json()
        
        nombre_categoria = data.get('nombre_categoria')
        
        cursor = mysql.connection.cursor()
        
        # Verificar si la categoría ya existe en la base de datos
        cursor.execute('SELECT id_categoria FROM categoria WHERE nombre_categoria = %s', (nombre_categoria,))
        existing_categoria = cursor.fetchone()

        if existing_categoria:
            cursor.close()
            response = {
                "message": "La categoría ya existe"
            }
            return jsonify(response), 400

        # Insertar la categoría solo si no existe
        cursor.execute('''
            INSERT INTO categoria (nombre_categoria)
            VALUES (%s)
        ''', (nombre_categoria,))
        
        mysql.connection.commit()
        cursor.close()

        response = {
            "message": "Categoría añadida correctamente"
        }
        return jsonify(response), 200
    else:
        response = {
            "message": "Solicitud incorrecta"
        }
        return jsonify(response), 400


 ###################################################################################################   

@app.route('/ver_usuarios', methods=['GET'])
def ver_usuarios():
    cursor = mysql.connection.cursor()

    # Consultar todos los servicios solicitados por los clientes
    cursor.execute('''
        SELECT  id, nombre, correo FROM usuario
    ''')

    usuarios = cursor.fetchall()
    print(usuarios)

    cursor.close()

    if usuarios:
        # Mapeo de los resultados de la consulta a un diccionario por cada servicio
        usuarios_list = []
        for usuarios in usuarios:
            usuarios_dict = {
                "id": usuarios[0],
                "nombre": usuarios[1],
                "correo": usuarios[2]  # Formatear la fecha al formato deseado
                
            }
            usuarios_list.append(usuarios_dict)

        # Crear la respuesta con la lista de servicios
        response = {
            "usuarios": usuarios_list
        }
        return jsonify(response), 200
    else:
        response = {
            "message": "No se encontraron usuarios"
        }
        return jsonify(response), 404


    
##############################################################################################################    

@app.route('/ver_productos', methods=['GET'])
def ver_productos():
    cursor = mysql.connection.cursor()

    # Consultar todos los servicios solicitados por los clientes
    cursor.execute('''
        SELECT  id_producto, nombre_producto, descripcion, talla, peso, precio_unitario, iva, categoria FROM productos
    ''')

    productos = cursor.fetchall()
    print(productos)

    cursor.close()

    if productos:
        # Mapeo de los resultados de la consulta a un diccionario por cada servicio
        productos_list = []
        for productos in productos:
            productos_dict = {
                "id": productos[0],
                "nombre_producto": productos[1],
                "descripcion": productos[2],  # Formatear la fecha al formato deseado
                "talla": productos[3],
                "precio": productos[4],
                "iva": productos[5],
                "categoria": productos[6]
            }
            productos_list.append(productos_dict)

        # Crear la respuesta con la lista de servicios
        response = {
            "productos": productos_list
        }
        return jsonify(response), 200
    else:
        response = {
            "message": "No se encontraron productos"
        }
        return jsonify(response), 404
    
 
################################################################################################    


@app.route('/ver_categorias', methods=['GET'])
def ver_categorias():
    cursor = mysql.connection.cursor()

    # Consultar todos los servicios solicitados por los clientes
    cursor.execute('''
        SELECT  id_categoria, nombre_categoria FROM categoria
    ''')

    categoria = cursor.fetchall()
    print(categoria)

    cursor.close()

    if categoria:
        # Mapeo de los resultados de la consulta a un diccionario por cada servicio
        categoria_list = []
        for categoria in categoria:
            categoria_dict = {
                "id_categoria": categoria[0],
                "nombre_categoria": categoria[1]
            }
            categoria_list.append(categoria_dict)

        # Crear la respuesta con la lista de servicios
        response = {
            "categorias": categoria_list
        }
        return jsonify(response), 200
    else:
        response = {
            "message": "No se encontraron productos"
        }
        return jsonify(response), 404
    
 
################################################################################################ 


@app.route('/update/<id>', methods=['PUT'])
def update_contact(id):
    try:
        id = request.json['id']
        nombre_producto = request.json['nombre_producto']
        descripcion = request.json['descripcion']      
        talla = request.json['talla']
        precio = request.json['precio']  
        iva = request.json['iva']  
        categoria = request.json['categoria'] 
        cur = mysql.connection.cursor()
        cur.execute("""
        UPDATE productos
        SET id = %s,
            nombre_producto = %s,
            descripcion = %s,
            talla = %s,
            precio = %s,
            iva = %s,
            categoria = %s
        WHERE id = %s
        """, (nombre_producto, descripcion, talla, precio, iva, categoria))
        mysql.connection.commit()
        return jsonify({"informacion":"Producto actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})



@app.route('/delete/<id>', methods = ['DELETE'])
def delete_contact(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM productos WHERE id = %s', (id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
######################################################################    


if __name__ == '__main__':
    app.run(debug=True, port=8000)

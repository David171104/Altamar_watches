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
def add_producto():
    if request.method == 'POST' and request.is_json:
        data = request.get_json()
        
        nombre_producto = data.get('nombre_producto')
        descripcion = data.get('descripcion')
        talla = data.get('talla')
        peso = data.get('peso')
        precio_unitario = data.get('precio_unitario')
        iva = data.get('iva')
        categoria = data.get('categoria')

        cursor = mysql.connection.cursor()
        
        cursor.execute('''
            INSERT INTO productos (nombre_producto, descripcion, talla, peso, precio_unitario, iva)
            VALUES (%s, %s, %s, %s, %s, %s)
        ''', (nombre_producto, descripcion, talla, peso, precio_unitario, iva))

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



if __name__ == '__main__':
    app.run(debug=True, port=8000)

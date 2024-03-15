-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-03-2024 a las 12:34:53
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `altamar_sunglases`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id` int(11) NOT NULL,
  `nombre` char(255) NOT NULL,
  `correo` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  `tipo_usuario` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id`, `nombre`, `correo`, `password`, `tipo_usuario`) VALUES
(3, 'Pons', 'pons@gmail.com', 'scrypt:32768:8:1$wmfJ0t3VfT99PTDX$67f49d36db6dc27df6cc99e1eb486b2c03ec1327f978fd948a90c7f8435c3780346f42740b1e397e2a8935aa1d2a17d07fccdb2a78b8e2bbeb31186459e03d6a', 2),
(4, 'Rony', 'rony@gmail.com', 'scrypt:32768:8:1$uGVklpfbvDemv0sJ$777df169d99e28c9791c3bb1e4d90f002b3def7983e515d9b07b8adc477f8ca7a1c1f6d529de415465f8a85c74c76ec27ed38f036b30f414b9524b9bbfb47bca', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_carrito` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `nombre_categoria` char(255) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`nombre_categoria`, `id_categoria`) VALUES
('solar', 1),
('Casual', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `nombre_producto` char(255) NOT NULL,
  `descripcion` char(255) NOT NULL,
  `talla` varchar(25) NOT NULL,
  `peso` varchar(25) NOT NULL,
  `precio_unitario` int(11) NOT NULL,
  `iva` int(11) NOT NULL,
  `categoria` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`nombre_producto`, `descripcion`, `talla`, `peso`, `precio_unitario`, `iva`, `categoria`, `id_producto`) VALUES
('gafas de sol', 'Gafas de sol excelentes para la ocasion', 'XL', '4GR', 50000, 19, 1, 7),
('gafas scotly', 'gafas de sol para cualquier ocasion', 'l', '2gr', 20000, 10, 1, 8),
('gafas stranger', 'tienen un estilo casual y elegante', 'XL', '2gr', 15000, 10, 1, 9),
('Gafas Lexus', 'las mejores', 'm', '2gr', 10000, 10, 2, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `nombre` char(255) NOT NULL,
  `correo` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  `tipo_usuario` tinyint(1) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`nombre`, `correo`, `password`, `tipo_usuario`, `id`) VALUES
('Aurelio Villegas', 'aurelio@gmail.com', 'scrypt:32768:8:1$pOY0DXETOgiQWB4z$12de7ce2b556ec74e741aaa22b258e7234896400a56e95189115128cea35d260300125c0d23352042de01029d4bf474fce7d69ef2b5835476ebfc17d188a280d', 1, 1),
('Shirly Almanza', 'shirly@gmail.com', 'scrypt:32768:8:1$3OwVKk5epNv00VYT$0bbdb63baf8aac788b8e2a1a4fb074ebddfda5976d1617679d9751d7245bc586f5adf61996ad78f4db1c5c4ac2d61c4c77e5de95279aae33e1bffaf36da6fca0', 1, 2),
('Aliendro', 'aliendro@gmail.com', 'scrypt:32768:8:1$a3QnbIvJDA9guDrB$5f91f54a1e67e39cf4ed0797d29fad0848c3b864d8dfcc2f9965dd2468f20897e9dc25ba7088106486587114e71232d0c04e6809ffb946a1401b4b56ac7ab822', 1, 3),
('alfredo altamar', 'alfredo@gmail.com', 'scrypt:32768:8:1$s2tbWKKEZFh1jr2Y$2f881f416a16362c63a2029b1d43f304fe7714d4a1ca332d701face7d617199f20463e226bdb9f05309e39d8be1a025f0d15d3394a7c83811f67476586135435', 1, 5),
('Santiago', 'santiago@gmail.com', 'scrypt:32768:8:1$FpkE5LZD7bshiWkl$0bd3bb39cd44846d8602b1853941d92b059e5b98457c331d6db83c62b2919fc803c201ed16f4f1ee703862bbadaf2aed7f0dfe04040362d2c66e81458146e761', 1, 7),
('Shirley Eugenia', 'shirly1@gmail.com', 'scrypt:32768:8:1$42Od3KshzIt9w6cy$9d6adc9f989f06ff1cbde752027fd18583563f84cc450635341a7bc20e02aa6f5be96bd3f448322ff1939732682d1a0970ff8f3abc62b0fca748c37c0f806b2d', 1, 8),
('reynel', 'reynel@gmail.com', 'scrypt:32768:8:1$Fadud2WEkY7XPdTN$6c459201afa03a7deb7bc7df891fa307c358f028697867ed65e24cf0d10eb8887f9107cf25cae41d4c846598a1f2d2f7357d2614c7f4747a63bbdca64da78ec5', 1, 9);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `categoria` (`categoria`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

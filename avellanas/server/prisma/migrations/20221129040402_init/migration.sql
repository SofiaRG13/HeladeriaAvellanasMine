-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `apellido1` VARCHAR(191) NULL,
    `apellido2` VARCHAR(191) NULL,
    `contrasenna` VARCHAR(191) NOT NULL,
    `rol` ENUM('Administrador', 'Mesero', 'Cliente') NOT NULL DEFAULT 'Cliente',
    `idRestaurante` INTEGER NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Restaurante_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `estado` ENUM('Desocupada', 'Ocupada', 'Reservada', 'Inactiva', 'Por_Pagar', 'Pedido_Registrado') NOT NULL DEFAULT 'Desocupada',
    `capacidad` INTEGER NOT NULL,
    `idRestaurante` INTEGER NOT NULL,

    UNIQUE INDEX `Mesa_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `ingredientes` VARCHAR(191) NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `idCategoria` INTEGER NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoCategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `estado` ENUM('Registrada', 'En_Proceso', 'Pendiente', 'Entregada', 'Por_Pagar') NOT NULL DEFAULT 'Registrada',
    `tipoPedido` ENUM('En_linea', 'En_Restaurante') NOT NULL DEFAULT 'En_Restaurante',
    `idMesa` INTEGER NULL,
    `fechaPedido` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `descuento` DECIMAL(10, 2) NOT NULL,
    `impuesto` DECIMAL(10, 2) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetallePedido` (
    `idProducto` INTEGER NOT NULL,
    `idPedido` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `notas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPedido`, `idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `descuento` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CuponUsuario` (
    `idUsuario` INTEGER NOT NULL,
    `idCupon` INTEGER NOT NULL,
    `estado` ENUM('Activo', 'Inactivo', 'Vencido') NOT NULL DEFAULT 'Activo',

    PRIMARY KEY (`idUsuario`, `idCupon`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPedido` INTEGER NOT NULL,
    `tipoPago` ENUM('Efectivo', 'Tarjeta') NOT NULL DEFAULT 'Tarjeta',
    `totalPago` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductoToRestaurante` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductoToRestaurante_AB_unique`(`A`, `B`),
    INDEX `_ProductoToRestaurante_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idRestaurante_fkey` FOREIGN KEY (`idRestaurante`) REFERENCES `Restaurante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mesa` ADD CONSTRAINT `Mesa_idRestaurante_fkey` FOREIGN KEY (`idRestaurante`) REFERENCES `Restaurante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `ProductoCategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_idMesa_fkey` FOREIGN KEY (`idMesa`) REFERENCES `Mesa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetallePedido` ADD CONSTRAINT `DetallePedido_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetallePedido` ADD CONSTRAINT `DetallePedido_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CuponUsuario` ADD CONSTRAINT `CuponUsuario_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CuponUsuario` ADD CONSTRAINT `CuponUsuario_idCupon_fkey` FOREIGN KEY (`idCupon`) REFERENCES `Cupon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductoToRestaurante` ADD CONSTRAINT `_ProductoToRestaurante_A_fkey` FOREIGN KEY (`A`) REFERENCES `Producto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductoToRestaurante` ADD CONSTRAINT `_ProductoToRestaurante_B_fkey` FOREIGN KEY (`B`) REFERENCES `Restaurante`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

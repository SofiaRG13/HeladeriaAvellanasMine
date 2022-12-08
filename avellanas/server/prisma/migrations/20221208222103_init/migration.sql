-- AlterTable
ALTER TABLE `pago` MODIFY `tipoPago` ENUM('Efectivo', 'Tarjeta', 'Ambas') NOT NULL DEFAULT 'Tarjeta';

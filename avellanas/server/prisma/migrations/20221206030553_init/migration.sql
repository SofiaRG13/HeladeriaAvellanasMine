/*
  Warnings:

  - The values [En_Proceso,Pendiente,Por_Pagar] on the enum `Pedido_estado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `pedido` MODIFY `estado` ENUM('Registrada', 'Por_Entregar', 'Entregada', 'Pagada') NOT NULL DEFAULT 'Registrada';

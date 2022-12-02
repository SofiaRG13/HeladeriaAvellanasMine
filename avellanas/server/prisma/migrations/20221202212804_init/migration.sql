/*
  Warnings:

  - The values [Reservada,Por_Pagar,Pedido_Registrado] on the enum `Mesa_estado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `mesa` MODIFY `estado` ENUM('Desocupada', 'Ocupada', 'Inactiva') NOT NULL DEFAULT 'Desocupada';

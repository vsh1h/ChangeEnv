-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'SELL';

-- AlterTable
ALTER TABLE "eco_actions" ADD COLUMN     "carbon_impact" DOUBLE PRECISION NOT NULL DEFAULT 0;

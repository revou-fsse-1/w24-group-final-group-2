-- CreateEnum
CREATE TYPE "StatusPaid" AS ENUM ('unpaid', 'paid');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "statusPaid" "StatusPaid" NOT NULL DEFAULT 'unpaid';

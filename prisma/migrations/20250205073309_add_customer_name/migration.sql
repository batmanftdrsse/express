/*
  Warnings:

  - A unique constraint covering the columns `[tracking_code]` on the table `email_sequences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_name` to the `email_sequences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email_sequences" ADD COLUMN     "amount" INTEGER,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "paid_at" TIMESTAMP(3),
ADD COLUMN     "payment_method" TEXT,
ADD COLUMN     "shipping_address" JSONB,
ADD COLUMN     "tracking_code" TEXT,
ADD COLUMN     "transaction_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "email_sequences_tracking_code_key" ON "email_sequences"("tracking_code");

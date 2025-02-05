/*
  Warnings:

  - You are about to drop the `EmailLogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmailSequences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailLogs" DROP CONSTRAINT "EmailLogs_sequence_id_fkey";

-- DropTable
DROP TABLE "EmailLogs";

-- DropTable
DROP TABLE "EmailSequences";

-- CreateTable
CREATE TABLE "email_sequences" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "customer_email" TEXT NOT NULL,
    "current_step" INTEGER NOT NULL DEFAULT 1,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'active',
    "last_email_sent_at" TIMESTAMP(3),

    CONSTRAINT "email_sequences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_logs" (
    "id" SERIAL NOT NULL,
    "sequence_id" INTEGER NOT NULL,
    "step" INTEGER NOT NULL,
    "email_type" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "customer_email" TEXT NOT NULL,

    CONSTRAINT "email_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_sequences_customer_id_order_id_key" ON "email_sequences"("customer_id", "order_id");

-- AddForeignKey
ALTER TABLE "email_logs" ADD CONSTRAINT "email_logs_sequence_id_fkey" FOREIGN KEY ("sequence_id") REFERENCES "email_sequences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

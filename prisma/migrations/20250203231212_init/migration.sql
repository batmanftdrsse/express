-- CreateTable
CREATE TABLE "EmailSequences" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "current_step" INTEGER NOT NULL DEFAULT 1,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'active',
    "last_email_sent_at" TIMESTAMP(3),

    CONSTRAINT "EmailSequences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailLogs" (
    "id" SERIAL NOT NULL,
    "sequence_id" INTEGER NOT NULL,
    "step" INTEGER NOT NULL,
    "email_type" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT,
    "customer_email" TEXT NOT NULL,

    CONSTRAINT "EmailLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailSequences_customer_id_order_id_key" ON "EmailSequences"("customer_id", "order_id");

-- AddForeignKey
ALTER TABLE "EmailLogs" ADD CONSTRAINT "EmailLogs_sequence_id_fkey" FOREIGN KEY ("sequence_id") REFERENCES "EmailSequences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

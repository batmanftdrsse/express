-- CreateTable
CREATE TABLE "funnel_templates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "payment_method" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funnel_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funnel_steps" (
    "id" SERIAL NOT NULL,
    "funnel_template_id" INTEGER NOT NULL,
    "step_number" INTEGER NOT NULL,
    "email_subject" TEXT NOT NULL,
    "email_template" TEXT NOT NULL,
    "delay_hours" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funnel_steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "funnel_steps" ADD CONSTRAINT "funnel_steps_funnel_template_id_fkey" FOREIGN KEY ("funnel_template_id") REFERENCES "funnel_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

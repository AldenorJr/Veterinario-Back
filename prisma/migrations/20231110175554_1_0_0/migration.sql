-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ESTUDANTE');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'ESTUDANTE',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animals" (
    "id" TEXT NOT NULL,
    "tutor_name" TEXT NOT NULL,
    "pet_name" TEXT NOT NULL,
    "andress" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "race" TEXT,
    "years" TEXT NOT NULL,
    "detail_routine" TEXT NOT NULL,
    "detail_sexo" TEXT NOT NULL,
    "detail_reproduction" TEXT NOT NULL,
    "detail_verme" TEXT NOT NULL,
    "detail_vacine" TEXT NOT NULL,
    "detail_veterine" TEXT NOT NULL,
    "detail_porte" TEXT NOT NULL,
    "detail_pelo" TEXT NOT NULL,
    "detail_saude" TEXT NOT NULL,
    "detail_providencia" TEXT NOT NULL,
    "frequencia_cardiaca" TEXT NOT NULL,
    "frequencia_respiratoria" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

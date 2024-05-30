-- CreateTable
CREATE TABLE "paciente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "sucursalId" INTEGER NOT NULL,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signo_vital" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "minimo" TEXT NOT NULL,
    "maximo" TEXT NOT NULL,
    "sucursalId" INTEGER NOT NULL,

    CONSTRAINT "signo_vital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "control" (
    "id" SERIAL NOT NULL,
    "id_paciente" INTEGER NOT NULL,
    "id_signo_vital" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" DOUBLE PRECISION NOT NULL,
    "valor" INTEGER NOT NULL,
    "sucursalId" INTEGER NOT NULL,

    CONSTRAINT "control_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sucursal" (
    "id" SERIAL NOT NULL,
    "origen" TEXT NOT NULL,
    "destino" TEXT NOT NULL,

    CONSTRAINT "sucursal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "paciente" ADD CONSTRAINT "paciente_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signo_vital" ADD CONSTRAINT "signo_vital_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "control" ADD CONSTRAINT "control_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "control" ADD CONSTRAINT "control_id_signo_vital_fkey" FOREIGN KEY ("id_signo_vital") REFERENCES "signo_vital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "control" ADD CONSTRAINT "control_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

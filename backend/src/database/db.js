import { Prisma, PrismaClient } from "../generated/prisma/index.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do caminho do banco para Electron
const dbPath = process.env.DATABASE_URL || `file:${path.join(__dirname, 'dev.db')}`;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbPath
    }
  }
});
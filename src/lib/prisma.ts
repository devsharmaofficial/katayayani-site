import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const connectionUrl = process.env.DATABASE_URL || 'file:./dev.db';

const adapter = new PrismaLibSql({
  url: connectionUrl,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

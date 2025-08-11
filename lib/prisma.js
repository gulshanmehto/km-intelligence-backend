import { PrismaClient } from '@prisma/client';

// In development, it's important to prevent creating multiple instances
// of PrismaClient which can happen when Next.js reloads modules.
let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };

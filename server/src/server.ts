import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

// Fastify - framework back-end
const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get('/hello', async () => {
  const habits = await prisma.habits.findMany();

  return habits;
});

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server is running on port 3333! 🚀');
});

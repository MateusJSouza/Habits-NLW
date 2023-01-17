import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes';

// Fastify - framework back-end
const app = Fastify();

app.register(cors);
app.register(appRoutes);

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server is running on port 3333! 🚀');
});

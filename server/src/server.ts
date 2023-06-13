import 'dotenv/config'
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

console.log(resolve(__dirname, '../uploads'))


app.register(cors, {
  origin: true
})

app.register(jwt, {
  secret: 'spacetime'
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0'
  })
  .then(() => {
    console.log('🚀 Running on http://localhost:3333')
  })

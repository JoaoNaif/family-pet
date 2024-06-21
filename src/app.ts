import fastify from 'fastify'
import { orgsRoutes } from './http/controller/orgs/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { petsRoutes } from './http/controller/pets/routes'

export const app = fastify()

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .send(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})

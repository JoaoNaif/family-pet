import { FastifyInstance } from 'fastify'
import { create } from './create'
import { login } from './login'
import { nearby } from './nearby'
import { contact } from './contact'

export const orgsRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', create)
  app.post('/sessions', login)

  app.get('/orgs/nearby', nearby)
  app.get('/orgs/contact', contact)
}

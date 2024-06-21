import { FastifyInstance } from 'fastify'
import { create } from './create'
import { breed } from './breed'
import { city } from './city'
import { size } from './size'

export const petsRoutes = async (app: FastifyInstance) => {
  app.post('/orgs/:orgId/pets', create)

  app.get('/pets/breed', breed)
  app.get('/pets/city', city)
  app.get('/pets/size', size)
}

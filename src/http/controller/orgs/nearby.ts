import { makeFetchOrgNearbyUseCase } from '@/use-case/factories/make-fetch-org-nearby'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const nearby = async (request: FastifyRequest, reply: FastifyReply) => {
  const nearbyOrgsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyOrgsQuerySchema.parse(request.query)

  const searchOrgUseCase = makeFetchOrgNearbyUseCase()

  const { orgs } = await searchOrgUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    orgs,
  })
}

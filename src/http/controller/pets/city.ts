import { makeFetchForCityUseCase } from '@/use-case/factories/make-fetch-for-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const city = async (request: FastifyRequest, reply: FastifyReply) => {
  const cityPetQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page } = cityPetQuerySchema.parse(request.query)

  const fetchCityUseCase = makeFetchForCityUseCase()

  const { pets } = await fetchCityUseCase.execute({
    city,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}

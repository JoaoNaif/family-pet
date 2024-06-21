import { makeFetchBreedUseCase } from '@/use-case/factories/make-fetch-breed'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const breed = async (request: FastifyRequest, reply: FastifyReply) => {
  const breedPetQuerySchema = z.object({
    breed: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { breed, page } = breedPetQuerySchema.parse(request.query)

  const breedPetUseCase = makeFetchBreedUseCase()

  const { pets } = await breedPetUseCase.execute({
    breed,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}

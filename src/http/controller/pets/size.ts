import { makeFetchSizeUseCase } from '@/use-case/factories/make-fetch-size'
import { Size } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const size = async (request: FastifyRequest, reply: FastifyReply) => {
  const sizePetQuerySchema = z.object({
    size: z.nativeEnum(Size),
    page: z.coerce.number().min(1).default(1),
  })

  const { size, page } = sizePetQuerySchema.parse(request.query)

  const sizePetUseCase = makeFetchSizeUseCase()

  const { pets } = await sizePetUseCase.execute({
    size,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}

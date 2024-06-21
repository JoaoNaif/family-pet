import { makeCreatePetUseCase } from '@/use-case/factories/make-create-pet'
import { Size } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createPetBodySchema = z.object({
    name: z.string(),
    breed: z.string(),
    description: z.string(),
    size: z.nativeEnum(Size),
  })

  const createPetBodyParams = z.object({
    orgId: z.string().uuid(),
  })

  const { name, breed, description, size } = createPetBodySchema.parse(
    request.body,
  )

  const { orgId } = createPetBodyParams.parse(request.params)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    breed,
    description,
    size,
    orgId,
  })

  return reply.status(201).send()
}

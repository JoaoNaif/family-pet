import { OrgAlreadyExistError } from '@/use-case/error/org-already-exist'
import { makeCreateOrgUseCase } from '@/use-case/factories/make-create-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createOrgBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    phone: z
      .string()
      .length(11)
      .regex(/^\d{11}$/),
    name: z.string().min(2),
    city: z.string(),
    address: z.string(),
    state: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const {
    email,
    password,
    phone,
    name,
    city,
    address,
    state,
    latitude,
    longitude,
  } = createOrgBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute({
      email,
      password,
      phone,
      name,
      city,
      address,
      state,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}

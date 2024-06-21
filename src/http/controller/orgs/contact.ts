import { makeGetContactOrgUseCase } from '@/use-case/factories/make-get-contact-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const contact = async (request: FastifyRequest, reply: FastifyReply) => {
  const contactOrgQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = contactOrgQuerySchema.parse(request.query)

  const getContact = makeGetContactOrgUseCase()

  const { address, phone } = await getContact.execute({
    id,
  })

  return reply.status(200).send({
    phone,
    address,
  })
}

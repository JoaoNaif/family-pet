import { InvalidCredentialsError } from '@/use-case/error/invalid-credentials-error'
import { makeLoginUseCase } from '@/use-case/factories/make-login'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const loginBodyUseCase = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = loginBodyUseCase.parse(request.body)

  try {
    const loginUseCase = makeLoginUseCase()

    const { org } = await loginUseCase.execute({
      email,
      password,
    })

    return reply.status(200).send({ org })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}

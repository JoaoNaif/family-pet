import { OrgRepository } from '@/repositories/org-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error'

interface LoginUseCaseRequest {
  email: string
  password: string
}

interface LoginUseCaseReponse {
  org: Org
}

export class LoginUseCase {
  constructor(private orgsRepository: OrgRepository) {}

  async execute({
    email,
    password,
  }: LoginUseCaseRequest): Promise<LoginUseCaseReponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}

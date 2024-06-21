import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { LoginUseCase } from '../login'

export function makeLoginUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const loginUseCase = new LoginUseCase(orgsRepository)

  return loginUseCase
}

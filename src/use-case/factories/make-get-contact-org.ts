import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetContactOrg } from '../get-contact-org'

export function makeGetContactOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepostory = new PrismaPetsRepository()
  const getContactOrgUseCase = new GetContactOrg(petsRepostory, orgsRepository)

  return getContactOrgUseCase
}

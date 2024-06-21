import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchForCityUseCase } from '../fetch-for-city'

export function makeFetchForCityUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepostory = new PrismaPetsRepository()
  const fetchForCityUseCase = new FetchForCityUseCase(
    orgsRepository,
    petsRepostory,
  )

  return fetchForCityUseCase
}

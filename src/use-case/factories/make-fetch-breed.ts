import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchBreedUseCase } from '../fetch-breed'

export function makeFetchBreedUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchBreedUseCase = new FetchBreedUseCase(petsRepository)

  return fetchBreedUseCase
}

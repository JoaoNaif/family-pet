import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchSizeUseCase } from '../fetch-size'

export function makeFetchSizeUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchSizeUseCase = new FetchSizeUseCase(petsRepository)

  return fetchSizeUseCase
}

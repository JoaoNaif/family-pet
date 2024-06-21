import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface FetchBreedUseCaseRequest {
  breed: string
  page: number
}

interface FetchBreedUseCaseResponse {
  pets: Pet[]
}

export class FetchBreedUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    breed,
    page,
  }: FetchBreedUseCaseRequest): Promise<FetchBreedUseCaseResponse> {
    const pets = await this.petsRepository.findManyByBreed(breed, page)

    return { pets }
  }
}

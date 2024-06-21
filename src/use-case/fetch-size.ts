import { PetRepository } from '@/repositories/pet-repository'
import { Pet, Size } from '@prisma/client'

interface FetchSizeUseCaseRequest {
  size: Size
  page: number
}

interface FetchSizeUseCaseResponse {
  pets: Pet[]
}

export class FetchSizeUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    size,
    page,
  }: FetchSizeUseCaseRequest): Promise<FetchSizeUseCaseResponse> {
    const pets = await this.petsRepository.findManyBySize(size, page)

    return { pets }
  }
}

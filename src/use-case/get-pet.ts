import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { PetDoesNotExistError } from './error/pet-does-not-exist'

interface GetPetUseCaseRequest {
  id: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new PetDoesNotExistError()
    }

    return { pet }
  }
}

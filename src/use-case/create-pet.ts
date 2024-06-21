import { OrgRepository } from '@/repositories/org-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { Pet, Size } from '@prisma/client'
import { OrgDoesNotExist } from './error/org-does-not-exist'

interface CreatePetUseCaseRequest {
  name: string
  breed: string
  description?: string
  orgId: string
  size: Size
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: OrgRepository,
    private petsRepostory: PetRepository,
  ) {}

  async execute({
    name,
    breed,
    orgId,
    description,
    size,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgDoesNotExist()
    }

    const pet = await this.petsRepostory.create({
      name,
      breed,
      org_id: orgId,
      description,
      size,
    })

    return { pet }
  }
}

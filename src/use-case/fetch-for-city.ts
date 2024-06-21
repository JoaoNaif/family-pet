import { OrgRepository } from '@/repositories/org-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface FetchForCityUseCaseRequest {
  city: string
  page: number
}

interface FetchForCityUseCaseResponse {
  pets: Pet[]
}

export class FetchForCityUseCase {
  constructor(
    private orgsRepository: OrgRepository,
    private petsRepository: PetRepository,
  ) {}

  async execute({
    city,
    page,
  }: FetchForCityUseCaseRequest): Promise<FetchForCityUseCaseResponse> {
    const orgs = await this.orgsRepository.findByCity(city)

    if (!orgs || orgs.length === 0) {
      return { pets: [] }
    }

    const pets = await this.petsRepository.findManyById(orgs, page)

    return { pets }
  }
}

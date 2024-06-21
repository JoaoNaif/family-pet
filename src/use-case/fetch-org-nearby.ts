import { OrgRepository } from '@/repositories/org-repository'
import { Org } from '@prisma/client'

interface FetchOrgNearbyUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchOrgNearbyUseCaseResponse {
  orgs: Org[]
}

export class FetchOrgNearbyUseCase {
  constructor(private orgsRepository: OrgRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchOrgNearbyUseCaseRequest): Promise<FetchOrgNearbyUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { orgs }
  }
}

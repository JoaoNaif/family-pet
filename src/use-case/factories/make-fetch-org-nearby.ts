import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FetchOrgNearbyUseCase } from '../fetch-org-nearby'

export function makeFetchOrgNearbyUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const fetchOrgNearbyUseCase = new FetchOrgNearbyUseCase(orgsRepository)

  return fetchOrgNearbyUseCase
}

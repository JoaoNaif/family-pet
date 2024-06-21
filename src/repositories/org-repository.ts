import { Prisma, Org } from '@prisma/client'

export interface findManyNearbyParams {
  latitude: number
  longitude: number
}

export interface OrgRepository {
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
  findByCity(city: string): Promise<string[] | null>
  findManyNearby(params: findManyNearbyParams): Promise<Org[]>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}

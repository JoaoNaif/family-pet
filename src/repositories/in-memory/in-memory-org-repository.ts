import { Org, Prisma } from '@prisma/client'
import { OrgRepository, findManyNearbyParams } from '../org-repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryOrgRepository implements OrgRepository {
  public items: Org[] = []

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByCity(city: string) {
    const orgs = this.items.filter((item) => item.city === city)

    if (orgs.length === 0) {
      return null
    }

    return orgs.map((org) => org.id)
  }

  async findManyNearby(params: findManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: data.id ?? randomUUID(),
      email: data.email,
      password_hash: data.password_hash,
      name: data.name,
      address: data.address,
      city: data.city,
      phone: data.phone,
      state: data.state,
      created_at: new Date(),
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }
}

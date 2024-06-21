import { prisma } from '@/lib/prisma'
import { OrgRepository, findManyNearbyParams } from '../org-repository'
import { Org, Prisma } from '@prisma/client'

export class PrismaOrgsRepository implements OrgRepository {
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByCity(city: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city,
      },
    })

    if (orgs.length === 0) {
      return null
    }

    return orgs.map((item) => item.id)
  }

  async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
    const orgs = await prisma.$queryRaw<Org[]>`
    SELECT * FROM orgs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return orgs
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}

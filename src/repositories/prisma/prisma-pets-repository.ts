import { Prisma, Size } from '@prisma/client'
import { PetRepository } from '../pet-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findManyById(ids: string[], page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: ids,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findManyByBreed(breed: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        breed,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findManyBySize(size: Size, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        size,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}

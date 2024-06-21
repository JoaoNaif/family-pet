import { Pet, Prisma, Size } from '@prisma/client'
import { PetRepository } from '../pet-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async findManyById(ids: string[], page: number) {
    return this.items
      .filter((item) => ids.includes(item.org_id))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyByBreed(breed: string, page: number) {
    return this.items
      .filter((item) => item.breed === breed)
      .slice((page - 1) * 20, page * 20)
  }

  async findManyBySize(size: Size, page: number) {
    return this.items
      .filter((item) => item.size === size)
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      src:
        data.src ??
        'https://static.vecteezy.com/system/resources/thumbnails/014/569/555/small_2x/dog-and-cat-paws-with-sharp-claws-cute-animal-footprints-png.png',
      breed: data.breed,
      description: data.description ?? null,
      created_at: new Date(),
      org_id: data.org_id,
      size: data.size ?? 'medium',
    }

    this.items.push(pet)

    return pet
  }
}

import { Prisma, Pet, Size } from '@prisma/client'

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyById(ids: string[], page: number): Promise<Pet[]>
  findManyByBreed(breed: string, page: number): Promise<Pet[]>
  findManyBySize(size: Size, page: number): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}

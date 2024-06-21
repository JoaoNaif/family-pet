import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { GetPetUseCase } from './get-pet'
import { PetDoesNotExistError } from './error/pet-does-not-exist'

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: GetPetUseCase

describe('Get pet Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new GetPetUseCase(petRepository)

    const org = await orgRepository.create({
      id: 'org-01',
      email: 'test@email.com',
      password_hash: await hash('123456', 6),
      name: 'test',
      city: 'Test City',
      address: 'Test Address',
      state: 'Test State',
      phone: '55 12 90000-0000',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    console.log(org)
  })

  it('should be able to search the pet by breed ', async () => {
    const createPet = await petRepository.create({
      name: 'Rex',
      breed: 'Rottweiler',
      org_id: 'org-01',
      description: 'Brave',
    })

    const { pet } = await sut.execute({
      id: createPet.id,
    })

    expect(pet.name).toEqual('Rex')
  })

  it('should be able to search for details of a pet', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(PetDoesNotExistError)
  })
})

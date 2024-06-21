import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { FetchBreedUseCase } from './fetch-breed'

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: FetchBreedUseCase

describe('Fetch for Breed', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new FetchBreedUseCase(petRepository)

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
    await petRepository.create({
      name: 'Rex',
      breed: 'Rottweiler',
      org_id: 'org-01',
      description: 'Brave',
    })

    await petRepository.create({
      name: 'Bob',
      breed: 'Pitbull',
      org_id: 'org-02',
      description: 'Funny',
    })

    const { pets } = await sut.execute({
      breed: 'Rottweiler',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ breed: 'Rottweiler' })])
  })

  it('should be able to for breed fetch paginated pet ', async () => {
    for (let i = 1; i <= 22; i++) {
      await petRepository.create({
        name: `dog-${i}`,
        breed: 'Rottweiler',
        org_id: 'org-01',
        description: 'Brave',
      })
    }

    const { pets } = await sut.execute({
      breed: 'Rottweiler',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'dog-21' }),
      expect.objectContaining({ name: 'dog-22' }),
    ])
  })
})

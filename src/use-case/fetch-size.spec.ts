import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { FetchSizeUseCase } from './fetch-size'

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: FetchSizeUseCase

describe('Fetch for Size', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new FetchSizeUseCase(petRepository)

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

  it('should be able to search for the pet by size ', async () => {
    await petRepository.create({
      name: 'Rex',
      breed: 'Rottweiler',
      org_id: 'org-01',
      description: 'Brave',
      size: 'medium',
    })

    await petRepository.create({
      name: 'Bob',
      breed: 'Fila',
      org_id: 'org-02',
      description: 'Funny',
      size: 'big',
    })

    const { pets } = await sut.execute({
      size: 'big',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ size: 'big' })])
  })

  it('should be able to for breed fetch paginated pet ', async () => {
    for (let i = 1; i <= 22; i++) {
      await petRepository.create({
        name: `dog-${i}`,
        breed: 'Rottweiler',
        org_id: 'org-01',
        description: 'Brave',
        size: 'big',
      })
    }

    const { pets } = await sut.execute({
      size: 'big',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'dog-21' }),
      expect.objectContaining({ name: 'dog-22' }),
    ])
  })
})

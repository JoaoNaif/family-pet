import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { CreatePetUseCase } from './create-pet'

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: CreatePetUseCase

describe('Login Org', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new CreatePetUseCase(orgRepository, petRepository)

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

  it('should be able to create pet', async () => {
    const { pet } = await sut.execute({
      name: 'Rex',
      breed: 'Rottweiler',
      orgId: 'org-01',
      description: 'Brave',
      size: 'big',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})

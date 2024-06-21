import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { FetchOrgNearbyUseCase } from './fetch-org-nearby'

let orgRepository: InMemoryOrgRepository
let sut: FetchOrgNearbyUseCase

describe('Create Org', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new FetchOrgNearbyUseCase(orgRepository)
  })

  it('should be able to fetch nearby orgs', async () => {
    await orgRepository.create({
      email: 'test@email.com',
      password_hash: await hash('123456', 6),
      name: 'Near Org',
      city: 'Test City',
      address: 'Test Address',
      state: 'Test State',
      phone: '55 12 90000-0000',
      latitude: -23.5591942,
      longitude: -46.5836981,
    })

    await orgRepository.create({
      email: 'test@email.com',
      password_hash: await hash('123456', 6),
      name: 'Far Org',
      city: 'Test City',
      address: 'Test Address',
      state: 'Test State',
      phone: '55 12 90000-0000',
      latitude: -21.163709,
      longitude: -47.813523,
    })

    const { orgs } = await sut.execute({
      userLatitude: -23.5591942,
      userLongitude: -46.5836981,
    })

    expect(orgs).toHaveLength(1)
    expect(orgs).toEqual([expect.objectContaining({ name: 'Near Org' })])
  })
})

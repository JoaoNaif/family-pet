import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistError } from './error/org-already-exist'

let orgRepository: InMemoryOrgRepository
let sut: CreateOrgUseCase

describe('Create Org', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new CreateOrgUseCase(orgRepository)
  })

  it('should be able to create org', async () => {
    const { org } = await sut.execute({
      email: 'test@email.com',
      password: '123456',
      name: 'test',
      city: 'Test City',
      address: 'Test Address',
      state: 'Test State',
      phone: '55 12 90000-0000',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      email: 'test@email.com',
      password: '123456',
      name: 'test',
      city: 'Test City',
      address: 'Test Address',
      state: 'Test State',
      phone: '55 12 90000-0000',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const isPasswordCorrectyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'test@email.com'

    await sut.execute({
      email,
      password: '123456',
      name: 'test',
      city: 'Test City',
      address: 'Test Address',
      state: 'Test State',
      phone: '55 12 90000-0000',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await expect(() =>
      sut.execute({
        email,
        password: '123456',
        name: 'test',
        city: 'Test City',
        address: 'Test Address',
        state: 'Test State',
        phone: '55 12 90000-0000',
        latitude: -27.2092052,
        longitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistError)
  })
})

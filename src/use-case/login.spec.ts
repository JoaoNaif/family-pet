import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { LoginUseCase } from './login'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error'

let orgRepository: InMemoryOrgRepository
let sut: LoginUseCase

describe('Login Org', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new LoginUseCase(orgRepository)
  })

  it('should be able to create org', async () => {
    await orgRepository.create({
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

    const { org } = await sut.execute({
      email: 'test@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not able to login with wrong email', async () => {
    await expect(() =>
      sut.execute({ email: 'test@email.com', password: '123456' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not able to login with wrong password', async () => {
    await orgRepository.create({
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

    expect(() =>
      sut.execute({
        email: 'test@email.com',
        password: '1234562',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

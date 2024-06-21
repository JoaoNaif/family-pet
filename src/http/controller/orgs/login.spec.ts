import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Login (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to login', async () => {
    await request(app.server).post('/orgs').send({
      email: 'test@email.com',
      password: '123456',
      name: 'test',
      city: 'Test City',
      address: 'Test Address',
      state: 'Test State',
      phone: '11999999999',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'test@email.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
  })
})

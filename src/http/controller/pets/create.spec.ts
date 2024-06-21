import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a org', async () => {
    const org = await prisma.org.create({
      data: {
        email: 'test2@email.com',
        password_hash: '123456',
        name: 'Org JavaScript',
        city: 'test city',
        address: 'Test Address',
        state: 'Test State',
        phone: '11999999999',
        latitude: -21.163709,
        longitude: -47.813523,
      },
    })

    const response = await request(app.server)
      .post(`/orgs/${org.id}/pets`)
      .send({
        name: 'Rex',
        breed: 'Rottweiler',
        description: 'Brave',
        size: 'big',
      })

    expect(response.statusCode).toEqual(201)
  })
})

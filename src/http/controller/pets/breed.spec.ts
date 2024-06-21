import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch breed (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search for pets by breed', async () => {
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

    await request(app.server).post(`/orgs/${org.id}/pets`).send({
      name: 'Rex',
      breed: 'Rottweiler',
      description: 'Brave',
      size: 'big',
    })

    await request(app.server).post(`/orgs/${org.id}/pets`).send({
      name: 'Rex',
      breed: 'Pitbull',
      description: 'Brave',
      size: 'big',
    })

    const response = await request(app.server)
      .get('/pets/breed')
      .query({
        breed: 'Rottweiler',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        breed: 'Rottweiler',
      }),
    ])
  })
})

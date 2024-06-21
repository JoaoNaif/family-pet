import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search nearby org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby orgs', async () => {
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

    const pet = await prisma.pet.create({
      data: {
        name: 'Rex',
        breed: 'Rottweiler',
        org_id: org.id,
        description: 'Brave',
      },
    })

    const response = await request(app.server)
      .get('/orgs/contact')
      .query({ id: pet.id })

    expect(response.statusCode).toEqual(200)
    expect(response.body.address).toEqual(org.address)
    expect(response.body.phone).toEqual(org.phone)
  })
})

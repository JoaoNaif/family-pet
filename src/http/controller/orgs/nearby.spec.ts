import { app } from '@/app'
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
    await request(app.server).post('/orgs').send({
      email: 'test@email.com',
      password: '123456',
      name: 'Org TypeScript',
      city: 'test city',
      address: 'Test Address',
      state: 'Test State',
      phone: '11999999999',
      latitude: -23.5591942,
      longitude: -46.5836981,
    })

    await request(app.server).post('/orgs').send({
      email: 'test2@email.com',
      password: '123456',
      name: 'Org JavaScript',
      city: 'test city',
      address: 'Test Address',
      state: 'Test State',
      phone: '11999999999',
      latitude: -21.163709,
      longitude: -47.813523,
    })

    const response = await request(app.server)
      .get('/orgs/nearby')
      .query({ latitude: -23.5591942, longitude: -46.5836981 })

    expect(response.statusCode).toEqual(200)
    expect(response.body.orgs).toHaveLength(1)
    expect(response.body.orgs).toEqual([
      expect.objectContaining({
        name: 'Org TypeScript',
      }),
    ])
  })
})

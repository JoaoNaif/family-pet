import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgRepository } from '@/repositories/org-repository'
import { OrgAlreadyExistError } from './error/org-already-exist'

interface CreateOrgUseCaseRequest {
  email: string
  password: string
  phone: string
  name: string
  city: string
  address: string
  state: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgRepository) {}

  async execute({
    email,
    password,
    phone,
    name,
    city,
    address,
    state,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistError()
    }

    const org = await this.orgsRepository.create({
      email,
      password_hash,
      phone,
      name,
      city,
      address,
      state,
      latitude,
      longitude,
    })

    return { org }
  }
}

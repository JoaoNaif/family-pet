import { PetRepository } from '@/repositories/pet-repository'
import { PetDoesNotExistError } from './error/pet-does-not-exist'
import { OrgRepository } from '@/repositories/org-repository'
import { OrgDoesNotExist } from './error/org-does-not-exist'

interface GetContactOrgRequest {
  id: string
}

interface GetContactOrgResponse {
  phone: string
  address: string
}

export class GetContactOrg {
  constructor(
    private petsRepository: PetRepository,
    private orgsRepository: OrgRepository,
  ) {}

  async execute({ id }: GetContactOrgRequest): Promise<GetContactOrgResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new PetDoesNotExistError()
    }

    const org = await this.orgsRepository.findById(pet.org_id)

    if (!org) {
      throw new OrgDoesNotExist()
    }

    return { phone: org.phone, address: org.address }
  }
}

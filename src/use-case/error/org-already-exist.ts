export class OrgAlreadyExistError extends Error {
  constructor() {
    super('E-mail already exist')
  }
}

export class OrgDoesNotExist extends Error {
  constructor() {
    super('Org does not exist')
  }
}

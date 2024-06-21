export class PetDoesNotExistError extends Error {
  constructor() {
    super('Pet does not exist')
  }
}

export class ResourceNotfound extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ResourceNotfound';
  }
}

export class BadRequest extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'BadRequest';
  }
}

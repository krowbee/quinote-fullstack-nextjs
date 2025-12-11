import { HttpException } from "../HttpException";

export class BadRequestException extends HttpException {
  constructor(message = "Invalid data") {
    super(message, { status: 400 });
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Invalid credentials") {
    super(message, { status: 401 });
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = "You have not access to this resource") {
    super(message, { status: 403 });
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Resource not found") {
    super(message, { status: 404 });
  }
}

export class InternalException extends HttpException {
  constructor(message = "Internal server error") {
    super(message, { status: 500 });
  }
}

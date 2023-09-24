import {
    ArgumentsHost,
    HttpException,
    HttpStatus
} from "@nestjs/common";

export async function  handleException(promise: Promise<any>) {
    try {
      return await promise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  } 


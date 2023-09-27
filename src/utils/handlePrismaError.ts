import { NotFoundException } from "@nestjs/common";


export async function handlePrismaError<T>(promise
  : Promise<T>)
  : Promise<T> {
  try {
    return await promise;
  } catch (error) {
    throw new NotFoundException(error.message);
  }
}
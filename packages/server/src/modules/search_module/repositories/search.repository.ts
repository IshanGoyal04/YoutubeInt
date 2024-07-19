import { inject, injectable } from 'inversify';
import { PrismaClient } from 'clients-db';
import { PrismaClientSymbol } from 'clients-db';
// import { CreateDto, UpdateDto } from '../types';
@injectable()
export class SearchRepository {
  private _prisma: PrismaClient;
  constructor(@inject(PrismaClientSymbol) private prisma: PrismaClient) {
    this._prisma = prisma;
  }

  // async create(dto: CreateDto) {
  //   return await this._prisma.search.create({
  //     data: dto,
  //   });
  // }

  // async findById(id: string) {
  //   return await this._prisma.search.findFirst({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // async update(id: string, dto: UpdateDto) {
  //   return await this._prisma.search.update({
  //     where: {
  //       id: id,
  //     },
  //     data: dto,
  //   });
  // }

  // async delete(id: string) {
  //   return await this._prisma.search.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
}

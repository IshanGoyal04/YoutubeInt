// import { Request } from 'express';
import { inject, injectable } from 'inversify';
// import { CreateDto, TYPES, UpdateDto } from '../types';
// import { SearchRepository } from '../repositories/search.repository';

@injectable()
export class SearchPolicy {
  // private searchRepository: SearchRepository;
  constructor() // @inject(TYPES.SearchRepository)
  // searchRepository: SearchRepository
  {
    // this.searchRepository = searchRepository;
  }

  // createDto(req: Request): CreateDto {
  //   const dto = {};

  //   return dto;
  // }

  // updateDto(req: Request): UpdateDto {
  //   return this.createDto(req);
  // }
}

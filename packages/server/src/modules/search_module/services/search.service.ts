import { inject, injectable } from 'inversify';
import { SearchRepository } from '../repositories/search.repository';
import { CreateDto, TYPES, UpdateDto } from '../types';

@injectable()
export class SearchService {
  private searchRepository: SearchRepository;
  constructor(
    @inject(TYPES.SearchRepository)
    searchRepository: SearchRepository
  ) {
    this.searchRepository = searchRepository;
  }

  async create(dto: CreateDto) {
    return await this.searchRepository.create(dto);
  }

  async findById(id: string) {
    return await this.searchRepository.findById(id);
  }

  async update(id: string, dto: UpdateDto) {
    return await this.searchRepository.update(id, dto);
  }

  async delete(id: string) {
    return await this.searchRepository.delete(id);
  }
}

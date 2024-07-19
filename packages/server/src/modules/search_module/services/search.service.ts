import { inject, injectable } from 'inversify';
// import { SearchRepository } from '../repositories/search.repository';
// import { CreateDto, TYPES, UpdateDto } from '../types';
import axios from 'axios';
const { API_KEY } = process.env;
@injectable()
export class SearchService {
  // private searchRepository: SearchRepository;
  private apiKey: string;
  constructor() // @inject(TYPES.SearchRepository)
  // searchRepository: SearchRepository) {
  {
    // this.searchRepository = searchRepository;
    this.apiKey = API_KEY;
  }

  // async create(dto: CreateDto) {
  //   return await this.searchRepository.create(dto);
  // }

  // async findById(id: string) {
  //   return await this.searchRepository.findById(id);
  // }

  // async update(id: string, dto: UpdateDto) {
  //   return await this.searchRepository.update(id, dto);
  // }

  // async delete(id: string) {
  //   return await this.searchRepository.delete(id);
  // }
  async getVideos(query: any): Promise<any> {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            key: this.apiKey,
            q: query.search,
            part: 'snippet',
            maxResults: 3,
            type: query.type || 'video' || 'channel' || 'playlist',
          },
        }
      );
      const videos = response.data.items.map(item => ({
        id: item.id?.videoId || item.id?.playlistId || item.snippet?.channelId,
        title: item.snippet.title,
        description: item.snippet.description,
      }));
      return videos;
    } catch (e) {
      throw new Error('Failed to fetch videos');
    }
  }
}

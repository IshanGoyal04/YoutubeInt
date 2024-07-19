import { SearchController } from './search.controller';
import { Request, Response, NextFunction } from 'express';
import { SearchService } from '../services/search.service';

jest.mock('../services/search.service');

describe('SearchController', () => {
  let controller: SearchController;
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let searchService: SearchService;

  beforeEach(() => {
    searchService = new SearchService();
    controller = new SearchController(searchService);
    req = {
      query: {
        q: 'example',
      },
    } as unknown as Request;
    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;
    next = jest.fn();
  });

  describe('getVideosSearched', () => {
    it('should fetch data from service and cache it if not available', async () => {
      const videos =
        '[{"id": 1, "title":"Video 1", "description": "Video is good."}]';
      (searchService.getVideos as jest.Mock).mockResolvedValue(videos);

      await controller.getVideosSearched(req, res, next);
      expect(searchService.getVideos).toBeCalledWith(req.query);
      expect(res.json).toBeCalledWith(
        { message: 'Fetched data:', data: JSON.parse(videos) },
        200
      );
    });

    it('should handle error', async () => {
      await controller.getVideosSearched(req, res, next);
      expect(next).toBeCalledWith(new Error('Redis error'));
    });
  });
});

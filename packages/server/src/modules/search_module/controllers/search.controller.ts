import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
  httpDelete,
  requestParam,
  BaseHttpController,
} from 'inversify-express-utils';
import axios from 'axios';
import { SearchService } from '../services/search.service';
import { SearchPolicy } from '../policies/search.policy';
import { TYPES } from '../types';
import { LogTypes, LoggerFactory } from 'logger';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import { idParamValidation, postCreate } from '../validators/index.chain';

@controller('/search')
export class SearchController extends BaseHttpController {
  private searchService: SearchService;
  private searchPolicy: SearchPolicy;
  private logger;

  constructor(
    @inject(TYPES.SearchService)
    searchService: SearchService,
    @inject(TYPES.SearchPolicy)
    searchPolicy: SearchPolicy,
    @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory
  ) {
    super();
    this.searchService = searchService;
    this.searchPolicy = searchPolicy;
    this.logger = loggerFactory.createLogger('SearchController');
  }

  @httpPost('/', ValidationMiddleware.validate(postCreate))
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const searchQuery = this.searchPolicy.createDto(req);
      console.log(searchQuery);
      // Make a GET request to the YouTube Data API v3 to fetch videos based on the search query
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyD-wGzWbwI3_zNP4zf-kwllDch-ZhX8hmc', // Replace 'YOUR_API_KEY' with your actual YouTube Data API v3 API key
          q: searchQuery,
          part: 'snippet',
          maxResults: 10, // Set the maximum number of videos to fetch
        },
      });

      return this.json(response.data.items, 200); 
    } catch (error) {
      next(error);
    }
  }

  @httpPatch('/:id', ValidationMiddleware.validate(idParamValidation))
  public async update(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const dto = this.searchPolicy.updateDto(req);
      const result = await this.searchService.update(id, dto);

      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/:id', ValidationMiddleware.validate(idParamValidation))
  public async getById(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.searchService.findById(id);

      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }

  @httpDelete('/:id', ValidationMiddleware.validate(idParamValidation))
  public async delete(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.searchService.delete(id);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

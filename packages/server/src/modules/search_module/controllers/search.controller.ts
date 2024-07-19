import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  // httpPatch,
  // httpPost,
  // httpDelete,
  // requestParam,
  BaseHttpController,
} from 'inversify-express-utils';
import { SearchService } from '../services/search.service';
// import { SearchPolicy } from '../policies/search.policy';
import { TYPES } from '../types';
import { LogTypes, LoggerFactory } from 'logger';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import {
  idParamValidation,
  postCreate,
  queryTypeParam,
} from '../validators/index.chain';
import redis from './../../../redis';
@controller('/search')
export class SearchController extends BaseHttpController {
  private searchService: SearchService;
  // private searchPolicy: SearchPolicy;
  // private logger;

  constructor(
    @inject(TYPES.SearchService)
    searchService: SearchService
    // @inject(TYPES.SearchPolicy)
    // searchPolicy: SearchPolicy,
    // @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory
  ) {
    super();
    this.searchService = searchService;
    // this.searchPolicy = searchPolicy;
    // this.logger = loggerFactory.createLogger('SearchController');
  }

  @httpGet('/', ValidationMiddleware.validate(queryTypeParam))
  public async getVideosSearched(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const cacheKey = `videos:${JSON.stringify(req.query)}`;
      const cachedVideos = await redis.get(cacheKey);
      if (cachedVideos) {
        return this.json(
          { message: 'Cached data:', data: JSON.parse(cachedVideos) },
          200
        );
      }
      const videos = await this.searchService.getVideos(req.query);
      await redis.setex(cacheKey, 3600, JSON.stringify(videos));
      return this.json({ message: 'Fetched data:', data: videos }, 200);
    } catch (error) {
      next(error);
    }
  }

  // @httpPatch('/:id', ValidationMiddleware.validate(idParamValidation))
  // public async update(
  //   @requestParam('id') id: string,
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const dto = this.searchPolicy.updateDto(req);
  //     const result = await this.searchService.update(id, dto);

  //     return this.json(result, 200);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // @httpGet('/:id', ValidationMiddleware.validate(idParamValidation))
  // public async getById(
  //   @requestParam('id') id: string,
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const result = await this.searchService.findById(id);

  //     return this.json(result, 200);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // @httpDelete('/:id', ValidationMiddleware.validate(idParamValidation))
  // public async delete(
  //   @requestParam('id') id: string,
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const result = await this.searchService.delete(id);

  //     return res.status(200).json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

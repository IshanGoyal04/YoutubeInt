import { ContainerModule } from 'inversify';
import { SearchService } from './services/search.service';
import { TYPES } from './types';
import { SearchPolicy } from './policies/search.policy';
import { SearchRepository } from './repositories/search.repository';
import { SearchController } from './controllers/search.controller';

const searchModule = new ContainerModule((bind): void => {
  bind<SearchController>(TYPES.SearchController).to(SearchController);
  bind<SearchService>(TYPES.SearchService).to(SearchService).inSingletonScope();
  bind<SearchPolicy>(TYPES.SearchPolicy).to(SearchPolicy).inSingletonScope();
  bind<SearchRepository>(TYPES.SearchRepository)
    .to(SearchRepository)
    .inSingletonScope();
});

export { searchModule };

export const TYPES = {
  SearchController: Symbol.for('SearchController'),
  SearchService: Symbol.for('SearchService'),
  SearchPolicy: Symbol.for('SearchPolicy'),
  SearchRepository: Symbol.for('SearchRepository'),
};

// export interface CreateDto {}

// export type UpdateDto = Partial<CreateDto>;

export interface Types {
  keyword?: string;
  channel?: string;
  search?: string;
}

import { body, check, param } from 'express-validator';

const postCreate = [];

const idParamValidation = [
  param('id', 'Id must be a valid mongo id').isMongoId(),
];

const queryTypeParam = [
  check('type', 'Type must be a valid video, channel or playlist type')
    .optional({ checkFalsy: true })
    .isIn(['video', 'channel', 'playlist']),
];

export { postCreate, idParamValidation, queryTypeParam };

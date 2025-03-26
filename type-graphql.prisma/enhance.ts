import { ClassType } from 'type-graphql';
import * as tslib from 'tslib';
import * as crudResolvers from './resolvers/crud/resolvers-crud.index';
import * as argsTypes from './resolvers/crud/args.index';
import * as actionResolvers from './resolvers/crud/resolvers-actions.index';
import * as relationResolvers from './resolvers/relations/resolvers.index';
import * as models from './models';
import * as outputTypes from './resolvers/outputs';
import * as inputTypes from './resolvers/inputs';

export type MethodDecoratorOverrideFn = (decorators: MethodDecorator[]) => MethodDecorator[];

const crudResolversMap = {
  Movie: crudResolvers.MovieCrudResolver,
  Rating: crudResolvers.RatingCrudResolver,
};
const actionResolversMap = {
  Movie: {
    aggregateMovie: actionResolvers.AggregateMovieResolver,
    createManyMovie: actionResolvers.CreateManyMovieResolver,
    createManyAndReturnMovie: actionResolvers.CreateManyAndReturnMovieResolver,
    createOneMovie: actionResolvers.CreateOneMovieResolver,
    deleteManyMovie: actionResolvers.DeleteManyMovieResolver,
    deleteOneMovie: actionResolvers.DeleteOneMovieResolver,
    findFirstMovie: actionResolvers.FindFirstMovieResolver,
    findFirstMovieOrThrow: actionResolvers.FindFirstMovieOrThrowResolver,
    movies: actionResolvers.FindManyMovieResolver,
    movie: actionResolvers.FindUniqueMovieResolver,
    getMovie: actionResolvers.FindUniqueMovieOrThrowResolver,
    groupByMovie: actionResolvers.GroupByMovieResolver,
    updateManyMovie: actionResolvers.UpdateManyMovieResolver,
    updateOneMovie: actionResolvers.UpdateOneMovieResolver,
    upsertOneMovie: actionResolvers.UpsertOneMovieResolver,
  },
  Rating: {
    aggregateRating: actionResolvers.AggregateRatingResolver,
    createManyRating: actionResolvers.CreateManyRatingResolver,
    createManyAndReturnRating: actionResolvers.CreateManyAndReturnRatingResolver,
    createOneRating: actionResolvers.CreateOneRatingResolver,
    deleteManyRating: actionResolvers.DeleteManyRatingResolver,
    deleteOneRating: actionResolvers.DeleteOneRatingResolver,
    findFirstRating: actionResolvers.FindFirstRatingResolver,
    findFirstRatingOrThrow: actionResolvers.FindFirstRatingOrThrowResolver,
    ratings: actionResolvers.FindManyRatingResolver,
    rating: actionResolvers.FindUniqueRatingResolver,
    getRating: actionResolvers.FindUniqueRatingOrThrowResolver,
    groupByRating: actionResolvers.GroupByRatingResolver,
    updateManyRating: actionResolvers.UpdateManyRatingResolver,
    updateOneRating: actionResolvers.UpdateOneRatingResolver,
    upsertOneRating: actionResolvers.UpsertOneRatingResolver,
  },
};
const crudResolversInfo = {
  Movie: [
    'aggregateMovie',
    'createManyMovie',
    'createManyAndReturnMovie',
    'createOneMovie',
    'deleteManyMovie',
    'deleteOneMovie',
    'findFirstMovie',
    'findFirstMovieOrThrow',
    'movies',
    'movie',
    'getMovie',
    'groupByMovie',
    'updateManyMovie',
    'updateOneMovie',
    'upsertOneMovie',
  ],
  Rating: [
    'aggregateRating',
    'createManyRating',
    'createManyAndReturnRating',
    'createOneRating',
    'deleteManyRating',
    'deleteOneRating',
    'findFirstRating',
    'findFirstRatingOrThrow',
    'ratings',
    'rating',
    'getRating',
    'groupByRating',
    'updateManyRating',
    'updateOneRating',
    'upsertOneRating',
  ],
};
const argsInfo = {
  AggregateMovieArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  CreateManyMovieArgs: ['data'],
  CreateManyAndReturnMovieArgs: ['data'],
  CreateOneMovieArgs: ['data'],
  DeleteManyMovieArgs: ['where'],
  DeleteOneMovieArgs: ['where'],
  FindFirstMovieArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindFirstMovieOrThrowArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyMovieArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindUniqueMovieArgs: ['where'],
  FindUniqueMovieOrThrowArgs: ['where'],
  GroupByMovieArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  UpdateManyMovieArgs: ['data', 'where'],
  UpdateOneMovieArgs: ['data', 'where'],
  UpsertOneMovieArgs: ['where', 'create', 'update'],
  AggregateRatingArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  CreateManyRatingArgs: ['data'],
  CreateManyAndReturnRatingArgs: ['data'],
  CreateOneRatingArgs: ['data'],
  DeleteManyRatingArgs: ['where'],
  DeleteOneRatingArgs: ['where'],
  FindFirstRatingArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindFirstRatingOrThrowArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyRatingArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindUniqueRatingArgs: ['where'],
  FindUniqueRatingOrThrowArgs: ['where'],
  GroupByRatingArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  UpdateManyRatingArgs: ['data', 'where'],
  UpdateOneRatingArgs: ['data', 'where'],
  UpsertOneRatingArgs: ['where', 'create', 'update'],
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<TModel extends ResolverModelNames> = keyof (typeof crudResolversMap)[TModel]['prototype'];

export type ResolverActionsConfig<TModel extends ResolverModelNames> = Partial<
  Record<ModelResolverActionNames<TModel>, MethodDecorator[] | MethodDecoratorOverrideFn>
> & {
  _all?: MethodDecorator[];
  _query?: MethodDecorator[];
  _mutation?: MethodDecorator[];
};

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(resolversEnhanceMap: ResolversEnhanceMap) {
  const mutationOperationPrefixes = [
    'createOne',
    'createMany',
    'createManyAndReturn',
    'deleteOne',
    'updateOne',
    'deleteMany',
    'updateMany',
    'upsertOne',
  ];
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    const allActionsDecorators = resolverActionsConfig._all;
    const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
    for (const resolverActionName of resolverActionNames) {
      const maybeDecoratorsOrFn = resolverActionsConfig[resolverActionName as keyof typeof resolverActionsConfig] as
        | MethodDecorator[]
        | MethodDecoratorOverrideFn
        | undefined;
      const isWriteOperation = mutationOperationPrefixes.some((prefix) => resolverActionName.startsWith(prefix));
      const operationKindDecorators = isWriteOperation ? resolverActionsConfig._mutation : resolverActionsConfig._query;
      const mainDecorators = [...(allActionsDecorators ?? []), ...(operationKindDecorators ?? [])];
      let decorators: MethodDecorator[];
      if (typeof maybeDecoratorsOrFn === 'function') {
        decorators = maybeDecoratorsOrFn(mainDecorators);
      } else {
        decorators = [...mainDecorators, ...(maybeDecoratorsOrFn ?? [])];
      }
      const actionTarget = (actionResolversConfig[resolverActionName as keyof typeof actionResolversConfig] as Function).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<keyof (typeof argsTypes)[TArgsType]['prototype'], number | symbol>;

type ArgFieldsConfig<TArgsType extends ArgsTypesNames> = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(argsTypesEnhanceMap: ArgsTypesEnhanceMap) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(typeConfig, typeClass, typeTarget, argsInfo[argsTypeName as keyof typeof argsInfo]);
  }
}

const relationResolversMap = {
  Movie: relationResolvers.MovieRelationsResolver,
  Rating: relationResolvers.RatingRelationsResolver,
};
const relationResolversInfo = {
  Movie: ['rating'],
  Rating: ['movie'],
};

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<TModel extends RelationResolverModelNames> = keyof (typeof relationResolversMap)[TModel]['prototype'];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames> = Partial<
  Record<RelationResolverActionNames<TModel>, MethodDecorator[] | MethodDecoratorOverrideFn>
> & { _all?: MethodDecorator[] };

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(relationResolversEnhanceMap: RelationResolversEnhanceMap) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    const allActionsDecorators = relationResolverActionsConfig._all ?? [];
    const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
    for (const relationResolverActionName of relationResolverActionNames) {
      const maybeDecoratorsOrFn = relationResolverActionsConfig[relationResolverActionName as keyof typeof relationResolverActionsConfig] as
        | MethodDecorator[]
        | MethodDecoratorOverrideFn
        | undefined;
      let decorators: MethodDecorator[];
      if (typeof maybeDecoratorsOrFn === 'function') {
        decorators = maybeDecoratorsOrFn(allActionsDecorators);
      } else {
        decorators = [...allActionsDecorators, ...(maybeDecoratorsOrFn ?? [])];
      }
      tslib.__decorate(decorators, relationResolverTarget, relationResolverActionName, null);
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

export type PropertyDecoratorOverrideFn = (decorators: PropertyDecorator[]) => PropertyDecorator[];

type FieldsConfig<TTypeKeys extends string = string> = Partial<Record<TTypeKeys, PropertyDecorator[] | PropertyDecoratorOverrideFn>> & {
  _all?: PropertyDecorator[];
};

function applyTypeClassEnhanceConfig<TEnhanceConfig extends TypeConfig, TType extends object>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[],
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    const allFieldsDecorators = enhanceConfig.fields._all ?? [];
    for (const typeFieldName of typeFieldNames) {
      const maybeDecoratorsOrFn = enhanceConfig.fields[typeFieldName] as PropertyDecorator[] | PropertyDecoratorOverrideFn | undefined;
      let decorators: PropertyDecorator[];
      if (typeof maybeDecoratorsOrFn === 'function') {
        decorators = maybeDecoratorsOrFn(allFieldsDecorators);
      } else {
        decorators = [...allFieldsDecorators, ...(maybeDecoratorsOrFn ?? [])];
      }
      tslib.__decorate(decorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  Movie: ['id', 'publicId', 'name', 'slug', 'released'],
  Rating: ['id', 'publicId', 'score', 'createdAt', 'movieId'],
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<keyof (typeof models)[TModel]['prototype'], number | symbol>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<ModelFieldNames<TModel>>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(modelConfig, modelClass, modelTarget, modelsInfo[modelName as keyof typeof modelsInfo]);
  }
}

const outputsInfo = {
  AggregateMovie: ['_count', '_avg', '_sum', '_min', '_max'],
  MovieGroupBy: ['id', 'publicId', 'name', 'slug', 'released', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateRating: ['_count', '_avg', '_sum', '_min', '_max'],
  RatingGroupBy: ['id', 'publicId', 'score', 'createdAt', 'movieId', '_count', '_avg', '_sum', '_min', '_max'],
  AffectedRowsOutput: ['count'],
  MovieCount: ['rating'],
  MovieCountAggregate: ['id', 'publicId', 'name', 'slug', 'released', '_all'],
  MovieAvgAggregate: ['id'],
  MovieSumAggregate: ['id'],
  MovieMinAggregate: ['id', 'publicId', 'name', 'slug', 'released'],
  MovieMaxAggregate: ['id', 'publicId', 'name', 'slug', 'released'],
  RatingCountAggregate: ['id', 'publicId', 'score', 'createdAt', 'movieId', '_all'],
  RatingAvgAggregate: ['id', 'score', 'createdAt', 'movieId'],
  RatingSumAggregate: ['id', 'score', 'createdAt', 'movieId'],
  RatingMinAggregate: ['id', 'publicId', 'score', 'createdAt', 'movieId'],
  RatingMaxAggregate: ['id', 'publicId', 'score', 'createdAt', 'movieId'],
  CreateManyAndReturnMovie: ['id', 'publicId', 'name', 'slug', 'released'],
  CreateManyAndReturnRating: ['id', 'publicId', 'score', 'createdAt', 'movieId', 'movie'],
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<keyof (typeof outputTypes)[TOutput]['prototype'], number | symbol>;

type OutputTypeFieldsConfig<TOutput extends OutputTypesNames> = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(outputTypesEnhanceMap: OutputTypesEnhanceMap) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(typeConfig, typeClass, typeTarget, outputsInfo[outputTypeName as keyof typeof outputsInfo]);
  }
}

const inputsInfo = {
  MovieWhereInput: ['AND', 'OR', 'NOT', 'id', 'publicId', 'name', 'slug', 'released', 'rating'],
  MovieOrderByWithRelationInput: ['id', 'publicId', 'name', 'slug', 'released', 'rating'],
  MovieWhereUniqueInput: ['id', 'publicId', 'slug', 'AND', 'OR', 'NOT', 'name', 'released', 'rating'],
  MovieOrderByWithAggregationInput: ['id', 'publicId', 'name', 'slug', 'released', '_count', '_avg', '_max', '_min', '_sum'],
  MovieScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'publicId', 'name', 'slug', 'released'],
  RatingWhereInput: ['AND', 'OR', 'NOT', 'id', 'publicId', 'score', 'createdAt', 'movieId', 'movie'],
  RatingOrderByWithRelationInput: ['id', 'publicId', 'score', 'createdAt', 'movieId', 'movie'],
  RatingWhereUniqueInput: ['id', 'publicId', 'AND', 'OR', 'NOT', 'score', 'createdAt', 'movieId', 'movie'],
  RatingOrderByWithAggregationInput: ['id', 'publicId', 'score', 'createdAt', 'movieId', '_count', '_avg', '_max', '_min', '_sum'],
  RatingScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'publicId', 'score', 'createdAt', 'movieId'],
  MovieCreateInput: ['publicId', 'name', 'slug', 'released', 'rating'],
  MovieUpdateInput: ['publicId', 'name', 'slug', 'released', 'rating'],
  MovieCreateManyInput: ['id', 'publicId', 'name', 'slug', 'released'],
  MovieUpdateManyMutationInput: ['publicId', 'name', 'slug', 'released'],
  RatingCreateInput: ['publicId', 'score', 'createdAt', 'movie'],
  RatingUpdateInput: ['publicId', 'score', 'createdAt', 'movie'],
  RatingCreateManyInput: ['id', 'publicId', 'score', 'createdAt', 'movieId'],
  RatingUpdateManyMutationInput: ['publicId', 'score', 'createdAt'],
  IntFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  StringFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'contains', 'startsWith', 'endsWith', 'not'],
  RatingListRelationFilter: ['every', 'some', 'none'],
  RatingOrderByRelationAggregateInput: ['_count'],
  MovieCountOrderByAggregateInput: ['id', 'publicId', 'name', 'slug', 'released'],
  MovieAvgOrderByAggregateInput: ['id'],
  MovieMaxOrderByAggregateInput: ['id', 'publicId', 'name', 'slug', 'released'],
  MovieMinOrderByAggregateInput: ['id', 'publicId', 'name', 'slug', 'released'],
  MovieSumOrderByAggregateInput: ['id'],
  IntWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not', '_count', '_avg', '_sum', '_min', '_max'],
  StringWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  MovieRelationFilter: ['is', 'isNot'],
  RatingCountOrderByAggregateInput: ['id', 'publicId', 'score', 'createdAt', 'movieId'],
  RatingAvgOrderByAggregateInput: ['id', 'score', 'createdAt', 'movieId'],
  RatingMaxOrderByAggregateInput: ['id', 'publicId', 'score', 'createdAt', 'movieId'],
  RatingMinOrderByAggregateInput: ['id', 'publicId', 'score', 'createdAt', 'movieId'],
  RatingSumOrderByAggregateInput: ['id', 'score', 'createdAt', 'movieId'],
  RatingCreateNestedManyWithoutMovieInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  StringFieldUpdateOperationsInput: ['set'],
  RatingUpdateManyWithoutMovieNestedInput: [
    'create',
    'connectOrCreate',
    'upsert',
    'createMany',
    'set',
    'disconnect',
    'delete',
    'connect',
    'update',
    'updateMany',
    'deleteMany',
  ],
  IntFieldUpdateOperationsInput: ['set', 'increment', 'decrement', 'multiply', 'divide'],
  MovieCreateNestedOneWithoutRatingInput: ['create', 'connectOrCreate', 'connect'],
  MovieUpdateOneRequiredWithoutRatingNestedInput: ['create', 'connectOrCreate', 'upsert', 'connect', 'update'],
  NestedIntFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedStringFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'contains', 'startsWith', 'endsWith', 'not'],
  NestedIntWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not', '_count', '_avg', '_sum', '_min', '_max'],
  NestedFloatFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedStringWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  RatingCreateWithoutMovieInput: ['publicId', 'score', 'createdAt'],
  RatingCreateOrConnectWithoutMovieInput: ['where', 'create'],
  RatingCreateManyMovieInputEnvelope: ['data'],
  RatingUpsertWithWhereUniqueWithoutMovieInput: ['where', 'update', 'create'],
  RatingUpdateWithWhereUniqueWithoutMovieInput: ['where', 'data'],
  RatingUpdateManyWithWhereWithoutMovieInput: ['where', 'data'],
  RatingScalarWhereInput: ['AND', 'OR', 'NOT', 'id', 'publicId', 'score', 'createdAt', 'movieId'],
  MovieCreateWithoutRatingInput: ['publicId', 'name', 'slug', 'released'],
  MovieCreateOrConnectWithoutRatingInput: ['where', 'create'],
  MovieUpsertWithoutRatingInput: ['update', 'create', 'where'],
  MovieUpdateToOneWithWhereWithoutRatingInput: ['where', 'data'],
  MovieUpdateWithoutRatingInput: ['publicId', 'name', 'slug', 'released'],
  RatingCreateManyMovieInput: ['id', 'publicId', 'score', 'createdAt'],
  RatingUpdateWithoutMovieInput: ['publicId', 'score', 'createdAt'],
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<keyof (typeof inputTypes)[TInput]['prototype'], number | symbol>;

type InputTypeFieldsConfig<TInput extends InputTypesNames> = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(inputTypesEnhanceMap: InputTypesEnhanceMap) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(typeConfig, typeClass, typeTarget, inputsInfo[inputTypeName as keyof typeof inputsInfo]);
  }
}

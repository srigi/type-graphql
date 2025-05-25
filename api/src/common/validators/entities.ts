import { ArgumentValidationError } from 'type-graphql';

/**
 * Validates that an entity was found and throws appropriate error if not
 * @param entity - The entity returned from database query
 * @param condition - The where condition used in the query
 * @param entityName - Name of the entity type for error message
 * @throws ArgumentValidationError if entity is null/undefined
 */
export function validateEntityFound<T>(entity: T | null | undefined, condition: object, entityName: string): asserts entity is T {
  if (entity == null) {
    throw new ArgumentValidationError([
      { property: JSON.stringify(condition), constraints: { presence: `${entityName} not found` } }
    ]);
  }
}

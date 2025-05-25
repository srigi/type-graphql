import { ArgumentValidationError } from 'type-graphql';

export interface FindByIdentifierArgs {
  publicId?: string;
  slug?: string;
}

/**
 * Validates that either publicId or slug is provided and returns the preferred identifier
 * @param args - Object containing publicId and/or slug
 * @returns Object with the preferred identifier (slug takes precedence over publicId)
 * @throws ArgumentValidationError if neither publicId nor slug is provided
 */
export function validateAndSelectIdentifier({ publicId, slug }: FindByIdentifierArgs) {
  if (!publicId && !slug) {
    throw new ArgumentValidationError([
      { property: 'slug', constraints: { presence: 'Either a slug or publicId must be provided' } }
    ]);
  }

  return slug ? { slug } : { publicId };
}

/**
 * Validates orderBy parameter format and direction
 * @param orderBy - String in format "field.direction" (e.g., "name.asc")
 * @throws ArgumentValidationError if direction is not 'asc' or 'desc'
 */
export function validateOrderBy(orderBy?: string): void {
  if (orderBy) {
    const [field, direction] = orderBy.split('.');
    if (direction !== 'asc' && direction !== 'desc') {
      throw new ArgumentValidationError([
        { property: 'orderBy', constraints: { enum: `Direction must be either asc or desc, but received ${direction}` } },
      ]);
    }
  }
}

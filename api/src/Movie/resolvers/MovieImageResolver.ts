import { Args, FieldResolver, Resolver, Root } from 'type-graphql';

import { prisma } from '~/lib/db';
import { CloudImage } from '~/CloudImage/CloudImage';
import { Movie } from '~/Movie/Movie';
import { MovieImageRoleArg } from '../args/MovieImageRole';

@Resolver(Movie)
export class MovieImageResolver {
  @FieldResolver((returns) => [CloudImage])
  async images(@Args(() => MovieImageRoleArg) { role }: MovieImageRoleArg, @Root() movie: Movie): Promise<CloudImage[]> {
    const cloudImages = await prisma.cloudImage.findMany({
      where: {
        movieImage: {
          some: {
            movie: { publicId: movie.publicId },
            role: role || undefined,
          },
        },
      },
      include: {
        movieImage: {
          where: { movie: { publicId: movie.publicId } },
          select: { role: true },
        },
      },
    });

    return cloudImages.map((ci) => ({ ...ci, role: ci.movieImage[0].role }));
  }
}

import dayjs from 'dayjs';

import { CloudImage } from '~/components/CloudImage';
import { Nl2br } from '~/components/Nl2br';
import { useHeroWidth } from '~/hooks/useHeroWidth';

type Props = {
  movie: {
    avgScore: number;
    images: Array<{ alt: string; AR: number; publicId: string }>;
    name: string;
    releasedIn: string;
    story: string;
  };
};

export function MovieHero({ movie: { images, name, story, releasedIn, avgScore } }: Props) {
  const heroWidth = useHeroWidth();
  return (
    <section className="relative min-h-120 overflow-hidden rounded-xl">
      {images.length > 0 && <CloudImage className="absolute inset-0 h-full w-full object-cover" image={images[0]} width={heroWidth} />}

      <div className="absolute inset-0 grid grid-cols-2 grid-rows-[1fr_1fr_auto] gap-8 bg-gradient-to-b from-transparent to-gray-900 p-8 text-lg lg:grid-rows-2">
        <h1 className="col-span-2 text-3xl font-bold [text-shadow:_1px_2px_5px_black] lg:col-span-1 xl:text-5xl">
          <Nl2br text={name} />
        </h1>

        <p className="col-span-2 self-end lg:order-4 lg:col-span-1 xl:text-xl">{story}</p>

        <strong className="self-end lg:order-3">{dayjs(releasedIn).format('YYYY')}</strong>

        <data className="self-end justify-self-end lg:order-2 lg:self-start lg:justify-self-end">{avgScore}&nbsp;⭐️</data>
      </div>
    </section>
  );
}

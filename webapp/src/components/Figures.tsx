import { Link } from 'react-router-dom';

interface Figure {
  name: string;
  role: string;
  slug: string;
}

interface FiguresProps {
  movieFigures: Figure[];
}

export function Figures({ movieFigures }: FiguresProps) {
  const assignments = movieFigures.reduce<{
    director: Array<{ name: string; slug: string }>;
    camera: Array<{ name: string; slug: string }>;
    actors: Array<{ name: string; slug: string }>;
  }>(
    (acc, figure) => {
      if (figure.role === 'director') acc.director.push({ name: figure.name, slug: figure.slug });
      if (figure.role === 'director of photography') acc.camera.push({ name: figure.name, slug: figure.slug });
      if (figure.role === 'main character') acc.actors.push({ name: figure.name, slug: figure.slug });
      if (figure.role === 'supporting character') acc.actors.push({ name: figure.name, slug: figure.slug });

      return acc;
    },
    { director: [], camera: [], actors: [] },
  );

  return (
    <dl className="grid grid-cols-[8rem_1fr] items-start justify-start gap-4">
      {assignments.director.length > 0 && (
        <>
          <dt>Director:</dt>
          <dd>
            {assignments.director.map((d, idx) => (
              <span key={idx}>
                <strong>{d.name}</strong>
                {idx !== assignments.director.length - 1 && ', '}
              </span>
            ))}
          </dd>
        </>
      )}

      {assignments.camera.length > 0 && (
        <>
          <dt>Camera:</dt>
          <dd>
            {assignments.camera.map((c, idx) => (
              <span key={idx}>
                <strong>{c.name}</strong>
                {idx !== assignments.camera.length - 1 && ', '}
              </span>
            ))}
          </dd>
        </>
      )}

      {assignments.actors.length > 0 && (
        <>
          <dt>Cast:</dt>
          <dd>
            {assignments.actors.map((a, idx) => (
              <span key={idx}>
                <strong>
                  <Link to={`/figure/${a.slug}`}>{a.name}</Link>
                </strong>
                {idx !== assignments.actors.length - 1 && ', '}
              </span>
            ))}
          </dd>
        </>
      )}
    </dl>
  );
}

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
    director: Array<{ name: string; slug: string; role: string }>;
    camera: Array<{ name: string; slug: string; role: string }>;
    actors: Array<{ name: string; slug: string; role: string }>;
  }>(
    (acc, figure) => {
      if (figure.role === 'director') acc.director.push({ name: figure.name, slug: figure.slug, role: figure.role });
      if (figure.role === 'director of photography') acc.camera.push({ name: figure.name, slug: figure.slug, role: figure.role });
      if (figure.role === 'main character') acc.actors.push({ name: figure.name, slug: figure.slug, role: figure.role });
      if (figure.role === 'supporting character') acc.actors.push({ name: figure.name, slug: figure.slug, role: figure.role });

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
                <strong>
                  <a href={`/figure/${d.slug}`}>{d.name}</a>
                </strong>
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
                <strong>
                  <a href={`/figure/${c.slug}`}>{c.name}</a>
                </strong>
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
                  <a href={`/figure/${a.slug}`}>{a.name}</a>
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

import { Fragment } from 'preact/jsx-runtime';

export function MultilineText({ text }: { text: string }) {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i !== lines.length - 1 && <br />}
    </Fragment>
  ));
}

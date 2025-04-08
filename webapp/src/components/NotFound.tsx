export function NotFound() {
  return (
    <section className="relative -top-[61px] grid flex-1 grid-cols-2 place-items-center gap-8">
      <img src="/404.webp" className="w-[740px]" alt="Not found illustration" />
      <aside className="flex flex-col items-start gap-8">
        <p className="text-3xl font-bold">
          OOPS! Something went wrong
          <br />
          We can&apos;t find the page you&apos;re looking for.
        </p>
        <a href="/" className="rounded-md bg-[#ed1e25] px-8 py-2 text-2xl font-bold">
          Back home
        </a>
      </aside>
    </section>
  );
}

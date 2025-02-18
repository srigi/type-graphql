export function NotFound() {
  return (
    <section className="flex-1 grid grid-cols-2 gap-8 place-items-center relative -top-[61px]">
      <img src="/404.webp" className="w-[740px]" alt="Not found illustration" />
      <aside className="flex flex-col items-start gap-8">
        <p className="font-bold text-3xl">
          OOPS! Something went wrong
          <br />
          We can't find the page you're looking for.
        </p>
        <a href="/" className="bg-[#ed1e25] px-8 py-2 font-bold text-2xl rounded-md">
          Back home
        </a>
      </aside>
    </section>
  );
}

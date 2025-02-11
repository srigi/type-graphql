import { useState } from 'preact/hooks';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <main class="container">
      <h1>Vite TS</h1>
      <pre>{JSON.stringify(process.env.API_BASE_URL)}</pre>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </main>
  );
}

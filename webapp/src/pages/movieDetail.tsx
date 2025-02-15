import { useParams } from 'react-router-dom';

export function MovieDetailPage() {
  const { publicId } = useParams();
  return (
    <main class="container flex flex-col gap-4 my-4">
      <h1 className="text-7xl font-bold">Movie {publicId}</h1>
      <div class="bg-gray-500 h-80 flex items-center justify-center text-6xl">hero</div>

      <div class="grid grid-cols-3 gap-4">
        <div class="bg-gray-400 h-60 flex items-center justify-center text-6xl">Movie {publicId} thumbnail</div>
        <div class="bg-gray-400 h-60 flex items-center justify-center text-6xl">Movie {publicId} thumbnail</div>
      </div>
    </main>
  );
}

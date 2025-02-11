import { useState } from 'preact/hooks';
import { useQuery } from 'urql';

import { graphql } from '~gql';

const recipesQueryDocument = graphql(/* GraphQL */ `
  query Recipes($skip: Int!, $take: Int!) {
    recipes(skip: $skip, take: $take) {
      id
      title
      description
    }
  }
`);

export function App() {
  const [count, setCount] = useState(0);
  const [{ data, error }] = useQuery({
    query: recipesQueryDocument,
    variables: { skip: 15, take: 5 },
  });

  if (error != null) return <p>Error... {error.message}</p>;

  return (
    <main class="container">
      <h1>Vite TS</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>

      {data != null && (
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="px-6 py-3">ID</th>
              <th class="px-6 py-3">title</th>
              <th class="px-6 py-3">description</th>
            </tr>
          </thead>
          <tbody>
            {data.recipes.map((recipe) => (
              <tr key={recipe.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{recipe.id}</td>
                <td class="px-6 py-4">{recipe.title}</td>
                <td class="px-6 py-4">{recipe.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

import { Link } from 'react-router-dom';

export function IndexPage() {
  return (
    <>
      <div class="bg-gray-500 h-80 flex items-end justify-start p-4 md:w-152">hero</div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div class="bg-gray-400 h-86 flex items-center justify-center">
          <Link className="hover:underline" to={`movie/${'1'}`}>
            Movie card {`${'1'}`}
          </Link>
        </div>
        <div class="bg-gray-400 h-86 flex items-center justify-center">
          <Link className="hover:underline" to={`movie/${'2'}`}>
            Movie card {`${'2'}`}
          </Link>
        </div>
        <div class="bg-gray-400 h-86 flex items-center justify-center">
          <Link className="hover:underline" to={`movie/${'3'}`}>
            Movie card {`${'3'}`}
          </Link>
        </div>
        <div class="bg-gray-400 h-86 flex items-center justify-center">
          <Link className="hover:underline" to={`movie/${'4'}`}>
            Movie card {`${'4'}`}
          </Link>
        </div>
        <div class="bg-gray-400 h-86 flex items-center justify-center">
          <Link className="hover:underline" to={`movie/${'5'}`}>
            Movie card {`${'5'}`}
          </Link>
        </div>
        <div class="bg-gray-400 h-86 flex items-center justify-center">
          <Link className="hover:underline" to={`movie/${'6'}`}>
            Movie card {`${'6'}`}
          </Link>
        </div>
      </div>
    </>
  );
}

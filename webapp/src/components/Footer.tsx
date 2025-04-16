import { h } from 'preact';

export function Footer() {
  return (
    <footer className="w-full bg-gray-800">
      <div className="container flex">
        <div className="w-1/3 justify-center px-6 py-8 text-gray-300">
          <p className="mb-4">&copy;2025 MovieApp</p>
          <p className="text-sm italic">Your favorite movies, all in one place</p>
        </div>

        <div className="flex w-2/3 gap-12 px-12 py-8 text-gray-200">
          <div>
            <h4 className="mb-2 font-semibold">Company</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Support</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Follow Us</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

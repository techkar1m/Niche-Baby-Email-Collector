import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full py-6 px-8">
      <nav className="max-w-[100rem] mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-heading text-foreground">
          Niche Baby
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-base font-paragraph text-foreground hover:text-primary transition-colors">
            Home
          </Link>
        </div>
      </nav>
    </header>
  );
}

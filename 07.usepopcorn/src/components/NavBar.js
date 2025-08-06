import { Logo } from "./Logo";
import { Search } from "./Search";

// ✅ we used component composition -> so that we don't have to pass props and avoid prop drilling problem
export function NavBar({ children, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      {children}
    </nav>
  );
}

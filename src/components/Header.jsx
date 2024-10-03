import { Link } from "react-router-dom";
import logo from "../assets/vote-logo.svg";

function Header() {
  return (
    <header className="main-header">
      <header className="header-line top-lvl-header">
        <img className="header-logo"
          src={logo}
          alt="Vote website logo."
          width={100}
          height={100}
        />
        <h1 className="site-title">Vote</h1>
      </header>
      <nav className="navigation header-line">
        <Link to="/" className="nav-link">Polls</Link>
        <Link to="/create" className="nav-link">Create Poll</Link>
      </nav>
    </header>
  );
}

export default Header;

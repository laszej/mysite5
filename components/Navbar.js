import Link from "next/link";
import Image from "next/image";
import CodeIcon from "../public/code.svg";
import twitter from "../public/twitter.svg";
import facebook from "../public/facebook.svg";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom" style={{ display: "flex", alignItems: "center" }}>
      <div className="container">
        {/* Logo i nagłówek */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src={CodeIcon} alt="Code" height={60} width={60} />
          <h5 className="ms-2 fw-bold text-info" style={{ marginTop: "0.5rem", letterSpacing: "0.05rem" }}>
            Stanisław Laskowski front-end developer
          </h5>
        </div>

        {/* Przycisk dla wersji mobilnej */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Linki nawigacyjne */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">Strona startowa</Link>
            </li>

            <li className="nav-item">
              <Link href="/artykuly" className="nav-link">Aktualności</Link>
            </li>

            {/* Dropdown: Portfolio */}
            <li className="nav-item dropdown">
              <button className="btn dropdown-toggle nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                Portfolio
              </button>
              <ul className="dropdown-menu bg-dark-custom">
                <li><Link href="/vanilla" className="dropdown-item text-white">Vanilla JS</Link></li>
                <li><Link href="/reactnext" className="dropdown-item text-white">React & Next.js</Link></li>
              </ul>
            </li>

            {/* Dropdown: Admin */}
            <li className="nav-item dropdown">
              <button className="btn dropdown-toggle nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                Admin
              </button>
              <ul className="dropdown-menu bg-dark-custom">
                <li><Link href="/admin" className="dropdown-item text-white">Panel Admina</Link></li>
                <li><Link href="/admin/editor" className="dropdown-item text-white">Dodaj artykuł</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link href="/about" className="nav-link">O mnie</Link>
            </li>

            {/* Ikony społecznościowe */}
            <li className="nav-item d-flex align-items-center ms-3" id="socials">
              <Link href="https://www.facebook.com/laszej" target="_blank" rel="noopener noreferrer" className="nav-link">
                <Image src={facebook} alt="Facebook" height={20} width={20} />
              </Link>
              <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="nav-link">
                <Image src={twitter} alt="Twitter" height={20} width={20} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import CodeIcon from "../public/code.svg";
import twitter from "../public/twitter.svg";
import facebook from "../public/facebook.svg";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/check", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setIsLoggedIn(data.isAuthenticated);
    } catch (error) {
      console.error("Błąd autoryzacji:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // 1) Wywołanie przy montowaniu
    checkAuth();

    // 2) Nasłuchiwanie zmiany trasy
    const handleRouteChange = () => {
      checkAuth();
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, checkAuth]);

  if (loading) {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark-custom"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="container"></div>
      </nav>
    );
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark-custom"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="container">
        {/* Logo i nagłówek */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src={CodeIcon} alt="Code" height={60} width={60} />
          <h5
            className="ms-2 fw-bold text-info"
            style={{ marginTop: "0.5rem", letterSpacing: "0.05rem" }}
          >
            Stanisław Laskowski front-end developer
          </h5>
        </div>

        {/* Przycisk hamburgerek */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Linki menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Strona startowa */}
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Strona startowa
              </Link>
            </li>

            {/* Aktualności */}
            <li className="nav-item">
              <Link href="/artykuly" className="nav-link">
                Aktualności
              </Link>
            </li>

            {/* Dropdown: Portfolio */}
            <li className="nav-item dropdown">
              <button
                className="btn dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
                style={{ background: "transparent", border: "none", color: "#fff" }}
              >
                Portfolio
              </button>
              <ul className="dropdown-menu dropdown-menu-dark bg-dark-custom">
                <li>
                  <Link href="/vanilla" className="dropdown-item">
                    Vanilla JS
                  </Link>
                </li>
                <li>
                  <Link href="/reactnext" className="dropdown-item">
                    React & Next.js
                  </Link>
                </li>
              </ul>
            </li>

            {/* Dropdown: Admin (tylko gdy zalogowany) */}
            {isLoggedIn && (
              <li className="nav-item dropdown">
                <button
                  className="btn dropdown-toggle nav-link"
                  data-bs-toggle="dropdown"
                  style={{ background: "transparent", border: "none", color: "#fff" }}
                >
                  Admin
                </button>
                <ul className="dropdown-menu dropdown-menu-dark bg-dark-custom">
                  <li>
                    <Link href="/admin" className="dropdown-item">
                      Panel Admina
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/editor" className="dropdown-item">
                      Dodaj artykuł
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {/* O mnie */}
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                O mnie
              </Link>
            </li>

            {/* Logowanie / Wylogowanie */}
            {isLoggedIn ? (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={async () => {
                    await fetch("/api/logout", { method: "POST", credentials: "include" });
                    setIsLoggedIn(false);
                    router.push("/");
                  }}
                >
                  Wyloguj
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link href="/login" className="nav-link">
                  Zaloguj
                </Link>
              </li>
            )}

            {/* Ikony social */}
            <li className="nav-item d-flex align-items-center ms-3" id="socials">
              <Link
                href="https://www.facebook.com/laszej"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <Image src={facebook} alt="Facebook" height={20} width={20} />
              </Link>
              <Link
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
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

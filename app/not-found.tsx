import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas. Recherchez votre ligne de taxi-be ou retournez à l'accueil.",
};

const LIENS_RAPIDES = [
  { label: "Trouver une ligne",   href: "/recherche",  desc: "Recherchez par numéro" },
  { label: "Blog & actualités",   href: "/blog",       desc: "Conseils et nouveautés" },
  { label: "Aide & FAQ",          href: "/aide",       desc: "Réponses aux questions" },
  { label: "Télécharger l'app",   href: "/telecharger", desc: "Android, gratuit" },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <style>{`
        .nf-wrap {
          min-height: 70vh; background: #F8F9FB;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 60px 24px; text-align: center;
        }
        .nf-code {
          font-size: clamp(5rem, 20vw, 9rem);
          font-weight: 900; line-height: 1;
          color: #E8ECF0; letter-spacing: -0.04em;
          margin: 0 0 -8px; user-select: none;
        }
        .nf-title {
          font-size: clamp(1.3rem, 4vw, 1.8rem);
          font-weight: 900; color: #0D1525;
          margin: 0 0 12px; letter-spacing: -0.02em;
        }
        .nf-desc {
          font-size: 0.95rem; color: #64748B;
          max-width: 400px; margin: 0 auto 36px;
          line-height: 1.7;
        }
        .nf-search {
          display: flex; align-items: center;
          background: white; border: 1.5px solid #E2E8F0;
          border-radius: 12px; overflow: hidden;
          width: 100%; max-width: 420px;
          box-sizing: border-box;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          margin: 0 auto 40px;
        }
        .nf-search:focus-within { border-color: #FFB800; }
        .nf-search input {
          flex: 1 1 0; min-width: 0; width: 0;
          border: none; outline: none;
          padding: 0 14px; height: 52px;
          font-size: 0.95rem; font-family: var(--font-inter), system-ui;
          color: #0D1525; background: transparent;
        }
        .nf-search input::placeholder { color: #94A3B8; }
        .nf-search button {
          flex-shrink: 0; height: 52px; padding: 0 20px;
          background: #FFB800; border: none; cursor: pointer;
          font-weight: 800; font-size: 0.88rem; color: #0D1525;
          font-family: var(--font-inter), system-ui;
        }
        .nf-links {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 10px; width: 100%; max-width: 480px; margin: 0 auto;
        }
        .nf-link {
          display: block; background: white; border-radius: 10px;
          border: 1px solid #E8ECF0; padding: 14px 16px;
          text-decoration: none; text-align: left;
          transition: border-color 0.12s, box-shadow 0.12s;
        }
        .nf-link:hover { border-color: #FFB800; box-shadow: 0 2px 12px rgba(255,184,0,0.12); }
        .nf-link-label { font-size: 0.82rem; font-weight: 700; color: #0D1525; margin: 0 0 2px; }
        .nf-link-desc  { font-size: 0.73rem; color: #94A3B8; margin: 0; }
        .nf-home { margin-top: 28px; font-size: 0.84rem; color: #94A3B8; }
        .nf-home a { color: #FFB800; font-weight: 700; text-decoration: none; }
        .nf-home a:hover { text-decoration: underline; }
        @media (max-width: 400px) {
          .nf-links { grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="nf-wrap">
        <p className="nf-code">404</p>
        <h1 className="nf-title">Page introuvable</h1>
        <p className="nf-desc">
          Cette page n&apos;existe pas ou a été déplacée.<br />
          Recherchez votre ligne ou explorez le site.
        </p>

        <form action="/recherche" method="GET" className="nf-search">
          <input
            name="q"
            placeholder="Numéro de ligne (ex : 147)"
            autoComplete="off"
            inputMode="search"
          />
          <button type="submit">Chercher</button>
        </form>

        <div className="nf-links">
          {LIENS_RAPIDES.map((l) => (
            <Link key={l.href} href={l.href} className="nf-link">
              <p className="nf-link-label">{l.label}</p>
              <p className="nf-link-desc">{l.desc}</p>
            </Link>
          ))}
        </div>

        <p className="nf-home">
          Ou retournez à <Link href="/">l&apos;accueil →</Link>
        </p>
      </main>

      <Footer />
    </>
  );
}

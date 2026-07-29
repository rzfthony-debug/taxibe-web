import Image from "next/image";
import Link from "next/link";

const CARDS = [
  {
    image: "/citoyen.png",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: "Citoyens",
    subtitle: "Préparer ses déplacements plus facilement.",
    desc: "Retrouvez les informations utiles pour organiser vos trajets au quotidien, que vous soyez étudiant, travailleur, habitant ou visiteur.",
    cta: null,
  },
  {
    image: "/cooperatives.png",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "Coopératives",
    subtitle: "Valoriser les réseaux de transport.",
    desc: "Présentez plus facilement les lignes, les arrêts et les services proposés à vos usagers.",
    cta: { label: "Collaborer avec nous →", href: "/partenaires#cooperatives" },
  },
  {
    image: "/institutions.png",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/>
        <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>
      </svg>
    ),
    title: "Institutions publiques",
    subtitle: "Contribuer à une mobilité mieux organisée.",
    desc: "Des données structurées pour accompagner la réflexion autour de l'organisation du transport collectif à Antananarivo.",
    cta: { label: "En savoir plus →", href: "/partenaires#institutions" },
  },
];

export default function PourQuiSection() {
  return (
    <section className="sec" style={{ background: "#F8F9FB" }}>
      <style>{`
        @keyframes pourquiFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pourqui-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 52px;
        }
        .pourqui-card {
          background: white;
          border-radius: 20px;
          border: 1px solid #E8ECF0;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
          opacity: 0;
          animation: pourquiFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .pourqui-card:nth-child(1) { animation-delay: 0.05s; }
        .pourqui-card:nth-child(2) { animation-delay: 0.18s; }
        .pourqui-card:nth-child(3) { animation-delay: 0.31s; }
        .pourqui-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 16px 48px rgba(0,0,0,0.11), 0 2px 8px rgba(0,0,0,0.06);
        }
        .pourqui-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
        }
        .pourqui-gradient {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 28%;
          background: linear-gradient(to bottom, transparent, white);
          pointer-events: none;
        }
        .pourqui-body {
          padding: 0 28px 36px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pourqui-icon {
          width: 44px; height: 44px; border-radius: 50%;
          background: #FFB800;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pourqui-card:hover .pourqui-icon {
          transform: scale(1.15) rotate(-6deg);
        }
        @media (max-width: 860px) {
          .pourqui-grid { grid-template-columns: 1fr; max-width: 460px; margin: 52px auto 0; }
          .pourqui-card:nth-child(2) { animation-delay: 0.10s; }
          .pourqui-card:nth-child(3) { animation-delay: 0.18s; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 12 }}>
            Pour qui ?
          </p>
          <h2 style={{ fontSize: "clamp(1.4rem, 4vw, 2.1rem)", fontWeight: 900, color: "#0D1525", marginBottom: 14, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
            Une plateforme pensée pour <span style={{ color: "#FFB800" }}>tous les acteurs</span> du transport collectif.
          </h2>
          <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.75, margin: 0 }}>
            TaxiBe accompagne les citoyens, les coopératives et les institutions en facilitant l&apos;accès aux informations essentielles sur la mobilité.
          </p>
        </div>

        <div className="pourqui-grid">
          {CARDS.map((c) => (
            <div key={c.title} className="pourqui-card">
              <div className="pourqui-img-wrap">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 860px) 90vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
                <div className="pourqui-gradient" />
              </div>
              <div className="pourqui-body">
                <div className="pourqui-icon">
                  {c.icon}
                </div>
                <h3 style={{ fontWeight: 900, fontSize: "1.05rem", color: "#0D1525", margin: 0 }}>{c.title}</h3>
                <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0D1525", margin: 0, lineHeight: 1.5 }}>{c.subtitle}</p>
                <p style={{ fontSize: "0.82rem", color: "#64748B", margin: 0, lineHeight: 1.65 }}>{c.desc}</p>
                {c.cta && (
                  <Link href={c.cta.href} style={{ display: "inline-block", marginTop: 6, fontSize: "0.78rem", fontWeight: 700, color: "#B8860B", textDecoration: "none" }}>
                    {c.cta.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: "0.88rem", color: "#94A3B8", marginTop: 52, lineHeight: 1.75, maxWidth: 520, margin: "52px auto 0", fontStyle: "italic" }}>
          Un même objectif : rendre les déplacements plus simples grâce à une information plus accessible.
        </p>

      </div>
    </section>
  );
}

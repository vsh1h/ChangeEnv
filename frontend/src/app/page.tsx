import Link from "next/link";

const impactCategories = [
  {
    title: "Transport",
    description: "Bike, public transit, EV pooling and verified distance logs.",
  },
  {
    title: "Energy",
    description: "LED adoption, kWh savings, rooftop solar and home audits.",
  },
  {
    title: "Tree Planting",
    description: "Absorption modeled with species-aware impact assumptions.",
  },
  {
    title: "Waste",
    description: "Composting and recycling streams converted into CO2e impact.",
  },
];

const workflowSteps = [
  {
    title: "Log actions",
    description:
      "Users record measurable transport, energy, waste or tree-planting actions.",
  },
  {
    title: "Earn credits",
    description:
      "A strategy-based carbon engine converts impact to credits and flags anomalies.",
  },
  {
    title: "Sell or offset",
    description:
      "Credits are traded in the marketplace and converted into offset certificates.",
  },
];

const actorCards = [
  {
    actor: "Users",
    details: "Log eco actions, earn credits, and list them on the marketplace.",
  },
  {
    actor: "Organizations",
    details: "Sponsor climate challenges and monitor participation over time.",
  },
  {
    actor: "Businesses",
    details: "Purchase credits and generate auditable offset records.",
  },
  {
    actor: "Admins",
    details: "Review suspicious activity and control fraud moderation workflows.",
  },
];

export default function HomePage() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <Link href="/" className="brand-block">
          <span className="brand-name">ChangeEnv</span>
          <span className="brand-tag">Green Credit Economy</span>
        </Link>

        <nav className="landing-nav-links">
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/login">Sign In</Link>
          <Link href="/signup" className="join-pill">
            Join Free
          </Link>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero-block">
          <p className="eyebrow">A Green Credit Economy</p>
          <h1>Turn small eco-actions into verifiable credits.</h1>
          <p>
            ChangeEnv rewards sustainable behavior with measurable Green Credits
            and enables transparent offset purchasing with a complete audit
            trail.
          </p>

          <div className="hero-actions">
            <Link href="/signup" className="cta-primary">
              Join the Economy
            </Link>
            <Link href="/marketplace" className="cta-ghost">
              Explore Marketplace
            </Link>
          </div>

          <ul className="hero-stats">
            <li>4 roles supported</li>
            <li>Strategy-driven carbon engine</li>
            <li>Atomic wallet transactions</li>
            <li>Fraud review workflow</li>
          </ul>
        </section>

        <section className="landing-section">
          <div className="section-head">
            <p className="eyebrow">Carbon Calculation Engine</p>
            <h2>Four impact categories, one transparent formula per action.</h2>
          </div>
          <div className="impact-grid">
            {impactCategories.map((category) => (
              <article key={category.title} className="impact-card">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section process-wrap">
          <div className="section-head">
            <p className="eyebrow">How It Works</p>
            <h2>From action logs to tradable climate value in three steps.</h2>
          </div>
          <div className="process-grid">
            {workflowSteps.map((step, index) => (
              <article key={step.title} className="process-card">
                <span className="step-index">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section">
          <div className="section-head">
            <p className="eyebrow">Built For Four Actors</p>
            <h2>A platform that treats sustainability like an economy.</h2>
          </div>
          <div className="actor-grid">
            {actorCards.map((card) => (
              <article key={card.actor} className="actor-card">
                <h3>{card.actor}</h3>
                <p>{card.details}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <h2>Ready to log your first action?</h2>
          <p>
            Create an account and earn Green Credits for your first commute,
            kWh saved, or sapling planted.
          </p>
          <Link href="/signup" className="cta-primary">
            Create an account
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <span>© ChangeEnv · Green Credit Economy Platform</span>
      </footer>
    </div>
  );
}

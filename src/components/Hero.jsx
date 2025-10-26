

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Plan Your Perfect <span className="highlight">Adventure</span>
            <br />
            All in One Place
          </h1>
          <p className="hero-subtitle">
            From research and inspiration to the perfect route, accommodations,
            things to do and transportation - OuterMiles simplifies your entire
            travel planning process.
          </p>
          <div className="hero-actions">
            <button
              className="btn-hero-primary"
              onclick="window.location.href='login.html'"
            >
              Start Planning
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Travelers</span>
            </div>
            <div className="stat">
              <span className="stat-number">100K+</span>
              <span className="stat-label">Trips Planned</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Business Partners</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image" />
          <div className="floating-cards">
            <div className="card card-1">
              <i className="fas fa-map-marked-alt" />
              <span>Route Planning</span>
            </div>
            <div className="card card-2">
              <i className="fas fa-hotel" />
              <span>Accommodations</span>
            </div>
            <div className="card card-3">
              <i className="fas fa-camera" />
              <span>Activities</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bg-elements">
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
        <div className="bg-circle bg-circle-3" />
      </div>
    </section>

  );
}
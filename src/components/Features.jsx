

function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2>Everything You Need for Perfect Trips</h2>
          <p>One app to replace them all - streamline every aspect of your journey</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-route"></i></div>
            <h3>Smart Route Planning</h3>
            <p>AI-powered route optimization that saves time and maximizes your experiences based on your preferences.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-bed"></i></div>
            <h3>Accommodation Booking</h3>
            <p>Find and book the perfect stays with integrated booking and real-time availability checks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-wallet"></i></div>
            <h3>Budget Tracking</h3>
            <p>Keep track of expenses, set budgets, and get spending insights throughout your journey.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-users"></i></div>
            <h3>Collaborative Planning</h3>
            <p>Plan together with friends and family with real-time collaboration and shared itineraries.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-mobile-alt"></i></div>
            <h3>Offline Access</h3>
            <p>Access your itinerary, maps, and important info even without internet connection.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-heart"></i></div>
            <h3>Memory Keeping</h3>
            <p>Capture and organize your travel memories with photos, notes, and experiences.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Features;
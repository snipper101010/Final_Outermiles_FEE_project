const trips = [
  {
    title: "Magical Japan Experience",
    locations: "Tokyo, Kyoto, Osaka",
    desc: "Immerse yourself in Japan's rich culture, from bustling Tokyo streets to serene Kyoto temples and delicious Osaka street food.",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    badge: "Popular",
    duration: "7 Days",
    price: "$1,299"
  },
  {
    title: "European Grand Tour",
    locations: "Paris, Rome, Barcelona",
    desc: "Experience Europe's most iconic cities, from the romantic streets of Paris to the historic wonders of Rome and vibrant Barcelona.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    badge: "Adventure",
    duration: "10 Days",
    price: "$2,199"
  },
  {
    title: "Tropical Paradise Escape",
    locations: "Maldives, Seychelles",
    desc: "Relax in overwater bungalows, dive in crystal-clear waters, and enjoy world-class spa treatments in this tropical paradise.",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    badge: "Luxury",
    duration: "5 Days",
    price: "$3,499"
  },
  {
    title: "Iceland Adventure",
    locations: "Reykjavik, Golden Circle, South Coast",
    desc: "Witness the Northern Lights, explore ice caves, relax in geothermal springs, and discover Iceland's dramatic landscapes.",
    img: "https://images.unsplash.com/photo-1418854982207-12f710b74003?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    badge: "Nature",
    duration: "8 Days",
    price: "$2,799"
  },
  {
    title: "Indian Cultural Journey",
    locations: "Delhi, Agra, Jaipur",
    desc: "Experience the vibrant colors, rich history, and diverse culture of India's Golden Triangle. Visit ancient monuments and taste authentic cuisine.",
    img: "https://assets.gqindia.com/photos/656da9a0f1ef627c90db5fb8/16:9/w_1920,h_1080,c_limit/7-places-in-India-you-should-experience-as-a-solo-traveller_003.jpg",
    badge: "Cultural",
    duration: "12 Days",
    price: "$1,899"
  },
  {
    title: "Canadian Rockies Explorer",
    locations: "Banff, Jasper, Lake Louise",
    desc: "Discover the majestic mountains, pristine lakes, and abundant wildlife of the Canadian Rockies in this outdoor adventure.",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    badge: "Nature",
    duration: "9 Days",
    price: "$2,499"
  }
];

export default function FeaturedTrips() {
  return (
    <section id="featured-trips" className="featured-trips">
      <div className="container">
        <div className="section-header">
          <h2>Featured Trips & Destinations</h2>
          <p>Discover handpicked adventures and popular destinations from our travel experts</p>
        </div>
        <div className="trips-grid">
          {trips.map((t, i) => (
            <div className="trip-card" key={i}>
              <div className="trip-image" style={{ backgroundImage: `url(${t.img})` }}>
                <div className="trip-badge">{t.badge}</div>
                <div className="trip-duration">{t.duration}</div>
              </div>
              <div className="trip-content">
                <h3 className="trip-title">{t.title}</h3>
                <div className="trip-location"><i className="fas fa-map-marker-alt"></i> {t.locations}</div>
                <p className="trip-description">{t.desc}</p>
                <div className="trip-highlights">
                  <span className="highlight-tag">Highlights</span>
                </div>
                <div className="trip-footer">
                  <div className="trip-price">{t.price}<span className="price-label">per person</span></div>
                  <button className="btn-trip" onClick={() => window.location.href = "login.html"}>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1539650116574-75c0c6d73400?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1418854982207-12f710b74003?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
];

export default function Gallery() {
  return (
    <section className="gallery">
      <div className="container">
        <div className="section-header">
          <h2>Travel Inspiration Gallery</h2>
          <p>Get inspired by stunning destinations from around the world</p>
        </div>
        <div className="gallery-grid">
          {images.map((src, i) => (
            <div className="gallery-item" key={i} style={{ backgroundImage: `url(${src})` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
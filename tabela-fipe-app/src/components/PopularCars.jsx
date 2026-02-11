function PopularCars({ onStartSearch }) {
  const carIcon = (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5">
      <path d="M5 17h14v-5H5v5zm7-13C6.48 4 2 6.24 2 9v10c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h14v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V9c0-2.76-4.48-5-10-5z"/>
      <circle cx="7.5" cy="14.5" r="1.5"/>
      <circle cx="16.5" cy="14.5" r="1.5"/>
    </svg>
  );

  const popularCars = [
    { brand: 'Fiat', model: 'Uno', year: '2023', icon: carIcon },
    { brand: 'Volkswagen', model: 'Gol', year: '2023', icon: carIcon },
    { brand: 'Chevrolet', model: 'Onix', year: '2023', icon: carIcon },
    { brand: 'Hyundai', model: 'HB20', year: '2023', icon: carIcon },
  ];

  return (
    <section className="popular-cars">
      <h2>Carros Mais Consultados</h2>
      <div className="cars-grid">
        {popularCars.map((car, index) => (
          <div key={index} className="car-card" onClick={onStartSearch}>
            <div className="car-image">
              <div className="car-icon">{car.icon}</div>
            </div>
            <div className="car-info">
              <h3>{car.brand} {car.model}</h3>
              <p>Ano {car.year}</p>
              <button className="btn-consult">Ver Preço</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularCars;

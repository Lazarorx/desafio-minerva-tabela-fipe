function PopularCars({ onStartSearch }) {
  const popularCars = [
    { brand: 'Fiat', model: 'Uno', year: '2023', icon: '🚗' },
    { brand: 'Volkswagen', model: 'Gol', year: '2023', icon: '🚙' },
    { brand: 'Chevrolet', model: 'Onix', year: '2023', icon: '🚕' },
    { brand: 'Hyundai', model: 'HB20', year: '2023', icon: '🚘' },
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

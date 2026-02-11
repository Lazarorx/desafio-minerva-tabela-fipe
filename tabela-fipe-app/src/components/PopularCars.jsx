import '../styles/PopularCars.css';

function PopularCars({ onStartSearch }) {
  const popularCars = [
    { brand: 'Fiat', model: 'Uno', year: '2023' },
    { brand: 'Volkswagen', model: 'Gol', year: '2023' },
    { brand: 'Chevrolet', model: 'Onix', year: '2023' },
    { brand: 'Hyundai', model: 'HB20', year: '2023' },
  ];

  return (
    <section className="popular-cars">
      <h2>Carros Mais Consultados</h2>
      <div className="cars-grid">
        {popularCars.map((car, index) => (
          <div key={index} className="car-card" onClick={onStartSearch}>
            <div className="car-icon">🚗</div>
            <h3>{car.brand} {car.model}</h3>
            <p>{car.year}</p>
            <button className="btn-consult">Consultar Preço</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularCars;

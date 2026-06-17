// components/Vehicles.jsx
import React from "react";

const carData = [
  {
    id: 1,
    name: "McLaren 720s",
    price: "$420/day",
    img: "path-to-mclaren.png",
  },
  {
    id: 2,
    name: "Bentley Continental GT V8",
    price: "$380/day",
    img: "path-to-bentley-cont.png",
  },
  {
    id: 3,
    name: "Rolls-Royce Spectre",
    price: "$490/day",
    img: "path-to-spectre.png",
  },
  { id: 4, name: "Ferrari", price: "$510/day", img: "path-to-ferrari.png" },
];

export default function Vehicles() {
  return (
    <section id="vehicles" className="vehicles-section">
      <div className="section-header">
        <h2>Vehicles</h2>
        <div className="carousel-arrows">
          <button>←</button>
          <button>→</button>
        </div>
      </div>
      <div className="car-grid">
        {carData.map((car) => (
          <div key={car.id} className="car-card">
            <h4>{car.name}</h4>
            <p>{car.price}</p>
            <img src={car.img} alt={car.name} />
            <button className="arrow-btn">→</button>
          </div>
        ))}
      </div>
    </section>
  );
}

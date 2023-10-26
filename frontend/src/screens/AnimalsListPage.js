import React from "react";

const AnimalsListPage = ({ owner }) => {
  return (
    <div>
      <h1>Animais de {owner.name}</h1>
      <ul>
        {owner.animals.map((animal, index) => (
          <li key={index}>{animal}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalsListPage;

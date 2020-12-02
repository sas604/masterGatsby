import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  gap: 4rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  @supports not (grid-template-rows: subgrid) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: auto auto 500px;
  }
  display: grid;

  grid-template-rows: subgrid;
  grid-row: span 3;
  gap: 1rem;
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>

      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyles>
  );
}

export default function PizzasList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}

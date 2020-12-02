import GatsbyImage from 'gatsby-image';
import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={index}>
            <GatsbyImage fluid={pizza.image.asset.fluid} alt={pizza.name} />
            <h2>{pizza.name}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                title={`remove ${singleOrder.size} ${pizza.name}`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}

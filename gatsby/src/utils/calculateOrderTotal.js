import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // 1. loop over each item in the order
  // 2. Calc the for that pizza
  // 3. add that total to the raning total
  const total = order.reduce((acc, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    return acc + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  return total;
}

import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzasD:\projects\masterGatsby\gatsby\
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) =>
    actions.createPage({
      // slug
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    })
  );
}
/* async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1 fetch the list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // 2 Loop over each one
  for (const beer of beers) {
    // create a node

    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({ ...beer, ...nodeMeta });
  }
} */

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  // TODO: Turn each slicemasters into their own page
  data.slicemasters.nodes.forEach((person) =>
    actions.createPage({
      path: `slicemaster/${person.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        name: person.name,
      },
    })
  );

  // figure out how many pages!
  const pageSize = +process.env.GATSBY_PAGE_SIZE;
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // loop from 1 to n
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

// 3 Create a node for a beer
// export async function sourceNodes(params) {
//   // fetch a list of beers
//   await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
// }

async function turnToppingIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  // 3. Loop over each topping and create a page for that topping
  data.toppings.nodes.forEach((topping) =>
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    })
  );
}

export async function createPages(params) {
  // Create pages dynamically
  // 1.pizzas
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);

  // 2. Toppings

  // 3. Slicemasters
}

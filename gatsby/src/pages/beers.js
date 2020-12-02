import { graphql } from 'gatsby';
import React from 'react';
import BeerList from '../components/BeersList';

export default function BeerPage({ data }) {
  return null;
}

/* export const query = graphql`
  query BeerQuery {
    allBeer {
      nodes {
        name
        price
        id
        image
        rating {
          reviews
          average
        }
      }
    }
  }
`; */

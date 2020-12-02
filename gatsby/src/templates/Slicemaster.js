import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import SEO from '../components/SEO';

export default function Slicemaster({ data }) {
  return (
    <>
      <SEO
        title={data.slicemaster.name}
        image={data.slicemaster.image.asset.src}
      />
      <div className="center">
        <GatsbyImage
          fluid={data.slicemaster.image.asset.fluid}
          alt={data.slicemaster.name}
        />
        <h2>
          <span className="mark">{data.slicemaster.name}</span>
        </h2>
        <p>{data.slicemaster.description}</p>
      </div>
    </>
  );
}
export const query = graphql`
  query($name: String!) {
    slicemaster: sanityPerson(name: { eq: $name }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 410) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

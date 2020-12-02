import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyle = styled.nav`
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin-bottom: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    text-align: center;
    list-style: none;
    gap: 2rem;
    align-items: center;
    margin-top: -6rem;
  }
  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    &:nth-child(1) {
      --rotate: 1deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
    &:hover {
      --rotate: 3deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover,
    &:focus {
      color: var(--red);
    }
  }
`;
export default function Nav() {
  return (
    <NavStyle>
      <ul>
        <li>
          <Link to="/">Hot now</Link>
        </li>
        <li>
          {' '}
          <Link to="/pizzas">Pizza Menu </Link>
        </li>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          {' '}
          <Link to="/slicemasters">SliceMasters </Link>
        </li>
        <li>
          {' '}
          <Link to="/order">Order Ahead!</Link>
        </li>
      </ul>
    </NavStyle>
  );
}

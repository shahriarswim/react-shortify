import React from 'react';

import './Header.css';

const Header = () => (
  <header className="header">
    <div>
      <h1 className="header__heading">
        Shorti-fy
      </h1>
    </div>
    <div>
      <a className="header__link" href="https://twitter.com/shahriar_swim">
        Crafted by Shahriar Swim ❤
      </a>
    </div>
  </header>
);

export default Header;

import React from 'react';
import Image from 'next/image';

export default function Header() {
  return (
    <header id="header">
      <a href="/">
        <Image
          height="55px"
          width="55px"
          src="/lego-logo.png"
          alt="Lego Logo"
        />
      </a>

      <div className="title">
        <a href="/series">SERIES</a>
      </div>
		</header>
  );
}

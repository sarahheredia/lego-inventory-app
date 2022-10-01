import React from 'react';
import Image from 'next/image';

export default function Header() {
  return (
    <header id="header">
      <Image
        height="55px"
        width="55px"
        src="/lego-logo.png"
        alt="Lego Logo"
      />
      <div className="title">JAVIEN'S LEGO SETS</div>
		</header>
  );
}

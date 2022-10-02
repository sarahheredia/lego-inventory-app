import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header id="header">
      <Link href="/" passHref>
        <a>
          <Image
            height="55px"
            width="55px"
            src="/lego-logo.png"
            alt="Lego Logo"
          />
        </a>
      </Link>

      <div className="title">
        <Link href="/series">
          <a>SERIES</a>
        </Link>
      </div>
		</header>
  );
}

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
                <div className="container flex items-center justify-between py-4">
                    <h1 className="text-lg md:text-xl font-heading">Hello Gorgeous Med Spa</h1>
                    <nav>
                        <ul className="flex gap-6 text-sm items-center">
                            <li>
                                <Link href="/" className="hover:underline">Home</Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:underline">Services</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:underline">About</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:underline">Contact</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="ml-4 inline-block">
                                    <button className="bg-brand text-white px-4 py-2 rounded-md">Book Now</button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
    );
};

export default Header;
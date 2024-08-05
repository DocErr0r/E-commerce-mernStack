import React from 'react';
import { AiFillFacebook, AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col gap-2 items-center justify-around px-4 sm:flex-row">
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold uppercase text-center">ESHOP</h2>
                    <div className="text-center flex flex-wrap">
                        <p>&copy; {new Date(Date.now()).getFullYear()} ESHOP. All rights reserved.</p>
                    </div>
                </div>
                <div>
                    <div className="mt-3 text-xl font-semibold  uppercase text-center">Direct Links</div>
                    <nav className="flex flex-col items-centerlg:flex-row text-center">
                        <Link href="/about" className="hover:underline">
                            About Us
                        </Link>
                        <Link href="/contact-us" className="hover:underline ">
                            Contact Us
                        </Link>
                        <Link href="/" className="hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="/" className="hover:underline">
                            Terms of Service
                        </Link>
                    </nav>
                </div>
                <div>
                    <h2 className=" mt-3 text-xl font-semibold text-center uppercase">Socials</h2>
                    <div className=" flex space-x-4 items-center">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            <AiOutlineFacebook size={22} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            <AiOutlineTwitter size={22} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            <AiOutlineInstagram size={22} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

import React from 'react';
import { AiFillFacebook, AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col gap-2 items-center justify-around px-4 sm:flex-row">
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold uppercase text-center">ESHOP</h2>
                    <div className="text-center flex flex-wrap">
                        <p>&copy; 2024 ESHOP. All rights reserved.</p>
                    </div>
                </div>
                <div>
                    <div className="mt-3 text-xl font-semibold uppercase text-center">Direct Links</div>
                    <nav className="flex flex-col items-center sm:flex-row sm:space-x-6">
                        <a href="/about" className="hover:underline">
                            About Us
                        </a>
                        <a href="/contact-us" className="hover:underline">
                            Contact Us
                        </a>
                        <a href="/" className="hover:underline">
                            Privacy Policy
                        </a>
                        <a href="/" className="hover:underline">
                            Terms of Service
                        </a>
                    </nav>
                </div>
                <div>
                    <h2 className=" mt-3 text-xl font-semibold text-center uppercase">Socials</h2>
                    <div className=" flex space-x-4">
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

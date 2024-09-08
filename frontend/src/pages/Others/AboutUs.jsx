import React from 'react';

const AboutUs = () => {
    return (
        <div className=" min-h-screen ">
            <section className="p-6 max-w-screen-xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">About Us</h2>
                <p className="text-lg leading-relaxed">Welcome to ESHOP, your number one source for all things [product category]. We're dedicated to providing you the very best of [product category], with an emphasis on dependability, customer service, and uniqueness.</p>
                <section className="my-8">
                    <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
                    <div className="flex gap-6">
                        <div className="text-center">
                            <img src="team-member-1.jpg" alt="Team Member 1" className="w-40 h-40 rounded-full object-cover mb-2" />
                            <h3 className="text-xl font-semibold">John Doe</h3>
                            <p className="text-gray-400">Founder & CEO</p>
                        </div>
                        <div className="text-center">
                            <img src="team-member-2.jpg" alt="Team Member 2" className="w-40 h-40 rounded-full object-cover mb-2" />
                            <h3 className="text-xl font-semibold">Jane Smith</h3>
                            <p className="text-gray-400">Chief Marketing Officer</p>
                        </div>
                        {/* Add more team members as needed */}
                    </div>
                </section>
                <section>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg leading-relaxed">Our mission is to provide a seamless shopping experience with top-notch customer service. We aim to exceed expectations and deliver exceptional value with every purchase.</p>
                </section>
            </section>
        </div>
    );
};

export default AboutUs;

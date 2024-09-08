import React from 'react';

const ContactUs = () => {
    return (
        <div className="min-h-screen">
            <div className="p-6 max-w-screen-xl mx-auto">
                <section className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                    <form className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <div className="grid gap-4 mb-4">
                            <div>
                                <label htmlFor="name" className="block text-lg font-medium mb-2">
                                    Name
                                </label>
                                <input type="text" id="name" name="name" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-lg font-medium mb-2">
                                    Email
                                </label>
                                <input type="email" id="email" name="email" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500" required />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-lg font-medium mb-2">
                                    Subject
                                </label>
                                <input type="text" id="subject" name="subject" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500" required />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-lg font-medium mb-2">
                                    Message
                                </label>
                                <textarea id="message" name="message" rows="4" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500" required></textarea>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition">
                            Send Message
                        </button>
                    </form>
                </section>
                <section>
                    <h2 className="text-3xl font-bold mb-4">Our Contact Information</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold">Address</h3>
                            <p className="text-gray-400">123 ESHOP Lane, Suite 100, City, State, 12345</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Phone</h3>
                            <p className="text-gray-400">+1 (123) 456-7890</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Email</h3>
                            <p className="text-gray-400">support@eshop.com</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactUs;

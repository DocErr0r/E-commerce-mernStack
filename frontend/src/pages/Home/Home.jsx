import React, { useContext } from 'react';
import AllProducts from '../Products/AllProducts';
import myContext from '../../contexts/myContext';
import Loder from '../../components/Loder';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import useFavoriate from '../../hooks/useFavoriate';

function Home() {
    useFavoriate()
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    function Icon({ id, open }) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`h-5 w-5 transition-transform ${id === open ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }

    return (
        <div className="space-y-8">
            {/* Products Section */}
            <section className="max-w-screen-xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
                <AllProducts />
            </section>

            {/* Accordion Section */}
            <section className="max-w-screen-xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-6">FAQs</h2>
                <div className="space-y-4">
                    <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(1)}>What is ESHOP?</AccordionHeader>
                        <AccordionBody>ESHOP is your one-stop shop for all your needs. We offer a wide range of products from electronics to fashion, all delivered with exceptional service. Our goal is to provide a seamless shopping experience and ensure customer satisfaction.</AccordionBody>
                    </Accordion>
                    <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(2)}>What are your shipping policies?</AccordionHeader>
                        <AccordionBody>We offer free standard shipping on orders over $50. Orders are processed within 1-2 business days and typically arrive within 5-7 business days. Expedited shipping options are available at checkout for an additional fee.</AccordionBody>
                    </Accordion>
                    {/* <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(3)}>What is your return policy?</AccordionHeader>
                        <AccordionBody>We accept returns within 30 days of purchase. Items must be in their original condition and packaging. To initiate a return, please contact our customer service team. Refunds will be processed to the original payment method once the return is received and inspected.</AccordionBody>
                    </Accordion> */}
                    <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(4)}>How can I contact customer support?</AccordionHeader>
                        <AccordionBody>You can reach our customer support team via email at support@eshop.com or by calling 1-800-123-4567. Our support hours are Monday to Friday, 9 AM to 5 PM EST. We’re here to assist you with any questions or concerns you may have.</AccordionBody>
                    </Accordion>
                </div>
            </section>
        </div>
    );
}

export default Home;

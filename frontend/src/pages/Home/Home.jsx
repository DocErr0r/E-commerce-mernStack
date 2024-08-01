import React, { useContext } from 'react';
import AllProducts from '../Products/AllProducts';
import myContext from '../../contexts/myContext';
import Loder from '../../components/Loder';

function Home() {
    const { loading } = useContext(myContext);
    if (loading) return <Loder />;
    return (
        <div className='scroll-smooth'>
            <AllProducts />
        </div>
    );
}

export default Home;

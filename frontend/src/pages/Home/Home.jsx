import React, { useContext } from 'react';
import AllProducts from '../Products/AllProducts';
import myContext from '../../contexts/myContext';
import Loder from '../../components/Loder';
import useFavoriate from '../../hooks/useFavoriate';

function Home() {
    useFavoriate()
    const { loading } = useContext(myContext);
    if (loading) return <Loder />;
    return (
        <div className='scroll-smooth'>
            <AllProducts />
        </div>
    );
}

export default Home;

import React from 'react';
import { useSelector } from 'react-redux';
import SmallProduct from '../SmallProduct';

function Favorite() {
    const { fav } = useSelector((state) => state.favoriat);
    // const fav = [];
    console.log(fav);
    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-xl m-4">Favoriet produtcs</h2>
            {fav.length !== 0 ? (
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-4">
                    {fav?.map((p) => (
                        <SmallProduct key={p._id} product={p} />
                    ))}
                </div>
            ) : (
                <div className="text-center">Please add product to favorites</div>
            )}
        </div>
    );
}

export default Favorite;

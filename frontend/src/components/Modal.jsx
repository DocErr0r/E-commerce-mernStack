import React from 'react';

export default function Modal({ isopen, onclose,children }) {
    return (
        <>
           {isopen&& (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className='fixed inset-0 bg-black opacity-50'></div>
                <div className='absolute top-[40%] right-[50%] rounded-lg z-10 text-right p-4'>
                    <button onClick={onclose}>X</button>
                    {children}
                </div>
            </div>
           )}
        </>
    );
}

import React from 'react';

function ProgressStep({ step1, step2, step3 }) {
    return (
        <div className="flex justify-center items-center flex-wrap space-x-4">
            <div className={`${step1 ? 'text-green-500' : 'text-gray-400'}`}>
                <span className="text-xs">Shipping</span>
                <div className="text-center">{step1 ? '✅' : '🔘'}</div>
            </div>
            <div className={`${step1 ? 'bg-green-500' : 'bg-gray-400'} h-0.5 w-[15%]`}></div>
            <div className={`${step2 ? 'text-green-500' : 'text-gray-400'}`}>
                <span className="text-xs">Order summery</span>
                <div className="text-center">{step2 ? '✅' : '🔘'}</div>
            </div>
            <div className={`${step2 ? 'bg-green-500' : 'bg-gray-400'} h-0.5 w-[15%]`}></div>
            <div className={`${step3 ? 'text-green-500' : 'text-gray-400'}`}>
                <span className="text-xs">Payment</span>
                <div className="text-center">{step3 ? '✅' : '🔘'}</div>
            </div>
        </div>
    );
}

export default ProgressStep;

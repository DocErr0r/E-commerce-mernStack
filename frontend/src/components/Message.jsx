import React, { useState } from 'react';

export default function Message({ varient, children }) {
    return <div className="text-red-600 flex justify-center">{children}</div>;
}

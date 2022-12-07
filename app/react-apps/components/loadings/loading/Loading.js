import React from 'react';
import './Loading.scss';

export default function Loading() {
    return (
        <div className='loading-component'>
            <div className='loading-shape'>
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40"></circle>
                </svg>
            </div>
        </div>
    );
}
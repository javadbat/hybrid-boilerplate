import React from 'react';
import './FloatingLoading.scss';
import { JBLoading } from 'jb-loading-react';
export default function FloatingLoading({isLoading}) {
    if (isLoading) {
        return (
            <div className='floating-loading'>
                <JBLoading />
            </div>
        );
    } else return null;
}

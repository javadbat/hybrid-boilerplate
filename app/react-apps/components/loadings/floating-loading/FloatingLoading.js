import React from 'react';
import Loading from '../loading/loading';
import './FloatingLoading.scss';

export default function FloatingLoading(props) {
    if (props.isLoading) {
        return (
            <div className='floating-loading'>
                <Loading />
            </div>
        );
    } else return null;
}

import React from 'react';
import Loading from '../Loading/Loading';
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

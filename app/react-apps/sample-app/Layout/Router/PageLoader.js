import React from 'react';
import Loading from '../../../components/loadings/loading/loading';
import './PageLoader.scss';

export default function PageLoader(props) {
    return (
        <div className='loading'>
            <div className='loader'>
                <Loading />
            </div>
            <div className='title-loader'>
                <span className='text-loader'>لطفا کمی صبر کنید</span>
            </div>
        </div>
    );
}

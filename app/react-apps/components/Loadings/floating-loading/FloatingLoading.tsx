import React, { Fragment } from 'react';
import './FloatingLoading.scss';
import { JBLoading } from 'jb-loading-react';
type  FloatingLoadingProps = {
    isLoading: boolean;
}
export default function FloatingLoading(props:FloatingLoadingProps) {
    if (props.isLoading) {
        return (
            <div className='floating-loading'>
                <JBLoading />
            </div>
        );
    } else return <Fragment></Fragment>;
}

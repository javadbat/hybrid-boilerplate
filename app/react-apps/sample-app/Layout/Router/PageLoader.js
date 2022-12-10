import React from 'react';
import Loading from '../../../components/loadings/loading/loading';
import { PageLoaderText, PageLoaderTextWrapper } from './PageLoader.styled';

export default function PageLoader(props) {
    return (
        <PageLoader>
            <div>
                <Loading />
            </div>
            <PageLoaderTextWrapper>
                <PageLoaderText>لطفا کمی صبر کنید</PageLoaderText>
            </PageLoaderTextWrapper>
        </PageLoader>
    );
}

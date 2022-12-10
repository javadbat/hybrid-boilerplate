import React from 'react';
import Loading from '../../../components/loadings/loading/loading';
import { PageLoaderText, PageLoaderTextWrapper,PageLoading } from './PageLoader.styled';

export default function PageLoader() {
    return (
        <PageLoading>
            <div>
                <Loading />
            </div>
            <PageLoaderTextWrapper>
                <PageLoaderText>لطفا کمی صبر کنید</PageLoaderText>
            </PageLoaderTextWrapper>
        </PageLoading>
    );
}

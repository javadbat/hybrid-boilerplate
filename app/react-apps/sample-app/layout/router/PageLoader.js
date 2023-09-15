import React from 'react';
import Loading from '../../../components/loadings/loading/Loading';
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

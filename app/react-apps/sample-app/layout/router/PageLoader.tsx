import React from 'react';
import { PageLoaderText, PageLoaderTextWrapper,PageLoading } from './PageLoader.styled';
import { JBLoading } from 'jb-loading-react';

export default function PageLoader() {
    return (
        <PageLoading>
            <div>
                <JBLoading />
            </div>
            <PageLoaderTextWrapper>
                <PageLoaderText>لطفا کمی صبر کنید</PageLoaderText>
            </PageLoaderTextWrapper>
        </PageLoading>
    );
}

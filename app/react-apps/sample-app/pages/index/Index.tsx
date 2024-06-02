import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../../../assets/images/react-logo.svg';
import './index.styled';
import { SampleAppTitle } from '../../components/layouts/app-title/AppTitle';
import { ContentBox, IndexPageWrapper, LinkBox, LogoWrapper } from './index.styled';
function Index() {
    return (
        <IndexPageWrapper>
            <ContentBox>
                <LogoWrapper>
                    <LogoImage></LogoImage>
                </LogoWrapper>
                <SampleAppTitle />
                <LinkBox>
                    <Link to="/assets-load-sample">assets load sample</Link>
                    <Link to="/folder-structure">folder structure</Link>
                </LinkBox>
            </ContentBox>
        </IndexPageWrapper>
    );
}

export default Index;
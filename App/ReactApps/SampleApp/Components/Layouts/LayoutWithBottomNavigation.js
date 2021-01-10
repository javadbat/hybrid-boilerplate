import PropTypes from 'prop-types';
import React from 'react';
import BottonNavigation from './BottomNavigation.js/BottomNavigation';
import './LayoutWithBottomNavigation.scss';
import TopNavigation from './TopNavigation/TopNavigation';
export default function LayoutWithBottomNavigation(props) {
    return (
        <div className="layout-with-bottom-navigation">
            <TopNavigation pageTitle={props.pageTitle ? props.pageTitle : 'مشاوره‌ های من'}></TopNavigation>
            <div className="content-wrapper">
                {props.children}
            </div>
            <BottonNavigation></BottonNavigation>
        </div>
    );
}
TopNavigation.propTypes = {
    pageTitle: PropTypes.string,
};

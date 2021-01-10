import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './TopNavigation.scss';
export default function TopNavigation(props) {
    const history = useHistory();
    function onButtonClicked() {
        history.goBack(`/home`);
    }
    return (
        <div className="top-navigation">
            <div className='navigation-wrapper'>
                {
                    history.length > 2 ?
                        (
                            <button className='back-button' onClick={onButtonClicked}>
                                <img className='back-image' src='/App/Assets/Images/icon/Back.svg' />
                            </button>
                        )
                        :
                        <div></div>
                }

                <span className='text-title'>{props.pageTitle}</span>
                <div className='icon-wrapper'>
                    {/*<img className='alarm-icon' src='/App/Assets/Images/alarm.svg' />*/}
                </div>
            </div>
        </div>
    );
}

TopNavigation.propTypes = {
    pageTitle: PropTypes.string,
};

import React, { useRef, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import 'jb-button';
function JBButton(props) {
    const buttonElement = useRef();
    // useLayoutEffect(() => {
    //     const handleChange = (e) => {
    //         props.onClick(e);
    //     };
    //     buttonElement.current.addEventListener('click', handleChange);
    //     return () => buttonElement.removeEventListener('onChange', handleChange);
    // }, [buttonElement]);
    useEffect(() => {
        buttonElement.current.isLoading = props.isLoading;
    }, [props.isLoading]);
    return (
        <jb-button onClick={props.onClick} ref={buttonElement} loading-text={props.loadingText ? props.loadingText : ''} type={props.type ? props.type : 'primary'} class={props.className}>{props.children}</jb-button>
    );
}
JBButton.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
    loadingText: PropTypes.string
};
export default JBButton;

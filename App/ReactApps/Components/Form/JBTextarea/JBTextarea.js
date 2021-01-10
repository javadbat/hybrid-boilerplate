/* eslint-disable no-inner-declarations */
import React, { useRef, useEffect, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import 'jb-textarea';
import { useEvent } from '../../../Utils/CustomHooks';

// eslint-disable-next-line react/display-name
const JBTextarea = React.forwardRef((props, ref) => {
    {
        //we set this state so when ref change we have a render and our event listener will be updated
        const [refChangeCount , refChangeCountSetter] = useState(0);
        const element = useRef();
        useImperativeHandle(
            ref,
            () => (element ? element.current : {}),
            [element],
        );
        useEffect(()=>{
            refChangeCountSetter(refChangeCount+1);
        },[element.current]);
        function onChange(e) {
            if (props.onChange) {
                props.onChange(e);
            }
        }
        function onKeydown(e) {
            if (props.onKeydown) {
                props.onKeydown(e);
            }
        }
        function onKeyup(e) {
            if (props.onKeyup) {
                props.onKeyup(e);
            }
        }
        function onFocus(e) {
            if (props.onFocus && e instanceof FocusEvent) {
                props.onFocus(e);
            }
        }
        function onBlur(e) {
            if (props.onBlur && e instanceof FocusEvent) {
                props.onBlur(e);
            }
        }
        useEffect(() => {
            let value = props.value;
            if (props.value == null || props.value === undefined) {
                value = '';
            }
            element.current.value = value;
        }, [props.value]);

        useEffect(() => {
            element.current.validationList = props.validationList || [];
        }, [props.validationList]);

        useEffect(() => {
            element.current.autoHeight = props.autoHeight;
        }, [props.autoHeight]);
        useEvent(element.current, 'change', onChange);
        useEvent(element.current, 'keydown', onKeydown);
        useEvent(element.current, 'keyup', onKeyup);
        useEvent(element.current, 'focus', onFocus);
        useEvent(element.current, 'blur', onBlur);
        return (
            <jb-textarea placeholder={props.placeholder} class={props.className} ref={element} label={props.label} message={props.message}></jb-textarea>
        );
    }
});

JBTextarea.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeydown: PropTypes.func,
    onKeyup: PropTypes.func,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    validationList: PropTypes.array,
    autoHeight: PropTypes.bool
};

export default JBTextarea;
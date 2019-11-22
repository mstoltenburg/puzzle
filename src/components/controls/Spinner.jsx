import React, { memo, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { rotationReducer, rotationState } from 'app/reducers';

const Spinner = ({ selector, solved }) => {
    const [rotation, updateRotation] = useReducer(
        rotationReducer, rotationState,
    );
    const changeRotation = ({ target }) => {
        updateRotation({ type: 'rotation', rotate: target.checked });
    };
    const changeDelay = ({ target }) => {
        updateRotation({ type: 'delay', delay: target.value });
    };

    useEffect(() => {
        if (solved && rotation.rotate) {
            setTimeout(() => {
                const element = selector.current;
                const { selectedIndex, length } = element;
                element.selectedIndex = (selectedIndex + 1) % length;
                element.dispatchEvent(new Event('change', { bubbles: true }));
            }, rotation.delay * 1000);
        }
    }, [solved, rotation, selector]);

    return (
        <div className="control--big">
            <label htmlFor="rotate">
                <input className="control__control" type="checkbox" id="rotate" onChange={changeRotation} checked={rotation.rotate} />
                <span className={classNames('control__icon', { 'control__icon--rotate': rotation.rotate && solved })} />
            </label>
            <span hidden={!rotation.rotate}>
                nach
                {' '}
                <input className="control__number" type="number" onChange={changeDelay} size="1" min="1" max="9" value={rotation.delay} />
                {' '}
                Sek.
            </span>
            <span>
                <div className={rotation.rotate && solved ? 'spinner' : undefined} />
            </span>
        </div>
    );
};

Spinner.propTypes = {
    selector: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]).isRequired,
    solved: PropTypes.bool.isRequired,
};

export default memo(Spinner);

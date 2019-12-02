import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Range = ({ name, value, updatePuzzle }) => {
    const changeGrid = ({ target }) => {
        updatePuzzle({ type: target.name, [target.name]: target.value });
    };

    return (
        <div className="range">
            <button
                name={name}
                value={value - 1}
                className="range__button range__button--decrease"
                type="button"
                onClick={changeGrid}
                disabled={value < 2}
            >
                <span>-</span>
            </button>
            <button
                name={name}
                value={value + 1}
                className="range__button range__button--increase"
                type="button"
                onClick={changeGrid}
                disabled={value > 5}
            >
                <span>+</span>
            </button>
            <input name={name} id={name} type="range" onChange={changeGrid} min="1" max="6" value={value} />
            <span className="range__value">{value}</span>
        </div>
    );
};

Range.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    updatePuzzle: PropTypes.func.isRequired,
};

export default memo(Range);

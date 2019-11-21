import React from 'react';
import PropTypes from 'prop-types';

const FormatButton = ({ format, disabled, changeFormat, children }) => (
    <button name="format" value={format} type="button" className="control__button" onClick={changeFormat} disabled={disabled}>
        {children}
    </button>
);

FormatButton.propTypes = {
    format: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    changeFormat: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
};

export default FormatButton;

import React from 'react';
import PropTypes from 'prop-types';

const SvgSpinner = ({ solved }) => (
    <svg className="svg-spinner" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle className={solved ? 'svg-circle' : undefined} cx="50" cy="50" r="40" />
    </svg>
);

SvgSpinner.propTypes = {
    solved: PropTypes.bool.isRequired,
};

export default SvgSpinner;

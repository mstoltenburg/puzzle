import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import imageSrc from 'app/images/IMG_0356.jpeg';

const Preview = forwardRef(({ format, updatePuzzle }, ref) => {
    const updateImage = ({ target }) => {
        updatePuzzle({ type: 'image', image: target });
    };

    return (
        <div className={`preview preview--${format}`}>
            <img className="preview__image" src={imageSrc} ref={ref} onLoad={updateImage} alt="Vorschau" />
        </div>
    );
});

Preview.propTypes = {
    format: PropTypes.string.isRequired,
    updatePuzzle: PropTypes.func.isRequired,
};

export default Preview;

import React from 'react';
import PropTypes from 'prop-types';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'app/config';
import { IMAGE } from 'app/shapes';

const Preview = ({ image }) => {
    const width = CANVAS_WIDTH / 3;
    const height = CANVAS_HEIGHT / 3;

    return !image ? null : (
        <div className="preview">
            <img width={width} height={height} src={image.img.src} alt="Vorschau" />
        </div>
    );
};

Preview.propTypes = {
    image: PropTypes.shape(IMAGE),
};

Preview.defaultProps = {
    image: undefined,
};

export default Preview;

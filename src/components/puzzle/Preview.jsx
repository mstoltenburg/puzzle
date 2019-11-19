import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import imageSrc from 'app/images/IMG_0356.jpeg';

const Preview = forwardRef(({ format, updatePuzzle }, ref) => {
    const [hidden, setHidden] = useState(true);
    const toggle = () => setHidden(!hidden);
    const updateImage = ({ target }) => {
        updatePuzzle({ type: 'image', image: target });
    };

    return (
        <div className="preview">
            <div className={`preview__canvas preview__canvas--${format}`} hidden={hidden}>
                <img className="preview__image" src={imageSrc} ref={ref} onLoad={updateImage} alt="Vorschau" />
            </div>
            <label className="preview__label" htmlFor="preview">
                <input id="preview" type="checkbox" checked={!hidden} onChange={toggle} />
                Vorschau anzeigen
            </label>
        </div>
    );
});

Preview.propTypes = {
    format: PropTypes.string.isRequired,
    updatePuzzle: PropTypes.func.isRequired,
};

export default Preview;

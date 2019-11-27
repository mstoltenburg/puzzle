import React, { memo, forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import { SOURCES } from 'app/config';

const Preview = forwardRef(({ updatePuzzle }, ref) => {
    const [hidden, setHidden] = useState(true);
    const toggle = () => setHidden(!hidden);
    const updateImage = ({ target }) => {
        updatePuzzle({ type: 'image', image: target });
    };

    return (
        <div className="preview">
            <div className="preview__canvas" hidden={hidden}>
                <img className="preview__image" src={Object.values(SOURCES)[0]} ref={ref} onLoad={updateImage} alt="Vorschau" />
            </div>
            <label className="preview__label" htmlFor="preview">
                <input className="preview__control" id="preview" type="checkbox" checked={!hidden} onChange={toggle} />
                <span className="preview__icon preview__icon--preview" />
                Vorschau anzeigen
            </label>
        </div>
    );
});

Preview.propTypes = {
    updatePuzzle: PropTypes.func.isRequired,
};

export default memo(Preview);

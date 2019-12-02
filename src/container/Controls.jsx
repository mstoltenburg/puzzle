import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';

import { FileInput, FormatButton, Range, Spinner } from 'app/components/controls';

import { FORMAT_CONTROLS } from 'app/config';
import { PUZZLE } from 'app/shapes';

const Controls = ({ puzzle, solved, sources, updatePuzzle, setSource, updateSources }) => {
    const { rows, columns, format, image } = puzzle;
    const selector = useRef(null);
    const changeImage = ({ target }) => {
        setSource(target.value);
    };
    const changeFormat = ({ target }) => {
        updatePuzzle({ type: 'format', format: target.value });
    };
    const selected = image ? image.src.replace(window.location.origin, '') : undefined;

    return (
        <div className="controls">
            <label htmlFor="foto">Motiv</label>
            <select name="foto" id="foto" className="control--big  control--select" onChange={changeImage} ref={selector} value={selected}>
                {Object.entries(sources).map(([label, value]) => (
                    <option key={label} value={value}>{label}</option>
                ))}
            </select>
            <span>Datei</span>
            <label htmlFor="file" className="control--big control--file">
                Datei wählen…
                <FileInput setSource={setSource} updateSources={updateSources} />
            </label>
            <label htmlFor="format">Format</label>
            <div className="control--big">
                {Object.entries(FORMAT_CONTROLS).map(([key, value]) => (
                    <FormatButton
                        key={key}
                        format={key}
                        disabled={key === format}
                        changeFormat={changeFormat}
                    >
                        {value}
                    </FormatButton>
                ))}
            </div>
            <label htmlFor="rows">Reihen</label>
            <Range name="rows" value={rows} updatePuzzle={updatePuzzle} />
            <label htmlFor="columns">Spalten</label>
            <Range name="columns" value={columns} updatePuzzle={updatePuzzle} />
            <span>Modus</span>
            <Spinner selector={selector} solved={solved} />
        </div>
    );
};

Controls.propTypes = {
    puzzle: PropTypes.shape(PUZZLE).isRequired,
    solved: PropTypes.bool.isRequired,
    sources: PropTypes.shape().isRequired,
    updatePuzzle: PropTypes.func.isRequired,
    setSource: PropTypes.func.isRequired,
    updateSources: PropTypes.func.isRequired,
};

export default memo(Controls);

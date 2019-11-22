import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';

import { FormatButton, Spinner } from 'app/components/controls';
import { FORMAT_CONTROLS, SOURCES } from 'app/config';

const Controls = ({
    rows, columns, format, solved, updatePuzzle, setSource,
}) => {
    const selector = useRef(null);
    const changeImage = ({ target }) => {
        setSource(target.value);
    };
    const changeRows = ({ target }) => {
        updatePuzzle({ type: 'rows', rows: target.value });
    };
    const changeColumns = ({ target }) => {
        updatePuzzle({ type: 'columns', columns: target.value });
    };
    const changeFormat = ({ target }) => {
        updatePuzzle({ type: 'format', format: target.value });
    };

    return (
        <div className="controls">
            <label htmlFor="foto">Foto</label>
            <select name="foto" id="foto" className="control--big" onChange={changeImage} ref={selector}>
                {Object.entries(SOURCES).map(([label, value]) => (
                    <option key={label} value={value}>{label}</option>
                ))}
            </select>
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
            <input id="rows" type="range" onChange={changeRows} min="1" max="6" value={rows} />
            <span className="control__value">{rows}</span>
            <label htmlFor="columns">Spalten</label>
            <input id="columns" type="range" onChange={changeColumns} min="1" max="6" value={columns} />
            <span className="control__value">{columns}</span>
            <span>Modus</span>
            <Spinner selector={selector} solved={solved} />
        </div>
    );
};

Controls.propTypes = {
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    format: PropTypes.string.isRequired,
    solved: PropTypes.bool.isRequired,
    updatePuzzle: PropTypes.func.isRequired,
    setSource: PropTypes.func.isRequired,
};

export default memo(Controls);

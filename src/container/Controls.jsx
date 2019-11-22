import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';

import irma from 'app/images/IMG_0356.jpeg';
import koali from 'app/images/DSC00577.jpeg';
import koali2 from 'app/images/DSC00578.jpeg';
import pumpkin from 'app/images/DSC00572.jpeg';
import lights from 'app/images/DSC00560.jpeg';
import pferd from 'app/images/DSC00579.jpeg';
import schwimmbad from 'app/images/schwimmbad.jpg';
import venedig from 'app/images/venedig.jpg';
import bank from 'app/images/DSC_1476.jpg';
import tour from 'app/images/tour.jpg';

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
                <option value={irma}>Irma</option>
                <option value={koali}>Koala</option>
                <option value={koali2}>Noch ein Koala</option>
                <option value={pumpkin}>Halloween</option>
                <option value={lights}>Festival of Lights</option>
                <option value={pferd}>Pferdchen</option>
                <option value={schwimmbad}>Schwimmbad</option>
                <option value={venedig}>Venedig</option>
                <option value={bank}>Bank</option>
                <option value={tour}>Tour</option>
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

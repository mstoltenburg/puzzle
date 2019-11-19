import React from 'react';
import PropTypes from 'prop-types';

import { PUZZLE } from 'app/shapes';

import irma from 'app/images/IMG_0356.jpeg';
import koali from 'app/images/DSC00577.jpeg';
import koali2 from 'app/images/DSC00578.jpeg';
import koali3 from 'app/images/DSC00572.jpeg';
import koali4 from 'app/images/DSC00563.jpeg';
import pferd from 'app/images/DSC00579.jpeg';

const Controls = ({ puzzle, updatePuzzle, setSource }) => {
    const changeImage = ({ target }) => {
        const { value } = target;
        setSource(value);
    };
    const changeRows = ({ target }) => {
        const value = parseInt(target.value, 10);
        updatePuzzle({ type: 'rows', rows: value });
    };
    const changeColumns = ({ target }) => {
        const value = parseInt(target.value, 10);
        updatePuzzle({ type: 'columns', columns: value });
    };
    const changeFormat = ({ target }) => {
        updatePuzzle({ type: 'format', format: target.value });
    };

    return (
        <div className="controls">
            <label htmlFor="foto">Foto</label>
            <select name="foto" id="foto" className="control--big" onChange={changeImage}>
                <option value={irma}>Irma</option>
                <option value={koali}>Koali</option>
                <option value={koali2}>Koali 2</option>
                <option value={koali3}>Kürbis</option>
                <option value={koali4}>Festival of Lights</option>
                <option value={pferd}>Pferdchen</option>
            </select>
            <label htmlFor="format">Format</label>
            <div className="control--big">
                <button name="format" value="landscape" type="button" className="control__button" onClick={changeFormat}>
                    Querformat
                </button>
                <button name="format" value="square" type="button" className="control__button" onClick={changeFormat}>
                    Quadrat
                </button>
                <button name="format" value="portrait" type="button" className="control__button" onClick={changeFormat}>
                    Hochformat
                </button>
            </div>
            <label htmlFor="rows">Reihen</label>
            <input id="rows" type="range" onChange={changeRows} min="1" max="6" value={puzzle.rows} />
            <span className="control__value">{puzzle.rows}</span>
            <label htmlFor="columns">Spalten</label>
            <input id="columns" type="range" onChange={changeColumns} min="1" max="6" value={puzzle.columns} />
            <span className="control__value">{puzzle.columns}</span>
        </div>
    );
};

Controls.propTypes = {
    puzzle: PropTypes.shape(PUZZLE).isRequired,
    updatePuzzle: PropTypes.func.isRequired,
    setSource: PropTypes.func.isRequired,
};

export default Controls;

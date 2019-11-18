import React from 'react';
import PropTypes from 'prop-types';

import irma from 'app/images/IMG_0356.jpeg';
import koali from 'app/images/DSC00577.jpeg';
import koali2 from 'app/images/DSC00578.jpeg';
import koali3 from 'app/images/DSC00572.jpeg';
import koali4 from 'app/images/DSC00563.jpeg';
import pferd from 'app/images/DSC00579.jpeg';

const Controls = ({ rows, columns, setRows, setColumns, setSource }) => {
    const changeImage = ({ target }) => {
        const { value } = target;
        setSource(value);
    };
    const changeRows = ({ target }) => {
        const value = parseInt(target.value, 10);
        setRows(value);
        document.documentElement.style.setProperty('--puzzle-rows', value);
    };
    const changeColumns = ({ target }) => {
        const value = parseInt(target.value, 10);
        setColumns(value);
        document.documentElement.style.setProperty('--puzzle-columns', value);
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
                <button name="format" value="landscape" type="button" className="control__button control__button--landscape">Hochformat</button>
                <button name="format" value="square" type="button" className="control__button control__button--square">Quadrat</button>
                <button name="format" value="portrait" type="button" className="control__button control__button--portrait">Porträt</button>
            </div>
            <label htmlFor="rows">Reihen</label>
            <input id="rows" type="range" onChange={changeRows} min="1" max="6" value={rows} />
            <span className="control__value">{rows}</span>
            <label htmlFor="columns">Spalten</label>
            <input id="columns" type="range" onChange={changeColumns} min="1" max="6" value={columns} />
            <span className="control__value">{columns}</span>
        </div>
    );
};

Controls.propTypes = {
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    setRows: PropTypes.func.isRequired,
    setColumns: PropTypes.func.isRequired,
    setSource: PropTypes.func.isRequired,
};

export default Controls;

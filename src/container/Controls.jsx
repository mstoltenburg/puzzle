import React, { memo, useRef, useEffect } from 'react';
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

const Controls = ({ rows, columns, solved, updatePuzzle, setSource }) => {
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

    useEffect(() => {
        if (solved) {
            setTimeout(() => {
                const element = selector.current;
                const { selectedIndex, length } = element;
                element.selectedIndex = (selectedIndex + 1) % length;
                element.dispatchEvent(new Event('change', { bubbles: true }));
            }, 3000);
        }
    }, [solved]);

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
    solved: PropTypes.bool.isRequired,
    updatePuzzle: PropTypes.func.isRequired,
    setSource: PropTypes.func.isRequired,
};

export default memo(Controls);

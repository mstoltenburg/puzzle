import React, { useReducer, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Piece } from 'app/components/puzzle';
import { getSelection, swapSelection, getImage } from 'app/utilities';
import { PUZZLE } from 'app/shapes';


const initialState = {
    active: undefined,
    list: [],
};

function reducer(state, action) {
    switch (action.type) {
        case 'toggle': {
            const { active, list } = state;
            if (active !== undefined) {
                return {
                    active: undefined,
                    list: swapSelection(list, active, action.value),
                };
            }
            return {
                ...state,
                active: action.value,
            };
        }
        case 'init':
            return {
                active: undefined,
                list: getSelection(action.pieces),
            };
        default:
            throw new Error();
    }
}

const Puzzle = ({ puzzle }) => {
    const [pieces, updatePieces] = useReducer(reducer, initialState);
    const [dimensions, setDimensions] = useState({});
    const { image, rows, columns, format, ratio } = puzzle;
    const { naturalWidth, naturalHeight, src } = image || {};

    useEffect(() => {
        document.documentElement.style.setProperty('--puzzle-rows', rows);
    }, [rows]);

    useEffect(() => {
        document.documentElement.style.setProperty('--puzzle-columns', columns);
    }, [columns]);

    useEffect(() => {
        if (naturalWidth && naturalHeight) {
            setDimensions(getImage(naturalWidth, naturalHeight, ratio));
        }
    }, [naturalWidth, naturalHeight, ratio]);

    useEffect(() => {
        if (src) {
            updatePieces({ type: 'init', pieces: rows * columns });
        }
    }, [rows, columns, format, src]);

    return (
        <div className="puzzle__pieces">
            {pieces.list.map((value, index) => (
                <Piece
                    key={`p-${value}`}
                    piece={value}
                    active={value === pieces.active}
                    solved={value === index}
                    puzzle={puzzle}
                    dimensions={dimensions}
                    updatePieces={updatePieces}
                />
            ))}
        </div>
    );
};

Puzzle.propTypes = {
    puzzle: PropTypes.shape(PUZZLE).isRequired,
};

export default Puzzle;

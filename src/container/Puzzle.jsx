import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Piece } from 'app/components/puzzle';
import { getSelection, swapSelection } from 'app/utilities';
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
    const { image, rows, columns } = puzzle;

    useEffect(() => {
        document.documentElement.style.setProperty('--puzzle-rows', rows);
    }, [rows]);

    useEffect(() => {
        document.documentElement.style.setProperty('--puzzle-columns', columns);
    }, [columns]);

    useEffect(() => {
        if (image) {
            updatePieces({ type: 'init', pieces: rows * columns });
        }
    }, [rows, columns, image]);

    return (
        <div className="puzzle__pieces">
            {pieces.list.map((value, index) => (
                <Piece
                    key={`p-${value}`}
                    piece={value}
                    active={value === pieces.active}
                    solved={value === index}
                    puzzle={puzzle}
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

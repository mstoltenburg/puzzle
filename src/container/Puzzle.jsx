import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Piece } from 'app/components/puzzle';
import { getSelection, swapSelection } from 'app/utilities';
import { PUZZLE } from 'app/shapes';


const initialState = {
    active: undefined,
    selection: [],
};

function reducer(state, action) {
    switch (action.type) {
        case 'toggle': {
            const { active, selection } = state;
            if (active !== undefined) {
                return {
                    active: undefined,
                    selection: swapSelection(selection, active, action.value),
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
                selection: getSelection(action.pieces),
            };
        default:
            throw new Error();
    }
}

const Puzzle = ({ puzzle }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { image, rows, columns } = puzzle;

    useEffect(() => {
        if (image) {
            dispatch({ type: 'init', pieces: rows * columns });
        }
    }, [rows, columns, image]);

    return (
        <div className="puzzle__pieces">
            {state.selection.map((value, index) => (
                <Piece
                    key={`p-${value}`}
                    piece={value}
                    active={value === state.active}
                    solved={value === index}
                    puzzle={puzzle}
                    dispatch={dispatch}
                />
            ))}
        </div>
    );
};

Puzzle.propTypes = {
    puzzle: PropTypes.shape(PUZZLE).isRequired,
};

export default Puzzle;

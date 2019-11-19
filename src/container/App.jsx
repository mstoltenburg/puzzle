import React, { useReducer, useRef } from 'react';

import { Preview } from 'app/components/puzzle';
import { Puzzle, Controls } from 'app/container';

const initialState = {
    image: undefined,
    rows: 3,
    columns: 4,
    format: 'landscape',
    width: 720,
    height: 540,
    ratio: 720 / 540,
};

function reducer(state, action) {
    let format;
    window.console.debug(state, action);
    switch (action.type) {
        case 'image': {
            return {
                ...state,
                image: action.image,
            };
        }
        case 'rows': {
            return {
                ...state,
                rows: Number(action.rows),
            };
        }
        case 'columns': {
            return {
                ...state,
                columns: Number(action.columns),
            };
        }
        case 'format':
            switch (action.format) {
                case 'portrait':
                    format = {
                        format: action.format,
                        width: 540,
                        height: 720,
                        ratio: 540 / 720,
                        // rows: Math.max(state.rows, state.columns),
                        // columns: Math.min(state.rows, state.columns),
                    };
                    break;
                case 'square':
                    format = {
                        format: action.format,
                        width: 540,
                        height: 540,
                        ratio: 1,
                        // rows: Math.min(state.rows, state.columns),
                        // columns: Math.min(state.rows, state.columns),
                    };
                    break;
                default:
                    format = {
                        format: 'landscape',
                        width: 720,
                        height: 540,
                        ratio: 720 / 540,
                        // rows: Math.min(state.rows, state.columns),
                        // columns: Math.max(state.rows, state.columns),
                    };
            }
            return {
                ...state,
                ...format,
            };
        default:
            throw new Error();
    }
}

const App = () => {
    const [puzzle, updatePuzzle] = useReducer(reducer, initialState);
    const motif = useRef(null);

    const setSource = (src) => {
        if (motif.current) {
            motif.current.src = src;
        }
    };

    return (
        <main className="app">
            <Puzzle puzzle={puzzle} />
            <aside className="sidebar">
                <Preview
                    format={puzzle.format}
                    updatePuzzle={updatePuzzle}
                    ref={motif}
                />
                <Controls
                    rows={puzzle.rows}
                    columns={puzzle.columns}
                    updatePuzzle={updatePuzzle}
                    setSource={setSource}
                />
            </aside>
        </main>
    );
};

export default App;

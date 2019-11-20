import React, { useReducer, useRef, useCallback } from 'react';

import { Preview } from 'app/components/puzzle';
import { Puzzle, Controls } from 'app/container';
import { puzzleReducer, puzzleState } from 'app/reducers';

const App = () => {
    const [puzzle, updatePuzzle] = useReducer(puzzleReducer, puzzleState);
    const motif = useRef(null);
    const setSource = useCallback(
        (src) => { motif.current.src = src; },
        [],
    );

    return (
        <main className="app">
            <Puzzle puzzle={puzzle} />
            <aside className="sidebar">
                <Preview
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

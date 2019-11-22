import React, { useReducer, useState, useRef, useCallback } from 'react';

import { Camera } from 'app/components/controls';
import { Preview } from 'app/components/puzzle';
import { Puzzle, Controls } from 'app/container';
import { puzzleReducer, puzzleState } from 'app/reducers';

const App = () => {
    const [puzzle, updatePuzzle] = useReducer(puzzleReducer, puzzleState);
    const [solved, setSolved] = useState(false);
    const motif = useRef(null);
    const setSource = useCallback(
        (src) => { motif.current.src = src; },
        [],
    );

    return (
        <main className="app">
            <Puzzle puzzle={puzzle} setSolved={setSolved} />
            <aside className="sidebar">
                <Preview
                    updatePuzzle={updatePuzzle}
                    ref={motif}
                />
                <Camera
                    setSource={setSource}
                />
                <Controls
                    rows={puzzle.rows}
                    columns={puzzle.columns}
                    format={puzzle.format}
                    solved={solved}
                    updatePuzzle={updatePuzzle}
                    setSource={setSource}
                />
            </aside>
        </main>
    );
};

export default App;

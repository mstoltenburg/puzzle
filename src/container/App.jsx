import React, { useReducer, useState } from 'react';

import { Puzzle, Sidebar } from 'app/container';
import { puzzleReducer, puzzleState } from 'app/reducers';

const App = () => {
    const [puzzle, updatePuzzle] = useReducer(puzzleReducer, puzzleState);
    const [solved, setSolved] = useState(false);

    return (
        <main className="app">
            <Puzzle puzzle={puzzle} setSolved={setSolved} />
            <Sidebar puzzle={puzzle} solved={solved} updatePuzzle={updatePuzzle} />
        </main>
    );
};

export default App;

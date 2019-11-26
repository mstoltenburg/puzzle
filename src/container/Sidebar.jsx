import React, { useRef, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Camera, Preview } from 'app/components/controls';
import { Controls } from 'app/container';
import { sourcesReducer, sourcesState } from 'app/reducers';
import { PUZZLE } from 'app/shapes';

const Sidebar = ({ puzzle, solved, updatePuzzle }) => {
    const motif = useRef(null);
    const [sources, updateSources] = useReducer(sourcesReducer, sourcesState);
    const setSource = useCallback(
        (src) => { motif.current.src = src; },
        [],
    );

    return (
        <aside className="sidebar">
            <Preview
                updatePuzzle={updatePuzzle}
                ref={motif}
            />
            <Camera
                setSource={setSource}
                updateSources={updateSources}
            />
            <Controls
                puzzle={puzzle}
                sources={sources}
                solved={solved}
                setSource={setSource}
                updatePuzzle={updatePuzzle}
                updateSources={updateSources}
            />
        </aside>
    );
};

Sidebar.propTypes = {
    puzzle: PropTypes.shape(PUZZLE).isRequired,
    solved: PropTypes.bool.isRequired,
    updatePuzzle: PropTypes.func.isRequired,
};

export default Sidebar;

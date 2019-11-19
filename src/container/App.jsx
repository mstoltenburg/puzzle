import React, { useReducer, useState, useEffect } from 'react';

import { Preview } from 'app/components/puzzle';
import { Puzzle, Controls } from 'app/container';
import { getImage } from 'app/utilities';
import imageSrc from 'app/images/IMG_0356.jpeg';

const initialState = {
    rows: 3,
    columns: 3,
    format: 'landscape',
    width: 720,
    height: 540,
    ratio: 720 / 540,
};

function reducer(state, action) {
    let format;
    switch (action.type) {
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
                    };
                    break;
                case 'square':
                    format = {
                        format: action.format,
                        width: 540,
                        height: 720,
                        ratio: 540 / 720,
                    };
                    break;
                default:
                    format = {
                        format: 'landscape',
                        width: 720,
                        height: 540,
                        ratio: 720 / 540,
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
    const [image, setImage] = useState(undefined);

    useEffect(() => {
        const img = new Image();
        img.addEventListener('load', () => {
            setImage(getImage(img));
        }, false);
        img.src = imageSrc;
    }, []);

    const setSource = (src) => {
        if (image) {
            image.img.src = src;
        }
    };

    return (
        <main className="app">
            <Puzzle rows={puzzle.rows} columns={puzzle.columns} image={image} />
            <aside>
                <Preview image={image} />
                <Controls
                    puzzle={puzzle}
                    updatePuzzle={updatePuzzle}
                    setSource={setSource}
                />
            </aside>
        </main>
    );
};

export default App;

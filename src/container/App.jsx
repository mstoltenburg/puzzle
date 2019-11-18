import React, { useState, useEffect } from 'react';

import { Preview } from 'app/components/puzzle';
import { Puzzle, Controls } from 'app/container';
import { getImage } from 'app/utilities';
import imageSrc from 'app/images/IMG_0356.jpeg';

const App = () => {
    const [rows, setRows] = useState(3);
    const [columns, setColumns] = useState(3);
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
            <Puzzle rows={rows} columns={columns} image={image} />
            <aside>
                <Preview image={image} />
                <Controls
                    rows={rows}
                    columns={columns}
                    setRows={setRows}
                    setColumns={setColumns}
                    setSource={setSource}
                />
            </aside>
        </main>
    );
};

export default App;

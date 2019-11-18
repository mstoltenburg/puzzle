import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Piece } from 'app/components/puzzle';
import { getSelection, swapSelection } from 'app/utilities';
import { IMAGE } from 'app/shapes';

const Puzzle = ({ rows, columns, image }) => {
    const [active, setActive] = useState(undefined);
    const [selection, setSelection] = useState([]);
    const togglePiece = (event) => {
        const value = parseInt(event.currentTarget.value, 10);

        if (active !== undefined) {
            setSelection(swapSelection(selection, active, value));
            setActive(undefined);
        } else {
            setActive(value);
        }
    };

    useEffect(() => {
        if (image) {
            setSelection(getSelection(rows * columns));
        }
    }, [rows, columns, image]);

    return (
        <div className="puzzle__pieces">
            {selection.map((value, index) => (
                <Piece
                    key={`p-${value}`}
                    piece={value}
                    active={value === active}
                    solved={value === index}
                    rows={rows}
                    columns={columns}
                    image={image}
                    togglePiece={togglePiece}
                />
            ))}
        </div>
    );
};

Puzzle.propTypes = {
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    image: PropTypes.shape(IMAGE),
};

Puzzle.defaultProps = {
    image: undefined,
};

export default Puzzle;

import React, { useReducer, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Piece } from 'app/components/puzzle';
import { piecesReducer, piecesState } from 'app/reducers';
import { getImage } from 'app/utilities';
import { PUZZLE } from 'app/shapes';
import { PUZZLE_FORMATS } from 'app/config';

const { style } = document.documentElement;

const Puzzle = ({ puzzle, setSolved }) => {
    const [pieces, updatePieces] = useReducer(piecesReducer, piecesState);
    const [dimensions, setDimensions] = useState({});
    const { image, rows, columns, format, ratio } = puzzle;
    const { naturalWidth, naturalHeight, src } = image || {};

    useEffect(() => {
        style.setProperty('--puzzle-rows', rows);
    }, [rows]);

    useEffect(() => {
        style.setProperty('--puzzle-columns', columns);
    }, [columns]);

    useEffect(() => {
        style.setProperty('--preview-height', `${PUZZLE_FORMATS[format]}%`);
    }, [format]);

    useEffect(() => {
        setSolved(pieces.ordered);
    }, [pieces.ordered, setSolved]);

    useEffect(() => {
        if (naturalWidth && naturalHeight) {
            setDimensions(getImage(naturalWidth, naturalHeight, ratio));
        }
    }, [naturalWidth, naturalHeight, ratio]);

    useEffect(() => {
        if (src) {
            updatePieces({ type: 'init', pieces: rows * columns });
        }
    }, [rows, columns, format, src]);

    const buster = Number(rows * columns * ratio).toFixed(2);
    // const buster = 1;

    return (
        <div className="puzzle__pieces">
            {pieces.list.map((value, index) => (
                <Piece
                    key={`p-${value}-${buster}`}
                    piece={value}
                    active={value === pieces.active}
                    solved={value === index}
                    puzzle={puzzle}
                    dimensions={dimensions}
                    updatePieces={updatePieces}
                />
            ))}
        </div>
    );
};

Puzzle.propTypes = {
    puzzle: PropTypes.shape(PUZZLE).isRequired,
    setSolved: PropTypes.func.isRequired,
};

export default Puzzle;

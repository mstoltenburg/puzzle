import React, { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getImage } from 'app/utilities';
import { PUZZLE } from 'app/shapes';

const Piece = ({ piece, active, solved, puzzle, dispatch }) => {
    const canvas = useRef(null);
    const pieceWidth = Math.round(puzzle.width / puzzle.columns);
    const pieceHeight = Math.round(puzzle.height / puzzle.rows);
    const style = classNames('puzzle__piece', {
        'puzzle__piece--active': active,
        'puzzle__piece--solved': solved,
    });
    const togglePiece = ({ currentTarget }) => {
        dispatch({ type: 'toggle', value: Number(currentTarget.value) });
    };

    useEffect(() => {
        const { image, rows, columns, ratio } = puzzle;
        if (image) {
            let { width, height, offsetX, offsetY } = getImage(image, ratio);

            width = Math.round(width / columns);
            height = Math.round(height / rows);

            offsetX += width * (piece % columns);
            offsetY += height * Math.floor(piece / columns);

            const ctx = canvas.current.getContext('2d', { alpha: false });
            ctx.drawImage(
                image, offsetX, offsetY, width, height,
                0, 0, pieceWidth, pieceHeight,
            );
        }
    }, [puzzle, piece, pieceWidth, pieceHeight]);

    return (
        <button type="button" className={style} value={piece} onClick={togglePiece} disabled={solved || active}>
            <canvas width={pieceWidth} height={pieceHeight} className="puzzle__canvas" ref={canvas} />
            <span className="puzzle__border" />
        </button>
    );
};

Piece.propTypes = {
    piece: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    puzzle: PropTypes.shape(PUZZLE).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default memo(Piece);

import React, { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'app/config';
import { IMAGE } from 'app/shapes';

const Piece = ({
    image, piece, active, solved, rows, columns, dispatch,
}) => {
    const canvas = useRef(null);
    const pieceWidth = Math.round(CANVAS_WIDTH / columns);
    const pieceHeight = Math.round(CANVAS_HEIGHT / rows);
    const style = classNames('puzzle__piece', {
        'puzzle__piece--active': active,
        'puzzle__piece--solved': solved,
    });
    const togglePiece = ({ currentTarget }) => {
        dispatch({ type: 'toggle', value: Number(currentTarget.value) });
    };

    useEffect(() => {
        if (image) {
            let { width, height, offsetX, offsetY } = image;

            width = Math.round(width / columns);
            height = Math.round(height / rows);

            offsetX += width * (piece % columns);
            offsetY += height * Math.floor(piece / columns);

            const ctx = canvas.current.getContext('2d', { alpha: false });
            ctx.drawImage(
                image.img, offsetX, offsetY, width, height,
                0, 0, pieceWidth, pieceHeight,
            );
        }
    }, [image, rows, columns, piece, pieceWidth, pieceHeight]);

    return (
        <button type="button" className={style} value={piece} onClick={togglePiece} disabled={solved || active}>
            <canvas width={pieceWidth} height={pieceHeight} className="puzzle__canvas" ref={canvas} />
            <span className="puzzle__border" />
        </button>
    );
};

Piece.propTypes = {
    image: PropTypes.shape(IMAGE),
    piece: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
};

Piece.defaultProps = {
    image: undefined,
};

export default memo(Piece);

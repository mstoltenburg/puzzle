import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'app/config';

function valueEqualsIndex(value, index) {
    return value === index;
}

// see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export function shuffle(original) {
    const array = [];
    const { length } = original;

    if (length < 2) {
        return original;
    }

    for (let i = 0; i < length; i += 1) {
        // random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        // swap elements array[i] and array[j]
        if (i !== j) {
            array[i] = array[j];
        }
        array[j] = original[i];
    }

    while (array.some(valueEqualsIndex)) {
        array.forEach((value, i) => {
            if (value === i) {
                const j = Math.floor(Math.random() * length);
                // swap elements array[i] and array[j]
                if (i !== j) {
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
        });
    }

    return array;
}

export function getSelection(length) {
    const pieces = [];

    for (let i = 0; i < length; i += 1) {
        pieces.push(i);
    }

    return shuffle(pieces);
}

export function swapSelection(selection, origin, target) {
    const array = [...selection];
    const king = array.indexOf(origin);
    const rook = array.indexOf(target);
    [array[king], array[rook]] = [array[rook], array[king]];
    return array;
}

export function getImage(img) {
    const { width, height } = img;
    const imageRatio = width / height;
    const canvasRatio = CANVAS_WIDTH / CANVAS_HEIGHT;

    let sx = 0;
    let sy = 0;
    let sWidth = width;
    let sHeight = height;

    if (imageRatio > canvasRatio) {
        sWidth = height * canvasRatio;
        sx = Math.round((width - sWidth) / 2);
    } else if (canvasRatio > imageRatio) {
        sHeight = width / canvasRatio;
        sy = Math.round((height - sHeight) / 2);
    }

    return {
        img,
        offsetX: sx,
        offsetY: sy,
        width: sWidth,
        height: sHeight,
    };
}

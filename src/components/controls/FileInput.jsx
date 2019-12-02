import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { puzzleState } from 'app/reducers';

const FileInput = ({ setSource, updateSources }) => {
    const canvas = useRef(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(false);

    const handleFiles = ({ target }) => {
        const file = target.files[0];
        const name = file.name.substring(0, file.name.lastIndexOf('.'));
        const maxSize = puzzleState.width;
        const imageType = /^image\//;
        const { limit } = target.dataset;

        if (!imageType.test(file.type)) {
            setError(`Die Datei „${file.name}“ hat kein Bildformat.`);
            return;
        } if (limit && file.size > limit * 1000 * 1000) {
            const size = Math.round(file.size / 1000 / 100) / 10;
            const mega = size.toString().replace('.', ',');
            setError(`Das Bild „${file.name}“ ist zu groß (${mega} MB).
                Bilder dürfen maximal ${limit} MB groß sein.`);
            return;
        }

        const callback = (srcOrientation) => {
            const reader2 = new FileReader();
            reader2.onprogress = ({ loaded, total }) => {
                setProgress(50 + ((total / loaded) * 50));
            };
            reader2.onload = (e) => {
                const srcBase64 = e.target.result;
                const img = new Image();

                img.onload = () => {
                    const { width, height } = img;
                    let canvasWidth = width;
                    let canvasHeight = height;
                    // const canvas = document.createElement('canvas');
                    const ctx = canvas.current.getContext('2d');

                    if (width <= height && width > maxSize) {
                        canvasWidth = maxSize;
                        canvasHeight = height * (maxSize / width);
                    } else if (height <= width && height > maxSize) {
                        canvasWidth = width * (maxSize / height);
                        canvasHeight = maxSize;
                    }

                    // set proper canvas dimensions before transform & export
                    if (srcOrientation > 4 && srcOrientation < 9) {
                        canvas.current.width = canvasHeight;
                        canvas.current.height = canvasWidth;
                    } else {
                        canvas.current.width = canvasWidth;
                        canvas.current.height = canvasHeight;
                    }

                    // transform context before drawing image
                    switch (srcOrientation) {
                        case 2: ctx.transform(-1, 0, 0, 1, canvasWidth, 0); break;
                        case 3: ctx.transform(-1, 0, 0, -1, canvasWidth, canvasHeight); break;
                        case 4: ctx.transform(1, 0, 0, -1, 0, canvasHeight); break;
                        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
                        case 6: ctx.transform(0, 1, -1, 0, canvasHeight, 0); break;
                        case 7: ctx.transform(0, -1, -1, 0, canvasHeight, canvasWidth); break;
                        case 8: ctx.transform(0, -1, 1, 0, 0, canvasWidth); break;
                        default: break;
                    }

                    // draw image
                    ctx.drawImage(
                        img, 0, 0, width, height, 0, 0, canvasWidth, canvasHeight,
                    );

                    // export base64
                    const result = canvas.current.toDataURL();
                    setSource(result);
                    updateSources({ type: 'add', name, image: result });
                    setProgress(0);
                };

                img.src = srcBase64;
            };

            reader2.readAsDataURL(file);
        };

        const reader = new FileReader();
        // reader.onloadstart = () => {
        //     setProgress(0);
        // };
        reader.onprogress = ({ loaded, total }) => {
            setProgress((total / loaded) * 50);
        };
        reader.onload = (e) => {
            const view = new DataView(e.target.result);
            if (view.getUint16(0, false) !== 0xFFD8) {
                return callback(-2);
            }
            const length = view.byteLength;
            let offset = 2;
            while (offset < length) {
                if (view.getUint16(offset + 2, false) <= 8) return callback(-1);
                const marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xFFE1) {
                    offset += 2;
                    if (view.getUint32(offset, false) !== 0x45786966) {
                        return callback(-1);
                    }

                    const little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    const tags = view.getUint16(offset, little);
                    offset += 2;
                    for (let i = 0; i < tags; i += 1) {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                        }
                    }
                // eslint-disable-next-line no-bitwise
                } else if ((marker & 0xFF00) !== 0xFF00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <label htmlFor="file" className="control--file">
            <div className="preview__error" hidden={!error}>
                {error && error}
            </div>
            {progress ? (
                <meter
                    className="file__meter"
                    min="0"
                    max="100"
                    low="33"
                    high="66"
                    optimum="100"
                    value={Number(progress)}
                />
            ) : (
                'Datei wählen…'
            )}
            <input type="file" id="file" accept="image/*" onChange={handleFiles} data-limit="0.5" />
            <canvas className="file__canvas" ref={canvas} hidden />
        </label>
    );
};

FileInput.propTypes = {
    setSource: PropTypes.func.isRequired,
    updateSources: PropTypes.func.isRequired,
};

export default FileInput;

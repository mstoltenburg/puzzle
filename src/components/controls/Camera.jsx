import React, { memo, useRef, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import { cameraReducer, cameraState } from 'app/reducers';
import { play } from 'app/utilities';

const cameraWidth = 640;
const cameraHeight = (cameraWidth / 4) * 3;
// Not adding `{ audio: true }` since we only want video now
const constraints = { video: { width: cameraWidth, height: cameraHeight } };

const Camera = ({ setSource, updateSources }) => {
    const video = useRef(null);
    const canvas = useRef(null);
    const [camera, updateCamera] = useReducer(cameraReducer, cameraState);
    const { filming, hidden, error } = camera;
    const toggle = () => updateCamera({ type: 'toggle' });
    const takeSnapshot = () => {
        play('shutter');
        const context = canvas.current.getContext('2d', { alpha: false });
        context.drawImage(video.current, 0, 0, cameraWidth, cameraHeight);
        const image = canvas.current.toDataURL('image/png');
        const name = `Foto ${new Date().toLocaleString('de-DE')}`;
        setSource(image);
        updateSources({ type: 'add', name, image });
        updateCamera({ type: 'reset' });
    };

    useEffect(() => {
        if (video.current) {
            if (filming) {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia(constraints)
                        .then((stream) => {
                            updateCamera({ type: 'show' });
                            video.current.srcObject = stream;
                            video.current.onloadedmetadata = () => {
                                video.current.play();
                            };
                        })
                        .catch((e) => updateCamera({ type: 'error', error: e }));
                }
            } else if (video.current.srcObject) {
                updateCamera({ type: 'hide' });
                video.current.srcObject.getTracks().forEach(
                    (track) => { track.stop(); },
                );
                video.current.srcObject = null;
            }
        }
    }, [filming, video]);

    return (
        <div className="preview">
            <div className="preview__canvas preview__canvas--camera" hidden={hidden} onClick={takeSnapshot} role="button" tabIndex={-1}>
                <canvas className="preview__image" ref={canvas} width={cameraWidth} height={cameraHeight} hidden />
                <video className="preview__image" ref={video} width={cameraWidth} height={cameraHeight} autoPlay />
            </div>
            <div className="preview__error" hidden={!error}>
                <h3>{error && error.name}</h3>
                {error && error.message}
            </div>
            <label className="preview__label" htmlFor="camera">
                <input className="preview__control" id="camera" type="checkbox" checked={!hidden} onChange={toggle} />
                <span className="preview__icon preview__icon--camera" />
                Kamera benutzen
            </label>
        </div>
    );
};

Camera.propTypes = {
    setSource: PropTypes.func.isRequired,
    updateSources: PropTypes.func.isRequired,
};

export default memo(Camera);

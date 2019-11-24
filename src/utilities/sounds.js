import shutter from 'app/sounds/camera-shutter-click-01.mp3';
import click from 'app/sounds/Woosh-Mark_DiAngelo-4778593.mp3';
import success from 'app/sounds/Water-Drop-Low-SoundBible.com-1501529809.mp3';
// import success from 'app/sounds/Bibi-Blocksberg.mp3';
// import success from 'app/sounds/button-20.mp3';
import achivement from 'app/sounds/magic-chime-01.mp3';

const context = new window.AudioContext();
const files = { shutter, click, success, achivement };
const audioData = {};

Object.entries(files).forEach(([name, url]) => {
    fetch(url)
        .then((r) => r.arrayBuffer()) // request as ArrayBuffer
        .then((buffer) => context.decodeAudioData(buffer))
        .then((decodedData) => { audioData[name] = decodedData; });
});

export default (name, when, offset) => {
    const ctx = new window.AudioContext();
    const source = ctx.createBufferSource();
    source.buffer = audioData[name];
    source.connect(ctx.destination);
    source.start(when, offset);
};

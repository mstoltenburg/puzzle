import React from 'react';
import PropTypes from 'prop-types';

const FileInput = ({ setSource, updateSources }) => {
    const handleFiles = ({ target }) => {
        for (let i = 0; i < target.files.length; i += 1) {
            const file = target.files[i];
            const imageType = /^image\//;
            const { limit } = target.dataset;
            let error;

            if (!imageType.test(file.type)) {
                error = `Die Datei „${file.name}“ hat kein Bildformat.`;
            } else if (limit && file.size > limit * 1000 * 1000) {
                const size = Math.round(file.size / 1000 / 100) / 10;
                const mega = size.toString().replace('.', ',');
                error = `Das Bild „${file.name}“ ist zu groß (${mega} MB).<br>
                         Profilbilder dürfen maximal ${limit} MB groß sein.`;
                // target.value = null;
            }

            // showError(target, error);

            if (!error) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const { result } = event.target;
                    const name = file.name.substring(0, file.name.lastIndexOf('.'));
                    setSource(result);
                    updateSources({ type: 'add', name, image: result });
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <input type="file" id="file" accept="image/*" onChange={handleFiles} data-limit="10" />
    );
};

FileInput.propTypes = {
    setSource: PropTypes.func.isRequired,
    updateSources: PropTypes.func.isRequired,
};

export default FileInput;

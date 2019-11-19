import PropTypes from 'prop-types';

export default {
    image: PropTypes.img,
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    format: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
};

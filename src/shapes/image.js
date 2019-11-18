import PropTypes from 'prop-types';

export default {
    image: PropTypes.shape(),
    offsetX: PropTypes.number.isRequired,
    offsetY: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

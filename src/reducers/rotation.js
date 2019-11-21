export const initialState = {
    rotate: true,
    delay: 3,
};

export default (state, action) => {
    switch (action.type) {
        case 'rotation': {
            return {
                rotate: action.rotate,
                delay: state.delay,
            };
        }
        case 'delay': {
            return {
                rotate: state.rotate,
                delay: action.delay,
            };
        }
        default:
            throw new Error();
    }
};

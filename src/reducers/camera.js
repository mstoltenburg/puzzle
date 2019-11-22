export const initialState = {
    filming: false,
    hidden: true,
    error: false,
};

export default (state, action) => {
    switch (action.type) {
        case 'toggle':
            return state.error ? initialState : {
                ...state,
                filming: !state.filming,
            };
        case 'hide':
            return {
                ...state,
                hidden: true,
            };
        case 'show':
            return {
                ...state,
                hidden: false,
            };
        case 'reset':
            return initialState;
        case 'error':
            return {
                ...state,
                error: action.error,
            };
        default:
            throw new Error();
    }
};

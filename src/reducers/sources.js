import { SOURCES } from 'app/config';

export const initialState = SOURCES;

export default (state, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                [action.name]: action.image,
            };
        default:
            throw new Error();
    }
};

import { getSelection, swapSelection } from 'app/utilities';

export const initialState = {
    active: undefined,
    list: [],
};

export default (state, action) => {
    switch (action.type) {
        case 'toggle': {
            const { active, list } = state;
            if (active !== undefined) {
                return {
                    active: undefined,
                    list: swapSelection(list, active, action.value),
                };
            }
            return {
                ...state,
                active: action.value,
            };
        }
        case 'init':
            return {
                active: undefined,
                list: getSelection(action.pieces),
            };
        default:
            throw new Error();
    }
};

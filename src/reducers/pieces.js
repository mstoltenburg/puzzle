import { getSelection, swapSelection, play } from 'app/utilities';

export const initialState = {
    active: undefined,
    ordered: false,
    list: [],
};

export default (state, action) => {
    switch (action.type) {
        case 'toggle': {
            const { active } = state;
            if (active !== undefined) {
                const list = swapSelection(state.list, active, action.value);
                const ordered = !list.some((value, index) => value !== index);
                if (ordered) {
                    play('achivement');
                } else if (active === list.indexOf(active)) {
                    play('success');
                } else {
                    play('click');
                }
                return {
                    active: undefined,
                    ordered,
                    list,
                };
            }
            play('click');
            return {
                ...state,
                active: action.value,
            };
        }
        case 'init':
            return {
                active: undefined,
                ordered: false,
                list: getSelection(action.pieces),
            };
        default:
            throw new Error();
    }
};

export const initialState = {
    image: undefined,
    rows: 3,
    columns: 4,
    format: 'landscape',
    width: 720,
    height: 540,
    ratio: 720 / 540,
};

export default (state, action) => {
    let format;
    switch (action.type) {
        case 'image': {
            return {
                ...state,
                image: action.image,
            };
        }
        case 'rows': {
            return {
                ...state,
                rows: Number(action.rows),
            };
        }
        case 'columns': {
            return {
                ...state,
                columns: Number(action.columns),
            };
        }
        case 'format':
            switch (action.format) {
                case 'portrait':
                    format = {
                        format: action.format,
                        width: 540,
                        height: 720,
                        ratio: 540 / 720,
                    };
                    if (state.format === 'landscape') {
                        format.rows = state.columns;
                        format.columns = state.rows;
                    }
                    break;
                case 'square':
                    format = {
                        format: action.format,
                        width: 540,
                        height: 540,
                        ratio: 1,
                    };
                    break;
                default:
                    format = {
                        format: 'landscape',
                        width: 720,
                        height: 540,
                        ratio: 720 / 540,
                    };
                    if (state.format === 'portrait') {
                        format.rows = state.columns;
                        format.columns = state.rows;
                    }
            }
            return {
                ...state,
                ...format,
            };
        default:
            throw new Error();
    }
};

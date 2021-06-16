// eslint-disable-next-line
export default {
  user: (state = null, { type, payload }) => {
    switch (type) {
    case 'user/login':
      return {
        ...state,
        ...payload
      };
    case 'user/logout':
      return null;
    case 'user/set': {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
    }
  }
};

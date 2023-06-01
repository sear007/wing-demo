import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT, 
} from './../actions/actionType';

const exUser = localStorage.getItem('user');
const initialState = {
  user: exUser ? JSON.stringify(exUser) : null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
          return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            console.log({ payload: action.payload })
          return { ...state, user: action.payload, loading: false };
        case LOGIN_FAILURE:
          return { ...state, error: action.payload, loading: false };
        case LOGOUT:
            return { ...state, user: null };
        default:
          return state;
      }
}
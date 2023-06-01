import {
    REQUEST_ADD_STUDENT,
    REQUEST_FAILURE,
    REQUEST_STUDENT,
    REQUEST_STUDENTS,
    REQUEST_UPDATE_STUDENT,
    SHOW_NOTIFICATION,
    STUDENTS_SUCCESS,
    STUDENT_SUCCESS,
} from '../acitons/actionTypes';

const initialState = {
    students: [],
    student: null,
    loading: false,
    error: null,
    notification: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case STUDENTS_SUCCESS:
            return { ...state, students: action.payload, loading: false };
        case REQUEST_STUDENTS:
            return { ...state, student: action.payload,loading: true, error: null, notification: null };
        case STUDENT_SUCCESS:
            return { ...state, student: action.payload, loading: false, error: null };
        case REQUEST_STUDENT:
            return { ...state, loading: true, error: null, notification: null };
        case REQUEST_ADD_STUDENT:
            return { ...state, notification: null, error: null, loading: true };
        case REQUEST_UPDATE_STUDENT:
            return { ...state, notification: null, error: null, loading: true };
        case SHOW_NOTIFICATION:
            return { ...state, notification: action.payload, loading: false, };
        case REQUEST_FAILURE:
            return { ...state, error: action.payload, loading: false };
        default: return state;
    }
}
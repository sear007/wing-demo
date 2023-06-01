import { 
    REQUEST_ADD_STUDENT,
    REQUEST_DELETE_STUDENT,
    REQUEST_FAILURE,
    REQUEST_SEARCH_STUDENTS,
    REQUEST_STUDENT,
    REQUEST_STUDENTS,
    REQUEST_UPDATE_STUDENT,
    SHOW_NOTIFICATION,
    STUDENTS_SUCCESS,
} from "./actionTypes";

export const studentsSuccess = (payload) => ({
    type: STUDENTS_SUCCESS,
    payload,
});

export const requestStudents = () => ({
    type: REQUEST_STUDENTS,
});

export const requestStudent = (payload) => ({
    type: REQUEST_STUDENT,
    payload,
});

export const requestUpdateStudent = (payload) => ({
    type: REQUEST_UPDATE_STUDENT,
    payload,
});

export const requestDeleteStudent = (payload) => ({
    type: REQUEST_DELETE_STUDENT,
    payload,
});

export const requestAddStudent = (payload) => ({
    type: REQUEST_ADD_STUDENT,
    payload,
});

export const requestSearchStudents = (payload) => ({
    payload,
    type: REQUEST_SEARCH_STUDENTS,
});

export const requestFailure = (payload) => ({
    type: REQUEST_FAILURE,
    payload,
});

export const showNotification = (message) => ({
    type: SHOW_NOTIFICATION,
    payload: message,
});
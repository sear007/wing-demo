import { 
  put, 
  takeEvery, 
  call, 
  takeLeading, 
} from "redux-saga/effects";
import { 
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  REQUEST_ADD_STUDENT,
  REQUEST_DELETE_STUDENT,
  REQUEST_FAILURE,
  REQUEST_SEARCH_STUDENTS,
  REQUEST_STUDENT,
  REQUEST_STUDENTS,
  REQUEST_UPDATE_STUDENT,
  STUDENTS_SUCCESS,
  STUDENT_SUCCESS,
} from "../acitons/actionTypes";
import { showNotification } from "../acitons";
import { db } from "../../../config/firebaseConfig";

const table = 'students';

function* requestStudentsSaga() {
  try {
    const studentsCollectionRef = collection(db, table);
    const querySnapshot = yield call(getDocs, studentsCollectionRef);
    const studentData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    yield put({ type: STUDENTS_SUCCESS, payload: studentData });
  } catch (error) {
    yield put({ type: REQUEST_FAILURE, payload: error.message });
  }
}

function* requestSearchStudentsSaga({ payload }) {
  try {
    const studentsRef = db.collection(table);
    const querySnapshot = yield call(() =>
      studentsRef
        .where('name', '>=', payload)
        .where('name', '<=', payload + '\uf8ff')
        .limit(5)
        .get()
    );
    const studentData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    yield put({ type: STUDENTS_SUCCESS, payload: studentData });
  } catch (error) {
    yield put({ type: REQUEST_FAILURE, payload: error.message });
  }
}

function* requestStudentSaga({ payload }){
    try {
      const studentId = payload;
      const studentDocRef = doc(db, table, studentId);
      const studentSnapshot = yield call(getDoc, studentDocRef);
      if (studentSnapshot.exists()) {
        const studentData = studentSnapshot.data();
        yield put({ type: STUDENT_SUCCESS, payload: studentData });
      } else {
        yield put({ type: REQUEST_FAILURE, payload: "Student not found" });
      }
    } catch (error) {
      yield put({ type: REQUEST_FAILURE, payload: error.message });
    }
}

function* requestUpdateStudentSaga({ payload }){
  try {
    const { id, name, age, schoolName, joined_at } = payload;
    const studentRef = doc(db, table, id);
    yield call(updateDoc, studentRef, { name, age, schoolName, joined_at });
    yield put(showNotification(`Student ${name} was updated successfully`));
    yield put({ type: STUDENT_SUCCESS, payload: payload });
  } catch (error) {
    yield put({ type: REQUEST_FAILURE, payload: error.message });
  }
}

function* requestDeleteStudentSaga({ payload }){
  try {
    const confirmed = window.confirm('Are you sure you want to perform this action?');
    if(confirmed){
      const studentRef = doc(db, table, payload);
      yield call(deleteDoc, studentRef);
      yield put(showNotification(`Student ${payload} was deleted successfully`));
    }
  } catch (error) {
    yield put({ type: REQUEST_FAILURE, payload: error.message });
  }
}

function* requestAddStudentSaga({ type, payload }) {
  try {
    const studentsCollectionRef = collection(db, table);
    const docRef = yield call(addDoc, studentsCollectionRef, payload);
    const addedStudentDoc = yield call(getDoc, docRef);
    const addedStudent = { id: docRef.id, ...addedStudentDoc.data() };
    yield put(showNotification(`Student ${addedStudent.name} added successfully`));
  } catch (error) {
    yield put({ type: REQUEST_FAILURE, payload: error.message });
  }
}

export default function* studentsRootSaga() {
  yield takeLeading(REQUEST_STUDENTS, requestStudentsSaga);
  yield takeEvery(REQUEST_ADD_STUDENT, requestAddStudentSaga);
  yield takeEvery(REQUEST_STUDENT, requestStudentSaga);
  yield takeEvery(REQUEST_UPDATE_STUDENT, requestUpdateStudentSaga);
  yield takeEvery(REQUEST_DELETE_STUDENT, requestDeleteStudentSaga);
  yield takeEvery(REQUEST_SEARCH_STUDENTS, requestSearchStudentsSaga);
}

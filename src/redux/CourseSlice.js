import { createSlice } from '@reduxjs/toolkit';
import { db, collection, doc, getDoc, getDocs } from '../firebaseConfig';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    selectedCourse: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCourses: (state, action) => {
      // Convert Firestore references to plain objects
      state.courses = action.payload.map(course => ({
        ...course,
        thumbnail: course.thumbnail?.path // Replace with a plain property if needed
      }));
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCourses, setSelectedCourse, setLoading, setError } = courseSlice.actions;

export const fetchCourses = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const coursesCollection = collection(db, 'courses');
    const coursesSnapshot = await getDocs(coursesCollection);
    const courses = coursesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      thumbnail: doc.data().thumbnail?.path // Convert or handle Firestore references
    }));
    dispatch(setCourses(courses));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCourseById = (courseId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const courseRef = doc(db, 'courses', courseId);
    const courseDoc = await getDoc(courseRef);
    if (courseDoc.exists()) {
      dispatch(setSelectedCourse({
        id: courseDoc.id,
        ...courseDoc.data(),
        thumbnail: courseDoc.data().thumbnail?.path // Convert or handle Firestore references
      }));
    } else {
      dispatch(setError('No such course found.'));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default courseSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { db, doc, updateDoc, arrayUnion, getDoc, setDoc } from '../firebaseConfig';
import { setSelectedCourse } from './CourseSlice'; 

const courseDetailsSlice = createSlice({
  name: 'student',
  initialState: {
    enrolledCourses: [],
    isEnrolled: false,
    error: null,
  },
  reducers: {
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
    setIsEnrolled: (state, action) => {
      state.isEnrolled = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateCourseProgress: (state, action) => {
        const { courseId, progress } = action.payload;
        const course = state.enrolledCourses.find((c) => c.id === courseId);
        if (course) {
          course.progress = progress;
        }
      },
  },
});

export const { setEnrolledCourses, setIsEnrolled, setError, updateCourseProgress } = courseDetailsSlice.actions;

export const enrollInCourse = (courseId, studentId) => async (dispatch) => {
  try {
    const courseRef = doc(db, 'courses', courseId);
    const studentRef = doc(db, 'students', studentId);
  
    const courseDoc = await getDoc(courseRef);
    if (!courseDoc.exists()) {
      dispatch(setError('No such course found.'));
      return;
    }
  
    const courseData = courseDoc.data();
    if (courseData.enrollmentStatus !== 'Open') {
      dispatch(setError('Course enrollment is not open.'));
      return;
    }
  
    if (courseData.students.includes(studentId)) {
      dispatch(setIsEnrolled(true));
      return;
    }
  
    await updateDoc(courseRef, {
      students: arrayUnion(studentId)
    });
  
    const studentDoc = await getDoc(studentRef);
    if (!studentDoc.exists()) {
      await setDoc(studentRef, {
        enrolledCourses: [courseId]
      });
    } else {
      await updateDoc(studentRef, {
        enrolledCourses: arrayUnion(courseId)
      });
    }
  
    dispatch(setIsEnrolled(true));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateLikes = (courseId) => async (dispatch, getState) => {
  const course = getState().course.selectedCourse;
  if (!course) return;
  
  const courseRef = doc(db, 'courses', courseId);
  try {
    await updateDoc(courseRef, {
      likes: course.likes + 1
    });
    dispatch(setSelectedCourse({ ...course, likes: course.likes + 1 }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default courseDetailsSlice.reducer;

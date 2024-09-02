import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, doc, getDoc, getDocs, collection, updateDoc } from '../firebaseConfig';

// Thunk to fetch enrolled courses for a student
// Thunk to fetch enrolled courses for a student
export const fetchStudentCourses = createAsyncThunk(
    'student/fetchStudentCourses',
    async (studentId, { rejectWithValue }) => {
      try {
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
        const courses = [];
        
        coursesSnapshot.forEach((doc) => {
          const courseData = doc.data();
          if (courseData.students.includes(studentId)) {
            // Exclude non-serializable data like Firestore references
            const { thumbnail, ...courseWithoutThumbnail } = courseData;
            courses.push({ id: doc.id, ...courseWithoutThumbnail });
          }
        });
  
        return courses;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const markCourseAsCompleted = createAsyncThunk(
    'student/markCourseAsCompleted',
    async ({ studentId, courseId }, { rejectWithValue }) => {
      try {
        const studentRef = doc(db, 'students', studentId);
        const studentDoc = await getDoc(studentRef);
  
        if (!studentDoc.exists()) {
          return rejectWithValue('Student not found');
        }
  
        const enrolledCourses = studentDoc.data().enrolledCourses || [];
        const updatedCourses = enrolledCourses.map(course =>
          course.id === courseId ? { ...course, completed: true, progress: 100 } : course
        );
  
        await updateDoc(studentRef, {
          enrolledCourses: updatedCourses
        });
  
        return { courseId, updatedCourses };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  
  const studentSlice = createSlice({
    name: 'student',
    initialState: {
      enrolledCourses: [],
      loading: false,
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
    extraReducers: (builder) => {
      builder
        .addCase(fetchStudentCourses.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchStudentCourses.fulfilled, (state, action) => {
          state.loading = false;
          state.enrolledCourses = action.payload;
        })
        .addCase(fetchStudentCourses.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(markCourseAsCompleted.fulfilled, (state, action) => {
            state.enrolledCourses = state.enrolledCourses.map(course =>
              course.id === action.payload.courseId ? { ...course, completed: true, progress: 100 } : course
            );
          });
    },
  });
  
  export const { setEnrolledCourses, setIsEnrolled, setError, updateCourseProgress } = studentSlice.actions;
  
  export default studentSlice.reducer;
  
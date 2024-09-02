import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './CourseSlice';
import studentReducer from './studentSlice';
import courseDetailsReducer from './courseDetailsSlice';

const store = configureStore({
  reducer: {
    course: courseReducer,
    courseDetails: courseDetailsReducer,
    student: studentReducer
  }
});

export default store;

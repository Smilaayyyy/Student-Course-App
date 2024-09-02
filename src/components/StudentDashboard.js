import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentCourses, markCourseAsCompleted } from '../redux/studentSlice';
import { ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../StudentDashboard.css';

function StudentDashboard() {
  const dispatch = useDispatch();
  const { enrolledCourses, error, loading } = useSelector((state) => state.student);
  const studentId = "9"; // Replace with actual studentId

  useEffect(() => {
    dispatch(fetchStudentCourses(studentId));
  }, [dispatch, studentId]);

  // Remove this function if not used


  const handleMarkAsCompleted = (courseId) => {
    dispatch(markCourseAsCompleted({ courseId, studentId }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="student-dashboard">
      <h1>Your Enrolled Courses</h1>
      {enrolledCourses.length === 0 ? (
        <p>You are not enrolled in any courses yet.</p>
      ) : (
        <div className="course-list">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="course-item">
              <div className="course-info">
                <Link to={`/courses/${course.id}`}>
                  <h3>{course.name}</h3>
                </Link>
                <p>Instructor: {course.instructor}</p>
                <p>Due Date: {course.DueDate}</p>
                <ProgressBar now={course.progress || 0} label={`${course.progress || 0}%`} />
                <button 
                  onClick={() => handleMarkAsCompleted(course.id)}
                  disabled={course.completed}
                >
                  {course.completed ? 'Completed' : 'Mark as Completed'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;

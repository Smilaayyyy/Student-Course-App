import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseById } from '../redux/CourseSlice';
import { enrollInCourse, updateLikes } from '../redux/courseDetailsSlice';
import '../CourseDetails.css'; // Import CSS file

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { selectedCourse, loading, error } = useSelector((state) => state.course);
  const { isEnrolled } = useSelector((state) => state.student);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [dispatch, courseId]);

  const handleEnroll = () => {
    const studentId = '1'; // Replace with actual student ID from authentication
    dispatch(enrollInCourse(courseId, studentId));
  };

  const handleLike = () => {
    dispatch(updateLikes(courseId));
  };

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="course-details-container">
      {selectedCourse ? (
        <div className="course-details">
          <h1>{selectedCourse.name}</h1>
          <div className="course-thumbnail">
            {selectedCourse.thumbnail && <img src={selectedCourse.thumbnail} alt="Course Thumbnail" />}
          </div>
          <p>{selectedCourse.description}</p>
          <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
          <p><strong>Duration:</strong> {selectedCourse.duration}</p>
          <p><strong>Schedule:</strong> {selectedCourse.schedule}</p>
          <p><strong>Location:</strong> {selectedCourse.location}</p>
          <p><strong>Enrollment Status:</strong> {selectedCourse.enrollmentStatus}</p>
          <p><strong>Prerequisites:</strong> {selectedCourse.prerequisites}</p>
          <p><strong>Syllabus:</strong> {selectedCourse.syllabus.join(', ')}</p>
          <p><strong>Students:</strong> {selectedCourse.students.join(', ')}</p>
          <p>Likes: {selectedCourse.likes}</p>
          <button onClick={handleLike}>Like</button>
          {selectedCourse.enrollmentStatus === 'Open' ? (
            !isEnrolled ? (
              <button onClick={handleEnroll}>Enroll</button>
            ) : (
              <button disabled>Enrolled</button>
            )
          ) : (
            <button disabled>Enrollment Closed</button>
          )}
        </div>
      ) : (
        <p>No course found.</p>
      )}
    </div>
  );
};

export default CourseDetails;


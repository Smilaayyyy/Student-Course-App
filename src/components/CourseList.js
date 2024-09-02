import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../redux/CourseSlice';
import { Link } from 'react-router-dom';
import '../CourseList.css'; // Import CSS file

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.course);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="course-list-container">
      <h3>Available Courses:</h3>
      <input
        type="text"
        placeholder="Search by name or description"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <ul className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <li key={course.id} className="course-item">
              <Link to={`/courses/${course.id}`} className="course-link">
                <h4>{course.name}</h4>
              </Link>
              <p>{course.description}</p>
            </li>
          ))
        ) : (
          <p>No courses available at the moment.</p>
        )}
      </ul>
    </div>
  );
};

export default CourseList;

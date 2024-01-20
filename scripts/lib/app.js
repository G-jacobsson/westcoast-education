import { state } from '../utilities/config.js';
import Course from '../Models/Course.js';
import HttpClient from './http.js';

const initApp = () => {
  switch (state.currentPage) {
    case '/':
    case '/index.html':
      listPopularCourses();
      break;
    case '/pages/courses.html':
      displayAllCourses();
      console.log('vi är i courses delen nu');
      console.log(state);
      break;
    case '/pages/course-details.html':
      showCourseDetails();
      console.log('Vi är i details nu');
      break;
  }
};

const listPopularCourses = async () => {
  try {
    const http = new HttpClient();
    const result = await http.get('courses', '');
    console.log(result);
    displayPopularCourses(result);
  } catch (error) {
    throw new Error('Error getting courses data:', error.message);
  }
};

const displayPopularCourses = (courses) => {
  const spotlightDiv = document.getElementById('spotlight-courses');

  const popularCourses = courses
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  popularCourses.forEach((course) => {
    const courseDiv = document.createElement('div');
    courseDiv.classList.add('popular-course');

    if (course.imageUrl) {
      const img = document.createElement('img');
      img.src = course.imageUrl;
      img.style.width = '200px';
      const link = document.createElement('a');
      link.href = `/pages/course-details.html?id=${course.id}`;
      link.appendChild(img);
      courseDiv.appendChild(link);
    }

    const title = document.createElement('h4');
    title.textContent = course.title;
    courseDiv.appendChild(title);

    spotlightDiv.appendChild(courseDiv);
  });
};

const listAllCourses = async () => {
  try {
    const http = new HttpClient();
    const result = await http.get('courses', '');
    console.log(result);

    const courses = result.map((course) => {
      console.log(course);
      return new Course(
        course.id,
        course.imageUrl,
        course.title,
        course.startDate,
        course.endDate,
        course.cost
      );
    });
    return courses;
  } catch (error) {
    throw error;
  }
};

const displayAllCourses = async () => {
  try {
    const courses = await listAllCourses();
    console.log(courses);

    courses.forEach((course) => {
      const link = document.createElement('a');
      link.href = `/pages/course-details.html?id=${course.id}`;

      const card = document.createElement('div');
      card.classList.add('card');
      card.style.backgroundColor = 'aqua';

      const image = document.createElement('img');
      image.src = course.imageUrl;
      image.setAttribute('alt', course.title);
      image.style.width = '50%';

      link.appendChild(image);
      card.appendChild(link);

      const body = document.createElement('div');
      card.appendChild(body);

      const title = document.createElement('h4');
      title.textContent = course.title;
      body.appendChild(title);

      const bodyText = document.createElement('p');
      title.appendChild(bodyText);

      const startDate = document.createElement('small');
      startDate.textContent = `Start date: ${course.startDate}`;
      startDate.classList.add('course-text');
      bodyText.appendChild(startDate);

      const endDate = document.createElement('small');
      endDate.textContent = `End date: ${course.endDate}`;
      endDate.classList.add('course-text');
      bodyText.appendChild(endDate);

      const cost = document.createElement('small');
      cost.textContent = `Price: ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(course.cost)}`;
      cost.classList.add('course-text');
      bodyText.appendChild(cost);

      document.querySelector('#card-container').appendChild(card);
    });
  } catch (error) {
    throw error;
  }
};

const findCourse = async (id) => {
  try {
    const http = new HttpClient();
    const result = await http.get('courses', `/${id}`);
    const course = new Course(
      result.id,
      result.imageUrl,
      result.title,
      result.startDate,
      result.endDate,
      result.cost,
      result.description
    );

    return course;
  } catch (error) {
    console.error('Error finding course:', error.message);
    throw error;
  }
};
const showCourseDetails = async () => {
  const courseId = location.search.split('=')[1];
  console.log(courseId);

  const course = await findCourse(courseId);
  console.log(course);
};

document.addEventListener('DOMContentLoaded', initApp);

import { state } from '../utilities/config.js';
import HttpClient from './http.js';

const initApp = () => {
  switch (state.currentPage) {
    case '/index.html':
      listPopularCourses();
      break;
  }
};

const listPopularCourses = async () => {
  try {
    const http = new HttpClient();
    const result = await http.fetchData('courses');
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
      courseDiv.appendChild(img);
    }

    const title = document.createElement('h4');
    title.textContent = course.title;
    courseDiv.appendChild(title);

    spotlightDiv.appendChild(courseDiv);
  });
};

document.addEventListener('DOMContentLoaded', initApp);

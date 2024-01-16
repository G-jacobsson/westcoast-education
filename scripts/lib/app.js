const state = {
  currentPage: location.pathname,
};

const initApp = () => {
  switch (state.currentPage) {
    case '/index.html':
      listPopularCourses();
      break;
  }
};

const listPopularCourses = async () => {
  try {
    const url = 'http://localhost:3000/courses';
    const response = await fetch(url);

    if (response.ok) {
      const courses = await response.json();
      displayPopularCourses(courses);
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
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

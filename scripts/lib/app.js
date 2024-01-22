import { state } from '../utilities/config.js';
import Course from '../Models/Course.js';
import HttpClient from './Http.js';
import { pageBackgroundImage } from './domManager.js';
import { formInputToJson } from '../utilities/config.js';

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
    case '/pages/register.html':
      console.log('vi är i register delen nu');
      initRegisterPage();
      break;
    case '/pages/login.html':
      console.log('Vi är i login delen nu');
      initLoginPage();
      break;
  }
};

/* ************************************************** */
/* ************************************************** */
/* ********************COURSES FUNCTIONS************* */
/* ************************************************** */
/* ************************************************** */

const listPopularCourses = async () => {
  try {
    const http = new HttpClient();
    const result = await http.get('courses', '');
    console.log(result);
    displayPopularCourses(result);
    const backgroundImage = pageBackgroundImage();
    document.querySelector('#index-container').appendChild(backgroundImage);
  } catch (error) {
    throw new Error('Error getting courses data:', error.message);
  }
};

const displayPopularCourses = (courses) => {
  const spotlightDiv = document.querySelector('#spotlight-courses');

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
      card.style.backgroundColor = '#B2B2B2';
      card.style.padding = '10px';
      card.style.margin = '10px';
      card.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';

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

      const backgroundImage = pageBackgroundImage();
      document.querySelector('#course-container').appendChild(backgroundImage);
      backgroundImage.style.opacity = '0.05';

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
      result.description,
      result.rating
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
  const backgroundImage = pageBackgroundImage();
  document
    .querySelector('#course-details-container')
    .appendChild(backgroundImage);
  console.log(course);
};

/* ************************************************** */
/* ************************************************** */
/* ********************USER FUNCTIONS**************** */
/* ************************************************** */
/* ************************************************** */

const getAllUsers = async () => {
  console.log('getallusers called');
  try {
    const http = new HttpClient();
    const response = await http.get('users', '');
    console.log(response);
    return response;
  } catch (error) {
    console.log('Error getting users in getAllUsers', error);
    throw error;
  }
};

const addUser = async (e) => {
  console.log('addUser triggered');
  e.preventDefault();

  const user = new FormData(e.target);
  const userObj = formInputToJson(user);
  try {
    await saveUser(userObj);
    console.log(userObj);
  } catch (error) {
    console.log('Error saving user:', error);
  }
};

const saveUser = async (user) => {
  // const url = `settings.${BASE_URL}`;
  const http = new HttpClient();
  await http.add(user, 'users');

  const usersData = JSON.parse(localStorage.getItem('usersData')) || {
    users: [],
  };
  usersData.users.push(user);
  localStorage.setItem('usersData', JSON.stringify(usersData));

  location.href = '/';
};

/* ************************************************** */
/* ************************************************** */
/* **********REGISTER & LOGIN FUNCTIONS************** */
/* ************************************************** */
/* ************************************************** */

const initRegisterPage = () => {
  const registerForm = document.querySelector('#register-form');
  const backgroundImage = pageBackgroundImage();
  document.querySelector('.form-container').appendChild(backgroundImage);
  if (registerForm) {
    registerForm.addEventListener('submit', addUser);
    console.log('Register form event listener attached');
  } else {
    console.error('Register form not found');
  }
};

const initLoginPage = () => {
  const loginForm = document.querySelector('#login-form');
  const backgroundImage = pageBackgroundImage();
  document.querySelector('.form-container').appendChild(backgroundImage);

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
    console.log('Login form event listener attached');
  } else {
    console.log('Login form not found');
  }
};

const handleLogin = async (e) => {
  e.preventDefault();

  const email = e.target.email.value.trim();
  const password = e.target.password.value.trim();

  try {
    let usersData = JSON.parse(localStorage.getItem('usersData'));
    let user;
    if (usersData && usersData.users) {
      user = usersData.users.find(
        (u) => u.email === email && u.password === password
      );
    }
    if (!user) {
      console.log('User not found in localStorage, checking db.json');
      const users = await getAllUsers();
      // console.log(users);
      user = users.find((u) => u.email === email && u.password === password);
    }

    if (user) {
      location.href = '/pages/courses.html';
      alert('Login Successful');
    } else {
      alert('Invalid email or password');
      location.href = '/pages/register.html';
    }
  } catch (error) {
    console.log('Login error:', error);
    alert('Login failed due to an error');
  }
};

/* ************************************************** */
/* ************************************************** */
/* ****************EVENT LISTENERS******************* */
/* ************************************************** */
/* ************************************************** */

document.addEventListener('DOMContentLoaded', initApp);

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
    case '/pages/admin.html':
      const backgroundImage = pageBackgroundImage();
      document.querySelector('#admin').appendChild(backgroundImage);
      break;
    case '/admin/add-course.html':
      console.log('Vi är i add course delen nu');
      initAddCoursePage();
      break;
    case '/admin/admin-data.html':
      handleEditButtonClick();
      break;
    case '/admin/enrollments.html':
      searchAndDisplayEnrollments();
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

      const image = document.createElement('img');
      image.src = course.imageUrl;
      image.setAttribute('alt', course.title);
      image.style.width = '100%';

      link.appendChild(image);
      card.appendChild(link);

      const body = document.createElement('div');
      body.classList.add('course-text');
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
  try {
    const course = await findCourse(courseId);
    const backgroundImage = pageBackgroundImage();
    document
      .querySelector('#course-details-container')
      .appendChild(backgroundImage);
    console.log(course);

    const div = document.querySelector('#course-details-container');
    const image = document.createElement('img');
    image.src = course.imageUrl;
    image.style.width = '50%';
    div.appendChild(image);

    const title = document.createElement('h2');
    title.textContent = course.title;
    div.appendChild(title);

    const description = document.createElement('p');
    description.textContent = course.description;
    div.appendChild(description);

    const cost = document.createElement('p');
    cost.textContent = '$' + course.cost;
    div.appendChild(cost);

    const rating = document.createElement('p');
    rating.textContent = course.rating;
    div.appendChild(rating);

    const bookButton = document.createElement('button');
    bookButton.textContent = 'Book Course';
    bookButton.id = 'bookBtn';
    div.appendChild(bookButton);
    bookButton.addEventListener('click', () => enrollInCourse(courseId));
  } catch (error) {
    throw new Error(error);
  }
};

async function enrollInCourse(courseId) {
  const httpClient = new HttpClient();
  const user = getLoggedInUser();

  if (!user) {
    alert('Please log in to book a course');
    location.href = '/pages/login.html';
    return;
  }

  const students = await httpClient.get('students');
  const isStudent = students.some((student) => student.id === user.id);

  if (!isStudent) {
    await httpClient.add(user, 'students');
  }

  const enrollment = {
    studentId: user.id,
    courseId: courseId,
    enrollmentDate: new Date().toISOString(),
  };

  await httpClient.add(enrollment, 'enrollments');

  alert('You have successfully enrolled in the course!');
}

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

const getLoggedInUser = () => {
  const userJson = localStorage.getItem('loggedInUser');
  return userJson ? JSON.parse(userJson) : null;
};

const updateLoginLink = () => {
  const loginLink = document.querySelector('#loginLink');
  if (getLoggedInUser()) {
    loginLink.textContent = 'Log out';
    loginLink.href = '#';
    loginLink.addEventListener('click', handleLogout);
  } else {
    loginLink.textContent = 'Log in';
    loginLink.href = '/pages/login.html';
    loginLink.removeEventListener('click', handleLogout);
  }
};

const handleLogout = () => {
  localStorage.removeItem('loggedInUser');
  updateLoginLink();
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
      usersData = usersData || { users: [] };
      usersData.users.push(user);
      localStorage.setItem('usersData', JSON.stringify(usersData));
    }

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
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
/* ****************ADMIN FUNCTIONS******************* */
/* ************************************************** */
/* ************************************************** */

const initAddCoursePage = () => {
  const addCourseForm = document.querySelector('#addCourse-form');
  const backgroundImage = pageBackgroundImage();
  document.querySelector('.form-container').appendChild(backgroundImage);

  if (addCourseForm) {
    addCourseForm.addEventListener('submit', addCourse);
  } else {
    console.log('Add course form not found');
  }
};

const addCourse = async (e) => {
  e.preventDefault();
  console.log('Du är i addcourse');

  const course = new FormData(e.target);
  const courseObj = formInputToJson(course);

  if (!courseObj.imageUrl || !courseObj.imageUrl.trim()) {
    courseObj.imageUrl = '/assets/images/placeholder_course_image.jpeg';
  }

  try {
    await saveCourse(courseObj);
  } catch (error) {
    throw new Error('Error saving course', error);
  }
};

const saveCourse = async (course) => {
  const http = new HttpClient();
  await http.add(course, 'courses');

  location.href = '/';
};

const editButton = document.querySelector('#edit-button');

const handleEditButtonClick = () => {
  const selectedOptions = document.querySelector(
    'input[name="dataOption"]:checked'
  ).value;
  const backgroundImage = pageBackgroundImage();
  document.querySelector('#data-options').appendChild(backgroundImage);
  showEditForm(selectedOptions);
};

const showEditForm = (option) => {
  const dataContainer = document.querySelector('#data-container');
  dataContainer.innerHTML = getformHtml(option);

  const editForm = document.querySelector('#editForm');
  editForm.addEventListener('submit', handleUpdate);
};

let studentsFormFields = `<div class="admin-form">
<input type="hidden" name="id" value="" />
<label for="firstName">First Name</label>
    <input type="text" name="firstName" placeholder="First Name" required />
    <label for="lastName">Last Name</label>
    <input type="text" name="lastName" placeholder="Last Name" required />
    <label for="birthDate">Birth Date</label>
    <input type="date" name="birthDate" placeholder="Birth Date" required />
    <label for="email">Email</label>
    <input type="email" name="email" placeholder="Email" required />
    <label for="phone">Phone</label>
    <input type="text" name="phone" placeholder="Phone" required />
    <label for="courseId">Course ID</label>
    <input type="text" name="courseId" placeholder="Course ID (comma-separated for multiple)" /></div>
`;

let teachersFormFields = `<div class="admin-form">
<input type="hidden" name="id" value="" />
<label for="firstName">First Name</label>
    <input type="text" name="firstName" placeholder="First Name" required />
    <label for="lastName">Last Name</label>
    <input type="text" name="lastName" placeholder="Last Name" required />
    <label for="email">Email</label>
    <input type="email" name="email" placeholder="Email" required />
    <label for="phone">Phone</label>
    <input type="text" name="phone" placeholder="Phone" required />
    <label for="CourseId">Course ID</label>
    <input type="text" name="courseId" placeholder="Course ID (comma-separated for multiple)" /></div>
`;

let coursesFormFields = `<div class="admin-form">
<input type="hidden" name="id" value="" />
<label for="title">Title</label>
    <input type="text" name="title" placeholder="Title" required />
    <label for="description">Description</label>
    <textarea name="description" placeholder="Description" required></textarea>
    <label for="imageUrl">Image Url</label>
    <input type="text" name="imageUrl" placeholder="Image URL" />
    <label for="teacher">Teacher</label>
    <input type="text" name="teacher" placeholder="Teacher" required />
    <label for="startDate">Start Date</label>
    <input type="date" name="startDate" placeholder="Start Date" required />
    <label for="endDate">End Date</label>
    <input type="date" name="endDate" placeholder="End Date" required />
    <label for="prerequisites">Prerequisites</label>
    <textarea name="prerequisites" placeholder="Prerequisites"></textarea>
    <label for="cost">Cost</label>
    <input type="number" name="cost" placeholder="Cost" required />
    <label for="rating">Rating</label>
    <input type="number" name="rating" placeholder="Rating" min="0" max="5" step="0.1" />
    <label for="status">Status</label>
    <input type="text" name="status" placeholder="Status" required /></div>
`;

const getformHtml = (option) => {
  let formFieldsHtml = '';

  switch (option) {
    case 'students':
      // Add form fields for editing a student
      formFieldsHtml = studentsFormFields;
      break;
    case 'teachers':
      // Add form fields for editing a teacher
      formFieldsHtml = teachersFormFields;
      break;
    case 'courses':
      // Add form fields for editing a course
      formFieldsHtml = coursesFormFields;
      break;
  }
  return `
  <h3>Edit ${option}</h3>
  <form id="searchForm">
  <input type="number" id="searchId" placeholder="Enter ID" required>
  <button type="submit">Search</button>
</form>

<div id="editFormContainer">
<form id="editForm">
  <!-- The edit form will be populated here -->
  ${formFieldsHtml}
  <button type="submit" id="updateButton">Update</button>
  </form>
</div>

  `;
};

function handleFormSubmit(e) {
  if (e.target.id === 'searchForm') {
    e.preventDefault();
    const id = document.getElementById('searchId').value;
    const dataType = document.querySelector(
      'input[name="dataOption"]:checked'
    ).value;
    fetchDataById(dataType, id)
      .then((data) => {
        if (data) {
          fillFormWithData(dataType, data);
        } else {
          console.log('No data found with the given ID');
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }
}

async function fetchDataById(dataType, id) {
  const response = await fetch(`http://localhost:3000/${dataType}/${id}`);
  console.log(response);
  if (response.ok) {
    return response.json();
  }
  return null;
}

function fillFormWithData(dataType, data) {
  for (const key in data) {
    const input = document.querySelector(`#editFormContainer [name="${key}"]`);
    if (input) {
      input.value = data[key];
    } else {
      console.log(`Input not found for key: ${key}`);
    }
  }
}

const handleUpdate = async (e) => {
  e.preventDefault();

  const id = document.querySelector("#editForm input[name='id']").value;
  const updatedData = formInputToJson(new FormData(e.target));
  const dataType = document.querySelector(
    'input[name="dataOption"]:checked'
  ).value;

  try {
    const http = new HttpClient();
    await http.update(updatedData, dataType, id);
    alert('Data updated successfully');
    // Optionally, refresh the data on the page or redirect
  } catch (error) {
    console.error('Error updating data:', error);
    alert('Failed to update data');
  }
};

const searchButton = document.querySelector('#btn-search');

async function searchAndDisplayEnrollments() {
  const backgroundImage = pageBackgroundImage();
  document.querySelector('.search-container').appendChild(backgroundImage);
  try {
    // Get the user input for searching
    const searchInput = document.querySelector('#searchInput').value;
    console.log('Search input:', searchInput);
    const http = new HttpClient();

    // Make an HTTP GET request to search for the course
    // Note: We use the 'courses' key from settings.ENDPOINTS to construct the URL
    const courses = await http.get('courses', `?search=${searchInput}`);

    if (!courses.length) {
      console.log('No courses found');
      return;
    }

    // Find the course that matches the search input (assuming searchInput is the course ID)
    const searchedCourse = courses.find(
      (course) => course.id.toString() === searchInput
    );

    if (!searchedCourse) {
      console.log('Course not found');
      return;
    }

    console.log('Course:', searchedCourse);

    // Fetch enrollments for the found course
    const enrollments = await http.get(
      'enrollments',
      `?courseId=${searchedCourse.id}`
    );

    console.log('Enrollments:', enrollments);
    const resultsContainer = document.querySelector('#results-container');
    resultsContainer.innerHTML = '';

    // Create and append new elements for course
    const courseElement = document.createElement('div');
    courseElement.innerHTML = `<h2>${searchedCourse.title}</h2>`;
    resultsContainer.appendChild(courseElement);

    // Create and append elements for each enrollment
    enrollments.forEach((enrollment) => {
      const enrollmentDiv = document.createElement('div');
      enrollmentDiv.innerHTML = `
      <p>Student ID: ${enrollment.studentId}</p>
      <p>Enrollment Date: ${enrollment.enrollmentDate}</p>
      <p>Status: ${enrollment.status}</p>
      `;
      enrollmentDiv.id = 'enrollmentDiv';
      resultsContainer.appendChild(enrollmentDiv);
    });
  } catch (error) {
    console.error('Error searching for course:', error.message);
  }
}

/* ************************************************** */
/* ************************************************** */
/* ****************EVENT LISTENERS******************* */
/* ************************************************** */
/* ************************************************** */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  updateLoginLink();
});
if (searchButton) {
  searchButton.addEventListener('click', searchAndDisplayEnrollments);
}
if (editButton) {
  editButton.addEventListener('click', handleEditButtonClick);
}
document.addEventListener('submit', handleFormSubmit);

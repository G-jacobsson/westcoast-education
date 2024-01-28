import { formInputToJson } from '../utilities/config.js';
import HttpClient from '../utilities/Http.js';

export const showEditForm = (option) => {
  const dataContainer = document.querySelector('#data-container');
  dataContainer.innerHTML = getformHtml(option);

  const editForm = document.querySelector('#editForm');
  editForm.addEventListener('submit', handleUpdate);
};

export let studentsFormFields = `<div class="admin-form">
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

export let teachersFormFields = `<div class="admin-form">
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

export let coursesFormFields = `<div class="admin-form">
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

export const getformHtml = (option) => {
  let formFieldsHtml = '';

  switch (option) {
    case 'students':
      formFieldsHtml = studentsFormFields;
      break;
    case 'teachers':
      formFieldsHtml = teachersFormFields;
      break;
    case 'courses':
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

export function handleFormSubmit(e) {
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

export async function fetchDataById(dataType, id) {
  const response = await fetch(`http://localhost:3000/${dataType}/${id}`);
  console.log(response);
  if (response.ok) {
    return response.json();
  }
  return null;
}

export function fillFormWithData(dataType, data) {
  for (const key in data) {
    const input = document.querySelector(`#editFormContainer [name="${key}"]`);
    if (input) {
      input.value = data[key];
    } else {
      console.log(`Input not found for key: ${key}`);
    }
  }
}

export const handleUpdate = async (e) => {
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
  } catch (error) {
    console.error('Error updating data:', error);
    alert('Failed to update data');
  }
};

export const searchButton = document.querySelector('#btn-search');

export async function searchAndDisplayEnrollments() {
  try {
    const searchInput = document.querySelector('#searchInput').value;
    console.log('Search input:', searchInput);
    const http = new HttpClient();

    const courses = await http.get('courses', `?search=${searchInput}`);

    if (!courses.length) {
      console.log('No courses found');
      return;
    }

    const searchedCourse = courses.find(
      (course) => course.id.toString() === searchInput
    );

    if (!searchedCourse) {
      console.log('Course not found');
      return;
    }

    console.log('Course:', searchedCourse);

    const enrollments = await http.get(
      'enrollments',
      `?courseId=${searchedCourse.id}`
    );

    console.log('Enrollments:', enrollments);
    const resultsContainer = document.querySelector('#results-container');
    resultsContainer.innerHTML = '';

    const courseElement = document.createElement('div');
    courseElement.innerHTML = `<h2>${searchedCourse.title}</h2>`;
    resultsContainer.appendChild(courseElement);

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

import HttpClient from '../utilities/Http.js';
import { formInputToJson } from '../utilities/config.js';
import { showEditForm } from './formManager.js';

export const initAddCoursePage = () => {
  const addCourseForm = document.querySelector('#addCourse-form');

  if (addCourseForm) {
    addCourseForm.addEventListener('submit', addCourse);
  } else {
    console.log('Add course form not found');
  }
};

export const addCourse = async (e) => {
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

export const saveCourse = async (course) => {
  const http = new HttpClient();
  await http.add(course, 'courses');

  location.href = '/';
};

export const editButton = document.querySelector('#edit-button');

export const handleEditButtonClick = () => {
  const selectedOptions = document.querySelector(
    'input[name="dataOption"]:checked'
  ).value;

  showEditForm(selectedOptions);
};

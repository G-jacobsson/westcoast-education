import { state } from '../utilities/config.js';
import {
  listPopularCourses,
  displayAllCourses,
  showCourseDetails,
} from './courseManager.js';
import {
  initRegisterPage,
  initLoginPage,
  updateLoginLink,
} from './userManager.js';
import {
  initAddCoursePage,
  handleEditButtonClick,
  editButton,
} from './adminManager.js';
import {
  searchAndDisplayEnrollments,
  searchButton,
  handleFormSubmit,
} from './formManager.js';

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

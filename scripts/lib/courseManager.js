import Course from '../../dist/Models/Course.js';
import HttpClient from '../utilities/Http.js';
import { getLoggedInUser } from './userManager.js';

export const listPopularCourses = async () => {
  try {
    const http = new HttpClient();
    const result = await http.get('courses', '');
    console.log(result);
    displayPopularCourses(result);
  } catch (error) {
    throw new Error('Error getting courses data:', error.message);
  }
};

export const displayPopularCourses = (courses) => {
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

export const listAllCourses = async () => {
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

export const displayAllCourses = async () => {
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

      document.querySelector('#card-container').appendChild(card);
    });
  } catch (error) {
    throw error;
  }
};

export const findCourse = async (id) => {
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

export const showCourseDetails = async () => {
  const courseId = location.search.split('=')[1];
  console.log(courseId);
  try {
    const course = await findCourse(courseId);
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

export async function enrollInCourse(courseId) {
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

export const state = {
  currentPage: location.pathname,
};

export const settings = {
  BASE_URL: 'http://localhost:3000',
  ENDPOINTS: {
    students: '/students',
    teachers: '/teachers',
    courses: '/courses',
    enrollments: '/enrollments',
    users: '/users',
  },
};

export const formInputToJson = (formInput) => {
  const inputData = Object.fromEntries(formInput.entries());
  console.log(inputData);

  return inputData;
};

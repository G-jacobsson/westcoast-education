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
  },
};

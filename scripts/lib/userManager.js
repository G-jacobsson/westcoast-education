import { formInputToJson } from '../utilities/config.js';
import HttpClient from '../utilities/Http.js';

export const initLoginPage = () => {
  const loginForm = document.querySelector('#login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
    console.log('Login form event listener attached');
  } else {
    console.log('Login form not found');
  }
};

export const initRegisterPage = () => {
  const registerForm = document.querySelector('#register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', addUser);
    console.log('Register form event listener attached');
  } else {
    console.error('Register form not found');
  }
};

export const handleLogin = async (e) => {
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

export const getAllUsers = async () => {
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

export const addUser = async (e) => {
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

export const saveUser = async (user) => {
  const http = new HttpClient();
  await http.add(user, 'users');

  const usersData = JSON.parse(localStorage.getItem('usersData')) || {
    users: [],
  };
  usersData.users.push(user);
  localStorage.setItem('usersData', JSON.stringify(usersData));

  location.href = '/';
};

export const getLoggedInUser = () => {
  const userJson = localStorage.getItem('loggedInUser');
  return userJson ? JSON.parse(userJson) : null;
};

export const updateLoginLink = () => {
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

export const handleLogout = () => {
  localStorage.removeItem('loggedInUser');
  updateLoginLink();
  location.href = '/';
};

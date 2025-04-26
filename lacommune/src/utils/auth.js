export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  const token = getToken();
  const user = getUser();
  return !!token && !!user;
};

export const hasRole = (requiredRole) => {
  const user = getUser();
  return user && user.role === requiredRole;
};
import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,

  login: async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ isLoggedIn: true, user, token });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || '로그인 실패' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ isLoggedIn: false, user: null, token: null });
  }
}));

export default useAuthStore;

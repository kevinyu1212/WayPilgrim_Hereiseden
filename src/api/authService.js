import API from "./axios";

export const authService = {
  // 중복 확인 (email, userId, nickname)
  checkDuplicate: async (type, value) => {
    const { data } = await API.get(`/auth/check?type=${type}&value=${value}`);
    return data.isAvailable;
  },
  // 회원가입 단계 1: 기본 정보 제출
  register: async (userData) => {
    const { data } = await API.post("/auth/register", userData);
    return data;
  },
  // 로그인
  login: async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });
    return data;
  },
  // 프로필 업데이트 (이미지 포함)
  updateProfile: async (profileData) => {
    const { data } = await API.put("/auth/profile", profileData);
    return data;
  }
};

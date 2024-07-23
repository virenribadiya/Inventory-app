import router from "@/router";
import { commonApiService } from "../shared/services/commonApiService";

const authService = {
  async doLogin(paramObj) {
    try {
      const response = await commonApiService.getResponse({
        apiName: '/auth/login',
        methodType: 'post',
        parameterObject: paramObj
      });
      const token = response.token;
      localStorage.setItem('jwt_token', token);
      return response.data;
    } catch (error) {
      //console.error('Error while logging in:', error);
      throw error;
    }
  },

  async doRegiter(paramObj) {
    try {
      const response = await commonApiService.getResponse({
        apiName: '/auth/register',
        methodType: 'post',
        parameterObject: paramObj
      });
      const token = response.token;
      localStorage.setItem('jwt_token', token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async signInWithGoogle(paramObj) {
    try {
      const response = await commonApiService.getResponse({
        apiName: '/auth/signInWithGoogle',
        methodType: 'post',
        parameterObject: paramObj
      });
      const token = response.token;
      localStorage.setItem('jwt_token', token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  doLogout() {
    localStorage.clear();
    // location refresh from video.
    router.push({ name: 'Login' });
  }
}

export { authService };
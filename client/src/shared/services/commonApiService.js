import axios from 'axios'; // we can use interceptors to set headers and all

const commonApiService = {
  async getResponse({ apiName, methodType, parameterObject }) {
    try {
      let response;
      const token = localStorage.getItem('jwt_token'); // Assuming you store the JWT token in localStorage
      const headers = { 'Content-Type': 'application/json' };
      if (token) { headers['Authorization'] = `Bearer ${token}`; }

      switch (methodType.toLowerCase()) {
        case 'get':
          response = await axios.get(import.meta.env.VITE_BACKEND_SERVER_URL + apiName, { headers });
          break;
        case 'post':
          response = await axios.post(import.meta.env.VITE_BACKEND_SERVER_URL + apiName, parameterObject, { headers });
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${methodType}`);
      }
      return response.data;
    } catch (error) {
      throw error;
      //console.error(`Error ${methodType.toUpperCase()}ing data for API '${apiName}':`, error);
    }
  }
};

export { commonApiService };



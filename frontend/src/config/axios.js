// mi hocemo poslat na backend podatke
// axios poveze frontend in backend


//to je traversy koda
//http client
import axios from "axios";


const instance = axios.create({
    // url do mojega backenda
    baseURL: 'http://localhost:3000/'
});
  
instance.interceptors.request.use(
    (request) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const token = user.token;
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    },
    (err) => {
      return err.message;
    }
  );
  
export default instance;

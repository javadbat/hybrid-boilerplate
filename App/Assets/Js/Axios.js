import axios from 'axios';
import authManager from './Auth';
import generalConfig from '../../../Config/GeneralConfig';
const accessToken = authManager.accessToken;
const config ={
    baseURL: generalConfig.address.serviceUrl,
    timeout: 200000,
};
const axiosWithAuth = axios.create({
    ...config,
    headers:{
        'Authorization':'Bearer '+ accessToken
    }
});
const axiosWithoutAuth = axios.create({
    ...config
});
function updateAxiosAuth(accessToken){
    axiosWithAuth.defaults.headers.Authorization = 'Bearer '+ accessToken;
}
authManager.callbacks.onTokenUpdate = updateAxiosAuth;
export {axiosWithoutAuth};
export default axiosWithAuth;

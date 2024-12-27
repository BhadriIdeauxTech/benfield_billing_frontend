import axios from 'axios'

const baseURLs = {
  development: 'http://localhost:8000/', // API server url (Development)
  production: 'https://api.benfield.ideauxbill.in/', // API server url (Production)
  staging: 'https://benfield.ideauxbill.in/',  // API server url (Staging)

  BackendConnect: 'http://192.168.29.103:8000/',
  dev: 'https://benfield.dev.api.ideauxbill.in',
};

// const environment = process.env.NODE_ENV || 'development';
const environment = 'production';  
// const environment = 'BackendConnect';
// axios.defaults.withCredentials = true;

const request = axios.create({
  baseURL: baseURLs[environment],
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});


export default request



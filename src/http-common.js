import axios from 'axios'
export default axios.create({
  baseURL: 'https://jawapp-backend.sol.ovh/api',
  // baseURL: 'http://localhost:32300/api/',
  headers: {
    'Content-type': 'application/json'
  }
})

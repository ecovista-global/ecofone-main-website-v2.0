const axios = require('axios');

async function main() {
  try {
    const res = await axios.post('https://nextjs-642200683.kloudbeansite.com/api/v1/sub-admin/login', {
      password: 'password123'
    });
    console.log('Login Response:', res.data);
  } catch (err) {
    if (err.response) {
      console.error('API Error:', err.response.status, err.response.data);
    } else {
      console.error('Request Error:', err.message);
    }
  }
}

main();

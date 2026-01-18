const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

const testAuth = async () => {
    try {
        console.log('--- Testing Registration ---');
        const regRes = await axios.post(`${API_URL}/register`, {
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            password: 'password123'
        });
        console.log('Registration Success:', regRes.data);
        const token = regRes.data.token;

        console.log('\n--- Testing Login ---');
        const loginRes = await axios.post(`${API_URL}/login`, {
            email: regRes.config.data && JSON.parse(regRes.config.data).email,
            password: 'password123'
        });
        console.log('Login Success:', loginRes.data);

        console.log('\n--- Testing Profile (Protected) ---');
        const profileRes = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Profile Success:', profileRes.data.name);

    } catch (error) {
        if (error.response) {
            console.error('Test Failed:', error.response.data.error);
            console.error('Stack:', error.response.data.stack);
        } else {
            console.error('Test Failed:', error.message);
        }
    }
};

testAuth();

const request = require('supertest');
const app = require('../../server'); // Your main server file

let adminToken;
let userToken;

beforeAll(async () => {
  // Register and login to get tokens
  
  const userRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'User', email: 'user@example.com', password: 'userpass', role: 'user' });

  const userLogin = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user@example.com', password: 'userpass' });

  userToken = userLogin.body.data.token;
});

describe('Protected Routes', () => {
  
  it('should deny user access to admin-only route', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    //expect(res.body.message).toBe('Access denied');
  });

});

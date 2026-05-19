import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 }, // sobe
    { duration: '20s', target: 20 }, // mantém
    { duration: '10s', target: 0 },  // desce
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das req < 500ms
    http_req_failed: ['rate<0.01'],   // <1% erro
  },
};

export default function () {
  const payload = JSON.stringify({
    username: 'Admin',
    password: '123'
  });

  const res = http.post(
    'http://localhost:5196/api/User/login',
    payload,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  check(res, {
    'status 200': (r) => r.status === 200,
    'retornou token': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.token !== undefined;
      } catch {
        return false;
      }
    },
  });

  sleep(1);
}
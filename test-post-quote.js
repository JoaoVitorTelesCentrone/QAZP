import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 20 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

const eventTypes = [
  "Wedding",
  "TradeShow",
  "Party",
  "Festival",
  "Workshop",
  "Exhibition",
  "Launch",
  "Championship",
  "Convention",
  "Ball",
  "Seminar",
  "Meeting",
  "Campaign",
  "Ceremony",
  "Symposium"
];

export default function () {
  // 🎯 pega tipo de evento aleatório
  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  const payload = JSON.stringify({
    fullName: `User ${__VU}-${__ITER}`,
    email: `user${__VU}-${__ITER}@test.com`,
    phoneNumber: `1199999${Math.floor(Math.random() * 1000)}`,
    eventType: eventType,
    estimatedAudience: Math.floor(Math.random() * 500) + 50
  });

  const res = http.post(
    'http://localhost:5196/api/quote',
    payload,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  check(res, {
    'status 200/201': (r) => r.status === 200 || r.status === 201,
    'tem id': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.id !== undefined;
      } catch {
        return false;
      }
    },
  });

  sleep(Math.random() * 2);
}
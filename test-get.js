import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 50 },
        { duration: '30s', target: 0 },
    ],
};

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6IjFlMjZlMGE2LTFiMDUtNDY0ZS1hYTBiLTc5NWQ5N2VjODBjZiIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzc0MzY1OTY1LCJleHAiOjE3NzQzNjk1NjUsImlhdCI6MTc3NDM2NTk2NSwiaXNzIjoiTXlBcHBJc3N1ZXIiLCJhdWQiOiJNeUFwcEF1ZGllbmNlIn0.CTd4eHXJQFaLV3Tn9mNhuaCR5M87vTyGN2ueGlSTMJ4';

export default function () {
    const res = http.get('http://localhost:5196/api/client', {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });

    check(res, {
        'status 200': (r) => r.status === 200,
    });

    sleep(0, 5);
}
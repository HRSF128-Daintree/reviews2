import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    // { duration: '1s', target: 100 },
    { duration: '20s', target: 1000 },
  ],
};
export default function() {
  http.get('http://localhost:3004/users/The_Nomad_Quarters_10');
  sleep(1);
}
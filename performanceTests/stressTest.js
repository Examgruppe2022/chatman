import http from 'k6/http'
import { sleep } from 'k6'

export const oprions = {
  stages: [
    { duration: "3m", target: 5},
    { duration: "5m", target: 5},
    { duration: "3m", target: 10},
    { duration: "5m", target: 10},
    { duration: "3m", target: 15},
    { duration: "5m", target: 15},
    { duration: "5m", target: 0},
  ]
};

export default function () {
  http.get('http://${__ENV.URL}/')
  sleep(1)
}
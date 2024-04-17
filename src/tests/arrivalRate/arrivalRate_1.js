import { superAdminOperations } from '../../roles/superAdmin.js';
import { commonTestSetup } from '../../common/testSetup.js';

export const options = {
  scenarios: {
    exponential_arrival: {
      executor: 'constant-arrival-rate',
      rate: 100,       // 100 iterations per second
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 10,
      maxVUs: 10,
    },
  },
};


export function setup() {
  return commonTestSetup();
}

export default function (superAdminAuthToken) {
  superAdminOperations(superAdminAuthToken);
}

import { setup } from './testSetup.js';
import { superAdminOperations } from './roles/superAdmin.js';

export const options = {
  scenarios: {
    exponential_arrival: {
      executor: 'constant-arrival-rate',
      rate: 100,       // 1000 iterations per second
      timeUnit: '1s',   // seconds are the time unit
      duration: '1m',  // duration the iterations are running for
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
};



export default function () {
  const auhToken = setup();
  superAdminOperations(auhToken);
  sleep(1)
}

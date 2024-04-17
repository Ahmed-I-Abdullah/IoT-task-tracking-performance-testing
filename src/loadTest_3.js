import { setup } from './testSetup.js';
import { superAdminOperations } from './roles/superAdmin.js';

export const options = {
  vus: 50,
  iterations: 50,
  // setupTimeout: '600s',
  ext: {
    loadimpact: {
      name: '50 Users Test',
    },
  },
}



export default function () {
  const auhToken = setup();
  return superAdminOperations(auhToken);
}

import { setup } from './testSetup.js';
import { superAdminOperations } from './roles/superAdmin.js';

// export const options = {
//   vus: 1,
//   iterations: 1,
//   ext: {
//     loadimpact: {
//       name: '1 User Test',
//     },
//   },
// }

export default function () {
  const auhToken = setup();
  superAdminOperations(auhToken);
}

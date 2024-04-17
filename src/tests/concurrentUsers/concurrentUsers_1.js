import { superAdminOperations } from "../../roles/superAdmin.js";
import { commonTestSetup } from "../../common/testSetup.js";

export const options = {
  vus: 1,
  iterations: 1,
  ext: {
    loadimpact: {
      name: '1 Virtual User Test',
    },
  },
}

export function setup() {
  return commonTestSetup();
}

export default function (superAdminAuthToken) {
  superAdminOperations(superAdminAuthToken);
}
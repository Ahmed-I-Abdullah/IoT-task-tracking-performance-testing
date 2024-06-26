import { superAdminOperations } from "../../roles/superAdmin.js";
import { commonTestSetup } from "../../common/testSetup.js";

export const options = {
  vus: 100,
  iterations: 100,
  ext: {
    loadimpact: {
      name: '100 Virtual Users Test',
    },
  },
}

export function setup() {
  return commonTestSetup();
}

export default function (superAdminAuthToken) {
  superAdminOperations(superAdminAuthToken);
}
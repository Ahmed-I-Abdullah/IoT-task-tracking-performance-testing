import { superAdminOperations } from "../../roles/superAdmin.js";
import { commonTestSetup } from "../../common/testSetup.js";

export const options = {
  vus: 50,
  iterations: 50,
  ext: {
    loadimpact: {
      name: '50 Virtual Users Test',
    },
  },
}

export function setup() {
  return commonTestSetup();
}

export default function (superAdminAuthToken) {
  superAdminOperations(superAdminAuthToken);
}
import { superAdminOperations } from "../../roles/superAdmin.js";
import { commonTestSetup } from "../../common/testSetup.js";

export const options = {
  vus: 10,
  iterations: 10,
  ext: {
    loadimpact: {
      name: '10 Virtual Users Test',
    },
  },
}

export function setup() {
  return commonTestSetup();
}

export default function (superAdminAuthToken) {
  superAdminOperations(superAdminAuthToken);
}
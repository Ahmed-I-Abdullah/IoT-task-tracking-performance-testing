import { superAdminOperations } from "../../roles/superAdmin.js";
import { commonTestSetup } from "../../common/testSetup.js";

export const options = {
  vus: 30,
  iterations: 30,
  ext: {
    loadimpact: {
      name: "30 Virtual User Database Test",
    },
  },
};

export function setup() {
  return commonTestSetup();
}

export default function (superAdminAuthToken) {
  superAdminOperations(superAdminAuthToken);
}

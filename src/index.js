import { describe, expect } from "./util/chaiExpect.js";
import { login, confirmRegister } from "./util/authentication.js";
import { createSuperAdmin } from "./models/user.js";
import { superAdminOperations } from "./roles/superAdmin.js";

// Constants for super admin registration
const SUPER_ADMIN_INFO = {
  email: "superadmin@test.com",
  password: "verySecure",
  firstName: "Super",
  middleName: "Admin",
  lastName: "Test",
};

// Function to set up the environment
export function setup() {
  let authToken = "";

  // Set up the super admin user
  describe(`Setup - Create and authenticate super admin ${SUPER_ADMIN_INFO.email}`, () => {
    // Create super admin if not already registered
    const { registerationToken, isRegistered } = createSuperAdmin(
      null,
      SUPER_ADMIN_INFO.email
    );
    if (!isRegistered) {
      describe("Confrim registeration for super admin", () => {
        confirmRegister(
          registerationToken,
          SUPER_ADMIN_INFO.firstName,
          SUPER_ADMIN_INFO.middleName,
          SUPER_ADMIN_INFO.lastName,
          SUPER_ADMIN_INFO.password
        );
      });
    }

    // Login the super admin user
    describe("Login Super Admin", () => {
      authToken = login(SUPER_ADMIN_INFO.email, SUPER_ADMIN_INFO.password);
    });
  });

  return authToken;
}


export default function runAllRoles(superAdminAuthToken) {
    superAdminOperations(superAdminAuthToken);
}


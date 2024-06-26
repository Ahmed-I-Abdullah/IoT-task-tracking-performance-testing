import { describe } from "../util/chaiExpect.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import { createSuperAdmin } from "../models/user.js";
import { confirmRegister, login } from "../util/authentication.js";

// Constants for super admin registration
const SUPER_ADMIN_INFO = {
  email: `superadmin${randomIntBetween(1, 100000)}@test.com`,
  password: "verySecure",
  firstName: "Super",
  middleName: "Admin",
  lastName: "Test",
};

// Function to set up the environment
export function commonTestSetup() {
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

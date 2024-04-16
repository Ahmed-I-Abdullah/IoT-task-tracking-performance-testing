import { describe, expect } from "../util/chaiExpect.js";
import {
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  getAllOrganizations,
} from "../models/organization.js";
import { login, confirmRegister } from "../util/authentication.js";
import {
  createOrganizationAdmin,
  deleteOrganizationAdmin,
} from "../models/user.js";
import { organizationAdminOperations } from "./organizationAdmin.js";


// Constants for organization admin registration
const ORGANIZATION_ADMIN_INFO = {
  email: "orgAdmin@test.com",
  password: "veryVerySecure",
  firstName: "Org",
  middleName: "Admin",
  lastName: "Test",
};


// Function to perform super admin operations
export function superAdminOperations(authToken) {
  describe("Super admin CRUD operations on organizations", () => {
    let organizationId = "";
    let orgAdminId = "";

    const ORGANIZATION_PAYLOAD = {
      name: "Ahmed's Corp",
      streetAddress: "1564 Burdett Avenue",
      city: "Terrace",
      province: "British Columbia",
      country: "Canada",
      postalCode: "V8G 1S2",
    };

    // Create a new organization
    describe("Create a new organization", () => {
      organizationId = createOrganization(authToken, ORGANIZATION_PAYLOAD);
    });

    // Get the created organization
    describe("Get the created organization", () => {
      getOrganization(authToken, organizationId);
    });

    // Update the organization
    describe("Update the organization", () => {
      const UPDATED_PAYLOAD = {
        name: `Updated Organization Name`,
      };
      updateOrganization(authToken, organizationId, UPDATED_PAYLOAD);
    });

    // List all available organizations
    describe("Get all organizations", () => {
      getAllOrganizations(authToken);
    });

    // Create an admin for the organization
    describe("Create organization admin", () => {
      const { userId, registerationToken, isRegistered } =
        createOrganizationAdmin(
          authToken,
          ORGANIZATION_ADMIN_INFO.email,
          organizationId
        );
      orgAdminId = userId;

      if (!isRegistered) {
        describe("Register organization admin", () => {
          confirmRegister(
            registerationToken,
            ORGANIZATION_ADMIN_INFO.firstName,
            ORGANIZATION_ADMIN_INFO.middleName,
            ORGANIZATION_ADMIN_INFO.lastName,
            ORGANIZATION_ADMIN_INFO.password
          );
        });
      }

      // Login the organization admin
      describe("Login organization admin", () => {
        const orgAdminAuthToken = login(
          ORGANIZATION_ADMIN_INFO.email,
          ORGANIZATION_ADMIN_INFO.password
        );

        organizationAdminOperations(orgAdminAuthToken, organizationId);
      });
    });

    // Delete the organization admin
    describe("Delete organization admin", () => {
      deleteOrganizationAdmin(authToken, organizationId, orgAdminId);
    });

    // Delete the organization
    describe("Delete the organization", () => {
      deleteOrganization(authToken, organizationId);
    });
  });
}

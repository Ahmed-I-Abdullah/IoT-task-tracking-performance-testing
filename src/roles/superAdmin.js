import { describe, expect } from "../util/chaiExpect.js";
import {
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  getAllOrganizations,
} from "../models/organization.js";
import { login, registerUser } from "../util/authentication.js";
import { createOrganizationAdmin, createSuperAdmin, deleteOrganizationAdmin } from "../models/user.js";

// Constants for super admin registration
const EMAIL = "superadmin@test.com";
const PASSWORD = "verySecure";
const USER_FIRST_NAME = "Super";
const USER_MIDDLE_NAME = "Admin";
const USER_LAST_NAME = "Test";

// Function to set up the environment
export function setup() {
  let authToken = "";

  // Set up the super admin user
  describe(`Setup - Create and authenticate super admin ${EMAIL}`, () => {
    // Create super admin if not already registered
    const { registerationToken, isRegistered } = createSuperAdmin(null, EMAIL);
    if (!isRegistered) {
      describe("Register a new User", () => {
        registerUser(
          registerationToken,
          USER_FIRST_NAME,
          USER_MIDDLE_NAME,
          USER_LAST_NAME,
          PASSWORD
        );
      });
    }

    // Login the super admin user
    describe("Login User", () => {
      authToken = login(EMAIL, PASSWORD);
    });
  });

  return authToken;
}

// Function to perform super admin operations
export default function superAdminOperations(authToken) {
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
      const { userId } = createOrganizationAdmin(
        authToken,
        "orgAdmin@test.com",
        organizationId
      );
      orgAdminId = userId;
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

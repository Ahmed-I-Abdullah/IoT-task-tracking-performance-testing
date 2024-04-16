import { describe, expect } from "../util/chaiExpect.js";
import {
  createClinic,
  deleteClinic,
  getClinic,
  getOrganizationClinics,
  updateClinic,
} from "../models/clinic.js";
import {
  createOrganizationTask,
  deleteOrganizationTask,
  getOrganizationTasks,
} from "../models/task.js";
import {
  createClinicAdmin,
  deleteClinicAdmin,
  getClinicAdmins,
} from "../models/user.js";
import { login, confirmRegister } from "../util/authentication.js";
import { clinicAdminOperations } from "./clinicAdmin.js";

// Information about the clinic admin
const CLINIC_ADMIN_INFO = {
  email: "clinicAdmin@test.com",
  password: "veryVerySecure",
  firstName: "Clinic",
  middleName: "Admin",
  lastName: "Test",
};

/**
 * Perform various operations specific to an organization administrator.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 */
export function organizationAdminOperations(authToken, organizationId) {
  // Variables to store IDs
  let clinicId = "";
  let orgTaskId = "";
  let clinicAdminId = "";

  const CLINIC_PAYLOAD = {
    name: "Ahmed's Clinic",
    streetAddress: "592 Riedel Street",
    city: "Fort Mcmurray",
    province: "Alberta",
    country: "Canada",
    postalCode: "T9H 3J9",
  };

  // Create a new clinic within the organization
  describe(`Create a new clinic within organization ${organizationId}`, () => {
    clinicId = createClinic(authToken, organizationId, CLINIC_PAYLOAD);
  });

  // Get the created clinic
  describe("Get the created clinic", () => {
    getClinic(authToken, organizationId, clinicId);
  });

  // Update the clinic
  describe("Update the clinic", () => {
    const UPDATED_PAYLOAD = {
      name: `Updated Clinic Name`,
    };
    updateClinic(authToken, organizationId, clinicId, UPDATED_PAYLOAD);
  });

  // Get all clinics in the organization
  describe("Get all clinics in organization", () => {
    getOrganizationClinics(authToken, organizationId);
  });

  // Create organization task
  describe("Create organization task", () => {
    const ORG_TASK_PAYLOAD = {
      name: "Hand Washing",
      description: "This is a nice description!",
    };
    orgTaskId = createOrganizationTask(
      authToken,
      organizationId,
      ORG_TASK_PAYLOAD
    );
  });

  // List organization tasks
  describe("List organization tasks", () => {
    getOrganizationTasks(authToken, organizationId);
  });

  // Delete created organization task
  describe("Delete created organization task", () => {
    deleteOrganizationTask(authToken, organizationId, orgTaskId);
  });

  // Create clinic admin
  describe("Create clinic admin", () => {
    const { userId, registerationToken, isRegistered } = createClinicAdmin(
      authToken,
      CLINIC_ADMIN_INFO.email,
      organizationId,
      clinicId
    );
    clinicAdminId = userId;

    if (!isRegistered) {
      // Confirm registration if not already registered
      describe("Register organization admin", () => {
        confirmRegister(
          registerationToken,
          CLINIC_ADMIN_INFO.firstName,
          CLINIC_ADMIN_INFO.middleName,
          CLINIC_ADMIN_INFO.lastName,
          CLINIC_ADMIN_INFO.password
        );
      });
    }

    // Login the clinic admin
    describe("Login clinic admin", () => {
      const clinicAdminAuthToken = login(
        CLINIC_ADMIN_INFO.email,
        CLINIC_ADMIN_INFO.password
      );

      clinicAdminOperations(clinicAdminAuthToken, organizationId, clinicId)
    });
  });

  // Get clinic admins for clinic
  describe(`Get clinic admins for clinic ${clinicId}`, () => {
    getClinicAdmins(authToken, organizationId, clinicId);
  });

  // Delete clinic admin
  describe("Delete clinic admin", () => {
    deleteClinicAdmin(authToken, organizationId, clinicId, clinicAdminId);
  });

  // Delete the clinic
  describe(`Delete the clinic ${clinicId}`, () => {
    deleteClinic(authToken, organizationId, clinicId);
  });
}

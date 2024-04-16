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
import { createClinicAdmin, deleteClinicAdmin, getClinicAdmins } from "../models/user.js";
import { login, confirmRegister } from "../util/authentication.js";

const CLINIC_ADMIN_INFO = {
  email: "clinicAdmin@test.com",
  password: "veryVerySecure",
  firstName: "Clinic",
  middleName: "Admin",
  lastName: "Test",
};


export function organizationAdminOperations(authToken, organizationId) {
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

  describe(`Create a new clinic within organization ${organizationId}`, () => {
    clinicId = createClinic(authToken, organizationId, CLINIC_PAYLOAD);
  });

  describe("Get the created clinic", () => {
    getClinic(authToken, organizationId, clinicId);
  });

  describe("Update the clinic", () => {
    const UPDATED_PAYLOAD = {
      name: `Updated Clinic Name`,
    };
    updateClinic(authToken, organizationId, clinicId, UPDATED_PAYLOAD);
  });

  describe("Get all clinics in organization", () => {
    getOrganizationClinics(authToken, organizationId);
  });

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

  describe("List organization tasks", () => {
    getOrganizationTasks(authToken, organizationId);
  });

  describe("Delete created organization task", () => {
    deleteOrganizationTask(authToken, organizationId, orgTaskId);
  });


  describe("Create clinic admin", () => {
    const { userId, registerationToken, isRegistered } =
      createClinicAdmin(authToken, CLINIC_ADMIN_INFO.email, organizationId, clinicId)
    clinicAdminId = userId;

    if (!isRegistered) {
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

    // Login the organization admin
    describe("Login clinic admin", () => {
      const orgAdminAuthToken = login(
        CLINIC_ADMIN_INFO.email,
        CLINIC_ADMIN_INFO.password
      );

      // TODO: 
     // Call clinic admin scripts here
    });
  });

  describe(`Get clinic admins for clinic ${clinicId}`, () => {
    getClinicAdmins(authToken, organizationId, clinicId);
  });


  describe("Delete clinic admin", () => {
    deleteClinicAdmin(authToken, organizationId, clinicId, clinicAdminId);
  });


  describe(`Delete the clinic ${clinicId}`, () => {
    deleteClinic(authToken, organizationId, clinicId);
  });
}

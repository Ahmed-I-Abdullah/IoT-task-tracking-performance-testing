import { describe } from "../util/chaiExpect.js";
import {
  createClinicTask,
  createTaskEntry,
  deleteClinicTask,
  deleteTaskEntry,
  getClinicianPerformance,
  getTaskEntries,
} from "../models/task.js";

// Information about the clinic admin
const CLINICIAN_INFO = {
  email: "clinician123@test.com",
  password: "veryVerySecure",
  firstName: "Clinician",
  middleName: "",
  lastName: "Test",
};

/**
 * Perform various operations specific to a clinic administrator.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 * @param {string} clinicianId - The ID of the clinician.
 * @param {string} taskId - The ID of the task created.
 */
export function clinicianOperations(authToken, organizationId, clinicId, clinicianId, taskId, adminAuthToken) {
  // Variables to store IDs
  let taskEntryId = "";

  const MANUAL_TASK_ENTRY_PAYLOAD = {
      userId: clinicianId,
      timestamp: "2024-02-06T07:08:40.148Z" // ISO 8601 formatted timestamp 
  };

  // Create a new clinic task
  describe(`Create a new task for clinician ${clinicianId}`, () => {
    taskEntryId = createTaskEntry(
      authToken,
      organizationId,
      clinicId,
      taskId,
      MANUAL_TASK_ENTRY_PAYLOAD
    );
  });

  // Get the clinician task entries
  describe("Get the clinician task entries", () => {
    getTaskEntries(authToken, organizationId, clinicId, clinicianId);
  });

  // Get clinician performance
  describe("Get all clinic sensors", () => {
    getClinicianPerformance(authToken, organizationId, clinicId, clinicianId);
  });

  // Delete clinician task entry
  describe("Delete clinician task entry", () => {
    deleteTaskEntry(adminAuthToken, organizationId, clinicId, taskEntryId);
  });
}

import { describe, expect } from "../util/chaiExpect.js";
import {
  createClinicTask,
  deleteClinicTask,
  getClinicTasks,
} from "../models/task.js";
import {
  createClinician,
  deleteClinician,
  getClinicians,
} from "../models/user.js";
import { login, confirmRegister } from "../util/authentication.js";
import {
  createClinicSensor,
  deleteClinicSensor,
  getClinicSensorTask,
  getClinicSensors,
} from "../models/sensor.js";

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
 * @param {string} organizationId - The ID of the clinic.
 */
export function clinicAdminOperations(authToken, organizationId, clinicId) {
  // Variables to store IDs
  let clinicianId = "";
  let taskId = "";
  let sensorId = "";

  const CLINIC_TASK_PAYLOAD = {
    name: "Sanitization",
    description: "This is a test",
  };

  // Create a new clinic task
  describe(`Create a new task within a clinic ${clinicId}`, () => {
    taskId = createClinicTask(
      authToken,
      organizationId,
      clinicId,
      CLINIC_TASK_PAYLOAD
    );
  });

  // Get the clinic tasks
  describe("Get the clinic tasks", () => {
    getClinicTasks(authToken, organizationId, clinicId);
  });

  const CLINIC_SENSOR_PAYLOAD = {
    model: "ESP32",
    location: "Room B",
    taskId: taskId,
  };

  // Create a new clinic sensor
  describe(`Create a new sensor within a clinic ${clinicId}`, () => {
    sensorId = createClinicSensor(
      authToken,
      organizationId,
      clinicId,
      CLINIC_SENSOR_PAYLOAD
    );
  });

  // Get all clinic sensors
  describe("Get all clinic sensors", () => {
    getClinicSensors(authToken, organizationId, clinicId);
  });

  // Get clinic sensor task
  describe("Get clinic sensor tasks", () => {
    const testTask = getClinicSensorTask(
      authToken,
      organizationId,
      clinicId,
      sensorId
    );
    expect(testTask).to.equal(taskId);
  });

  // Create clinician
  describe("Create clinician", () => {
    const { userId, registerationToken, isRegistered } = createClinician(
      authToken,
      CLINICIAN_INFO.email,
      organizationId,
      clinicId
    );
    clinicianId = userId;

    if (!isRegistered) {
      // Confirm registration if not already registered
      describe("Register clinician", () => {
        confirmRegister(
          registerationToken,
          CLINICIAN_INFO.firstName,
          CLINICIAN_INFO.middleName,
          CLINICIAN_INFO.lastName,
          CLINICIAN_INFO.password
        );
      });
    }

    // Login the clinician
    describe("Login clinician", () => {
      const clinicianAuthToken = login(
        CLINICIAN_INFO.email,
        CLINICIAN_INFO.password
      );

      // TODO:
      // Call clinic admin scripts here
    });
  });

  // get all clinicians
  describe(`Get the clinicians for clinic ${clinicId}`, () => {
    getClinicians(authToken, organizationId, clinicId);
  });

  // Delete clinic sensor
  describe("Delete clinic sensor", () => {
    deleteClinicSensor(authToken, organizationId, clinicId, sensorId);
  });

  // Delete clinic task
  describe("Delete clinic task", () => {
    deleteClinicTask(authToken, organizationId, clinicId, taskId);
  });

  // Delete the clinician
  describe(`Delete the clinician`, () => {
    deleteClinician(authToken, organizationId, clinicId, clinicianId);
  });
}

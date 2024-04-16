import { describe, expect } from "../util/chaiExpect.js";
import { session } from "../util/session.js";
import { isValidUUID } from "../util/uuidCheck.js";

/**
 * Get all sesnors for a clinic
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 */
export function getClinicSensors(authToken, organizationId, clinicId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.get(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/sensors`
  );

  // Ensure that the resource fetch was successful (HTTP status 200)
  expect(resp.status, "Fetch resource status").to.equal(200);
}

/**
 * Get sensor task for a clinic
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 * @param {string} sensorId - The ID of the sensor.
 */
export function getClinicSensorTask(
  authToken,
  organizationId,
  clinicId,
  sensorId
) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.get(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/sensors/${sensorId}/task`
  );

  // Ensure that the resource fetch was successful (HTTP status 200)
  expect(resp.status, "Fetch resource status").to.equal(200);
  let taskId = resp.json("data.id");
  return taskId;
}

/**
 * Creates a new sensor for a clinic.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 * @param {Object} payload - The payload containing task details.
 * @returns {string} The ID of the created task.
 */
export function createClinicSensor(
  authToken,
  organizationId,
  clinicId,
  payload
) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.post(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/sensors`,
    JSON.stringify(payload)
  );

  // Ensure that the sensor creation was successful (HTTP status 201)
  expect(resp.status, "Sensor creation status").to.equal(201);

  // Ensure that the task ID is a valid UUID
  let sensorId = resp.json("data.id");
  expect(isValidUUID(sensorId), "Sensor task UUID").to.be.true;

  return sensorId;
}

/**
 * Updates a clinic sensor.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization to update.
 * @param {string} clinicId - The ID of the clinic.
 * @param {string} sensorId - The ID of the sensor.
 * @param {Object} payload - The payload containing organization details to update.
 */
export function updateClinicSensor(
  authToken,
  organizationId,
  clinicId,
  sensorId,
  payload
) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.patch(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/sensors/${sensorId}`,
    JSON.stringify(payload)
  );

  // Ensure that the sensor update was successful (HTTP status 200)
  expect(resp.status, "Sensor update status").to.equal(200);

  // Ensure that the Sensor name was updated correctly
  expect(resp.json("data.name"), "Sensor name").to.equal(payload.name);
}

/**
 * Deletes a clinic sensor.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 * @param {string} sensorId - The ID of the sensor.
 */
export function deleteClinicSensor(
  authToken,
  organizationId,
  clinicId,
  sensorId
) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.delete(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/sensors/${sensorId}`
  );

  // Ensure that the task deletion was successful (HTTP status 204)
  expect(resp.status, "Sensor deletion status").to.equal(204);
}

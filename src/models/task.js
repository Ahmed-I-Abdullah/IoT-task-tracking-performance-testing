import { describe, expect } from "../util/chaiExpect.js";
import { session } from "../util/session.js";
import { isValidUUID } from "../util/uuidCheck.js";

/**
 * Get all tasks for an organization
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 */
export function getOrganizationTasks(authToken, organizationId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.get(`/api/v1/organizations/${organizationId}/tasks`);

  // Ensure that the resource fetch was successful (HTTP status 200)
  expect(resp.status, "Fetch resource status").to.equal(200);
}

/**
 * Creates a new task for an organization.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {Object} payload - The payload containing task details.
 * @returns {string} The ID of the created task.
 */
export function createOrganizationTask(authToken, organizationId, payload) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.post(
    `/api/v1/organizations/${organizationId}/tasks`,
    JSON.stringify(payload)
  );

  // Ensure that the organization creation was successful (HTTP status 201)
  expect(resp.status, "Task creation status").to.equal(201);

  // Ensure that the task ID is a valid UUID
  let taskId = resp.json("data.id");
  expect(isValidUUID(taskId), "Valid task UUID").to.be.true;

  return taskId;
}

/**
 * Deletes an Organization Task.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} taskId - The ID of the task to delete.
 */
export function deleteOrganizationTask(authToken, organizationId, taskId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.delete(
    `/api/v1/organizations/${organizationId}/tasks/${taskId}`
  );

  // Ensure that the task deletion was successful (HTTP status 204)
  expect(resp.status, "Task deletion status").to.equal(204);
}

/**
 * Get all tasks for a clinic
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 */
export function getClinicTasks(authToken, organizationId, clinicId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.get(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/tasks`
  );

  // Ensure that the resource fetch was successful (HTTP status 200)
  expect(resp.status, "Fetch resource status").to.equal(200);
}

/**
 * Deletes a clinic Task.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} taskId - The ID of the task to delete.
 */
export function deleteClinicTask(authToken, organizationId, clinicId, taskId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.delete(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/tasks/${taskId}`
  );

  // Ensure that the task deletion was successful (HTTP status 204)
  expect(resp.status, "Task deletion status").to.equal(204);
}

/**
 * Creates a new clinic task.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 * @param {Object} payload - The payload containing task details.
 * @returns {string} The ID of the created task.
 */
export function createClinicTask(authToken, organizationId, clinicId, payload) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.post(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/tasks`,
    JSON.stringify(payload)
  );
  // Ensure that the task creation was successful (HTTP status 201)
  expect(resp.status, "Task creation status").to.equal(201);

  // Ensure that the task ID is a valid UUID
  let taskId = resp.json("data.id");
  expect(isValidUUID(taskId), "Valid task UUID").to.be.true;

  return taskId;
}

/**
 * Get all tasks entries for a clinician
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 * @param {string} clinicianId - The ID of the clinician.
 */
export function getTaskEntries(authToken, organizationId, clinicId, clinicianId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.get(`/api/v1/organizations/${organizationId}/clinics/${clinicId}/clinicians/${clinicianId}/tasks/entries`);

  // Ensure that the resource fetch was successful (HTTP status 200)
  expect(resp.status, "Fetch resource status").to.equal(200);
}

/**
 * Creates a new task entry.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 * @param {string} taskId - The ID of the task.
 * @param {Object} payload - The payload containing task details.
 * @returns {string} The ID of the created task entry.
 */
export function createTaskEntry(authToken, organizationId, clinicId, taskId, payload) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.post(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/tasks/${taskId}/entries`,
    JSON.stringify(payload)
  );
  // Ensure that the task creation was successful (HTTP status 201)
  expect(resp.status, "Task creation status").to.equal(201);

  // Ensure that the task ID is a valid UUID
  let taskEntryId = resp.json("data.id");
  expect(isValidUUID(taskEntryId), "Valid task entry UUID").to.be.true;

  return taskEntryId;
}

/**
 * Deletes a clinic Task entry.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 * @param {string} taskEntryId - The ID of the task entry to delete.
 */
export function deleteTaskEntry(authToken, organizationId, clinicId, taskEntryId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.delete(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/tasks/entries/${taskEntryId}`
  );

  // Ensure that the task deletion was successful (HTTP status 204)
  expect(resp.status, "Task deletion status").to.equal(204);
}

/**
 * Get clinic performance
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 */
export function getClinicPerformance(authToken, organizationId, clinicId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.get(`/api/v1/organizations/${organizationId}/clinics/${clinicId}/performance?startDate=2024-01-01&endDate=2024-04-28&interval=month`);

  // Ensure that the resource fetch was successful (HTTP status 200)
  expect(resp.status, "Fetch resource status").to.equal(200);
}

/**
 * Get clinician performance
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 * @param {string} clinicianId - The ID of the clinician.
 */
export function getClinicianPerformance(authToken, organizationId, clinicId, clinicianId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.get(`/api/v1/organizations/${organizationId}/clinics/${clinicId}/clinicians/${clinicianId}/performance?startDate=2024-01-01&endDate=2024-04-28&interval=month`);

  // Ensure that the resource fetch was successful (HTTP status 200)
  expect(resp.status, "Fetch resource status").to.equal(200);
}
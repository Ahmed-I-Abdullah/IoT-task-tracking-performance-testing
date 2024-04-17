import { describe, expect } from "../util/chaiExpect.js";
import { deafultRequestParams } from "../util/contants.js";
import { session } from "../util/session.js";
import { isValidUUID } from "../util/uuidCheck.js";

/**
 * Creates a new clinic for a specific organization.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization where the clinic will be created.
 * @param {Object} payload - The payload containing clinic details.
 * @returns {string} The ID of the created clinic.
 */
export function createClinic(authToken, organizationId, payload) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.post(
    `/api/v1/organizations/${organizationId}/clinics`,
    JSON.stringify(payload),
    deafultRequestParams
  );

  // Ensure that the clinic creation was successful (HTTP status 201)
  expect(resp.status, "Clinic creation status").to.equal(201);

  // Ensure that the clinic ID is a valid UUID
  const clinicId = resp.json("data.id");
  expect(isValidUUID(clinicId), "Valid clinic UUID").to.be.true;

  return clinicId;
}

/**
 * Retrieves a specific clinic.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic to retrieve.
 * @returns {Object} The clinic details.
 */
export function getClinic(authToken, organizationId, clinicId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.get(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}`,
    null,
    deafultRequestParams
  );

  expect(resp.status, "Fetch clinic status").to.equal(200);

  // Return the clinic details
  return resp.json("data");
}

/**
 * Updates an existing clinic for a specific organization.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization to which the clinic belongs.
 * @param {string} clinicId - The ID of the clinic to update.
 * @param {Object} payload - The payload containing updated clinic details.
 */
export function updateClinic(authToken, organizationId, clinicId, payload) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.patch(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}`,
    JSON.stringify(payload),
    deafultRequestParams
  );

  // Ensure that the clinic update was successful (HTTP status 200)
  expect(resp.status, "Clinic update status").to.equal(200);
}

/**
 * Deletes an existing clinic from a specific organization.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization from which the clinic will be deleted.
 * @param {string} clinicId - The ID of the clinic to delete.
 */
export function deleteClinic(authToken, organizationId, clinicId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.delete(
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}`,
    null,
    deafultRequestParams
  );

  // Ensure that the clinic deletion was successful (HTTP status 204)
  expect(resp.status, "Clinic deletion status").to.equal(200);
}

/**
 * Retrieves all clinics for a specific organization.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @returns {Array} An array of clinic details.
 */
export function getOrganizationClinics(authToken, organizationId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.get(
    `/api/v1/organizations/${organizationId}/clinics`,
    null,
    deafultRequestParams
  );

  // Ensure that the fetch was successful (HTTP status 200)
  expect(resp.status).to.equal(200, "Fetch organization clinics status");

  // Ensure that the response body is a valid JSON
  expect(resp).to.have.validJsonBody();

  // Ensure that clinic records is an array
  const clinicRecords = resp.json("data.records");
  expect(clinicRecords).to.be.an("array", "Clinic records");

  // Return the array of clinic details
  return clinicRecords;
}

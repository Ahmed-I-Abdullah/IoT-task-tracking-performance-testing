import { describe, expect } from "../util/chaiExpect.js";
import { deafultRequestParams } from "../util/contants.js";
import { session } from "../util/session.js";
import { isValidUUID } from "../util/uuidCheck.js";

/**
 * Creates a new organization.
 * @param {string} authToken - The authentication token.
 * @param {Object} payload - The payload containing organization details.
 * @returns {string} The ID of the created organization.
 */
export function createOrganization(authToken, payload) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.post(
    `/api/v1/organizations`,
    JSON.stringify(payload),
    deafultRequestParams
  );

  // Ensure that the organization creation was successful (HTTP status 201)
  expect(resp.status, "Organization creation status").to.equal(201);

  // Ensure that the organization ID is a valid UUID
  let organizationId = resp.json("data.id");
  expect(isValidUUID(organizationId), "Valid organization UUID").to.be.true;

  return organizationId;
}

/**
 * Retrieves an organization.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization to retrieve.
 */
export function getOrganization(authToken, organizationId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.get(
    `/api/v1/organizations/${organizationId}`,
    null,
    deafultRequestParams
  );

  // Ensure that the resource fetch was successful (HTTP status 200)
  expect(resp.status, "Fetch resource status").to.equal(200);
}

/**
 * Updates an organization.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization to update.
 * @param {Object} payload - The payload containing organization details to update.
 */
export function updateOrganization(authToken, organizationId, payload) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.patch(
    `/api/v1/organizations/${organizationId}`,
    JSON.stringify(payload),
    deafultRequestParams
  );

  // Ensure that the organization update was successful (HTTP status 200)
  expect(resp.status, "Organization update status").to.equal(200);

  // Ensure that the organization name was updated correctly
  expect(resp.json("data.name"), "Organization name").to.equal(payload.name);
}

/**
 * Deletes an organization.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization to delete.
 */
export function deleteOrganization(authToken, organizationId) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.delete(
    `/api/v1/organizations/${organizationId}`,
    null,
    deafultRequestParams
  );

  // Ensure that the organization deletion was successful (HTTP status 204)
  expect(resp.status, "Organization deletion status").to.equal(204);
}

/**
 * Retrieves all organizations.
 * @param {string} authToken - The authentication token.
 */
export function getAllOrganizations(authToken) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.get("/api/v1/organizations",null, deafultRequestParams);

  // Ensure that the resource fetch was successful (HTTP status 200)
  expect(resp.status, "Fetch resource status").to.equal(200);
}

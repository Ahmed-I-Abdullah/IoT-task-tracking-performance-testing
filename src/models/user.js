import { session } from "../util/session.js";
import { describe, expect } from "../util/chaiExpect.js";
import { isValidUUID } from "../util/uuidCheck.js";

/**
 * Creates a user with the provided email.
 * @param {string} authToken - The authentication token.
 * @param {string} endpoint - The API endpoint for user creation.
 * @param {string} email - The email of the user to be created.
 * @returns {Object} An object containing the userId, registration token, and registration status.
 */
export function createUser(authToken, endpoint, email) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.post(
    endpoint,
    JSON.stringify({
      email: email,
    })
  );

  // Ensure that the user creation was successful (HTTP status 201)
  expect(resp.status, "User creation status").to.equal(201);
  expect(resp, "User creation valid JSON response").to.have.validJsonBody();

  // Ensure that the registration token is a string
  const registerationToken =
    resp.json("data.registrationToken") ||
    resp.json("data.user.registrationToken");
  expect(registerationToken, "Registration token").to.be.a("string");

  // Ensure that the registration status is a boolean
  const isRegistered =
    resp.json("data.isRegistered") || resp.json("data.user.isRegistered");
  expect(isRegistered, "isRegistered").to.be.a("boolean");

  // Ensure that the user ID is a valid UUID
  const userId = resp.json("data.id") || resp.json("data.user.id");
  expect(isValidUUID(userId), "Valid user UUID").to.be.true;

  return { userId, registerationToken, isRegistered };
}

/**
 * Deletes a user.
 * @param {string} authToken - The authentication token.
 * @param {string} endpoint - The API endpoint for user deletion.
 */
export function deleteUser(authToken, endpoint) {
  session.addHeader("Authorization", `Bearer ${authToken}`);
  const resp = session.delete(endpoint);

  // Ensure that the user deletion was successful (HTTP status 204)
  expect(resp.status, "User deletion status").to.equal(204);
}

/**
 * Creates a super admin with the provided email.
 * @param {string} authToken - The authentication token.
 * @param {string} email - The email of the super admin to be created.
 * @returns {Object} An object containing the userId, registration token, and registration status.
 */
export function createSuperAdmin(authToken, email) {
  return createUser(authToken, "/api/v1/super_admins", email);
}

/**
 * Creates an organization admin with the provided email and organization ID.
 * @param {string} authToken - The authentication token.
 * @param {string} email - The email of the organization admin to be created.
 * @param {string} organizationId - The ID of the organization.
 * @returns {Object} An object containing the userId, registration token, and registration status.
 */
export function createOrganizationAdmin(authToken, email, organizationId) {
  return createUser(
    authToken,
    `/api/v1/organizations/${organizationId}/admins`,
    email
  );
}

/**
 * Deletes an organization admin with the provided authentication token, organization ID, and user ID.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} userId - The ID of the user to be deleted.
 */
export function deleteOrganizationAdmin(authToken, organizationId, userId) {
  return deleteUser(
    authToken,
    `/api/v1/organizations/${organizationId}/admins/${userId}`
  );
}

/**
 * Creates a clinic admin with the provided email and clinic ID.
 * @param {string} authToken - The authentication token.
 * @param {string} email - The email of the clinic admin to be created.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 * @returns {Object} An object containing the userId, registration token, and registration status.
 */
export function createClinicAdmin(authToken, email, organizationId, clinicId) {
  return createUser(
    authToken,
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/admins`,
    email
  );
}

/**
 * Deletes a clinic admin with the provided authentication token, organization ID, clinic ID, and user ID.
 * @param {string} authToken - The authentication token.
 * @param {string} organizationId - The ID of the organization.
 * @param {string} clinicId - The ID of the clinic.
 * @param {string} userId - The ID of the user to be deleted.
 */
export function deleteClinicAdmin(authToken, organizationId, clinicId, userId) {
  return deleteUser(
    authToken,
    `/api/v1/organizations/${organizationId}/clinics/${clinicId}/admins/${userId}`
  );
}

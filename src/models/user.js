import { session } from "../util/session.js";
import { describe, expect } from '../util/chaiExpect.js';

/**
 * Creates a super admin with the provided email.
 * @param {string} email - The email of the super admin to be created.
 * @returns {Object} An object containing the registration token and registration status.
 */
export function createSuperAdmin(email) {
  // Send a POST request to create a super admin
  const resp = session.post(
    `/api/v1/super_admins`,
    JSON.stringify({
      email: email,
    })
  );

  // Ensure that the user creation was successful (HTTP status 201)
  expect(resp.status, "User creation status").to.equal(201);
  // Ensure that the response body is a valid JSON
  expect(resp, "User creation valid json response").to.have.validJsonBody();

  // Ensure that the registration token is a string
  const registerationToken = resp.json("data.registrationToken");
  expect(registerationToken, "Registration token").to.be.a("string");

  //  Ensure that the registration status is a boolean
  const isRegistered = resp.json("data.isRegistered");
  expect(isRegistered, "isRegistered").to.be.a("boolean");

  return { registerationToken, isRegistered };
}

import { describe, expect } from "../util/chaiExpect.js";
import { deafultRequestParams } from "./contants.js";
import { session } from "./session.js";

/**
 * Logs in a user with the provided email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {string} The authentication token.
 */
export function login(email, password) {
  const resp = session.post(
    `/api/v1/auth/login`,
    JSON.stringify({
      email: email,
      password: password,
      deviceId: "1",
    }),
    deafultRequestParams
  );

  // Ensure that the login was successful (HTTP status 200)
  expect(resp.status, "Login status").to.equal(200);

  // Ensure that the authentication token is a string
  const authToken = resp.cookies.accessToken[0].value;
  expect(authToken, "Authentication token").to.be.a("string");

  return authToken;
}

/**
 * Confirms user registration with the provided registration token and user details.
 * @param {string} registerationToken - The registration token.
 * @param {string} firstName - The first name of the user.
 * @param {string} middleName - The middle name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} password - The password of the user.
 */
export function confirmRegister(
  registerationToken,
  firstName,
  middleName,
  lastName,
  password
) {
  const resp = session.post(
    `/api/v1/users/confirm`,
    JSON.stringify({
      registrationToken: registerationToken,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      password: password,
    }),
    deafultRequestParams
  );

  // Ensure that the registration confirmation was successful (HTTP status 200)
  expect(resp.status, "Confirm registration status").to.equal(200);
}

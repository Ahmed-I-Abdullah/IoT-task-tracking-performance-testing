import { describe, expect } from "../util/chaiExpect.js";
import { session } from "./session.js";

export function login(email, password) {
  const resp = session.post(
    `/api/v1/auth/login`,
    JSON.stringify({
      email: email,
      password: password,
      deviceId: "1",
    })
  );

  expect(resp.status, "Login status").to.equal(200);

  const authToken = resp.cookies.accessToken[0].value;
  expect(authToken, "Authentication token").to.be.a("string");

  session.addHeader("Authorization", `Bearer ${authToken}`);

  return authToken;
}

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
    })
  );

  expect(resp.status, "Confirm registration status").to.equal(200);
}

import { session } from "../util/session.js";
import { describe, expect } from '../util/chaiExpect.js';

export function createSuperAdmin(email) {
  const resp = session.post(
    `/api/v1/super_admins`,
    JSON.stringify({
      email: email,
    })
  );

  expect(resp.status, "User creation status").to.equal(201);
  expect(resp, "User creation valid json response").to.have.validJsonBody();

  const registerationToken = resp.json("data.registrationToken");
  expect(registerationToken, "Registration token").to.be.a("string");

  const isRegistered = resp.json("data.isRegistered");
  expect(isRegistered, "isRegistered").to.be.a("boolean");

  return { registerationToken, isRegistered };
}

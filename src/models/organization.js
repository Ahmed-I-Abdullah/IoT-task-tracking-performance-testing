import { describe, expect } from '../util/chaiExpect.js';
import { session } from '../util/session.js';
import { isValidUUID } from '../util/uuidCheck.js';

export function createOrganization(authToken, payload) {
  session.addHeader('Authorization', `Bearer ${authToken}`);
  const resp = session.post(`/api/v1/organizations`, JSON.stringify(payload));

  expect(resp.status, 'Organization creation status').to.equal(201);
  let organizationId = resp.json('data.id');
  expect(isValidUUID(organizationId), 'Valid organization UUID').to.be.true;

  return organizationId;
}

export function getOrganization(authToken, organizationId) {
  session.addHeader('Authorization', `Bearer ${authToken}`);
  const resp = session.get(`/api/v1/organizations/${organizationId}`);

  expect(resp.status, 'Fetch resource status').to.equal(200);
}

export function updateOrganization(authToken, organizationId, payload) {
  session.addHeader('Authorization', `Bearer ${authToken}`);
  const resp = session.patch(`/api/v1/organizations/${organizationId}`, JSON.stringify(payload));

  expect(resp.status, 'Organization update status').to.equal(200);
  expect(resp.json('data.name'), 'Organization name').to.equal(payload.name);
}

export function deleteOrganization(authToken, organizationId) {
  session.addHeader('Authorization', `Bearer ${authToken}`);
  const resp = session.delete(`/api/v1/organizations/${organizationId}`);

  expect(resp.status, 'Organization deletion status').to.equal(204);
}
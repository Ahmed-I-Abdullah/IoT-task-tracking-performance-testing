import { describe, expect } from "../util/chaiExpect.js";
import {
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  getAllOrganizations,
} from "../models/organization.js";
import { login, registerUser } from "../util/authentication.js";
import {
  createOrganizationAdmin,
  createSuperAdmin,
  deleteOrganizationAdmin,
} from "../models/user.js";
import { createClinic, deleteClinic } from "../models/clinic.js";

export function organizationAdminOperations(authToken, organizationId) {
  let clinicId = "";
  let clinicAdminId = "";

  const CLINIC_PAYLOAD = {
    name: "Ahmed's Clinic",
    streetAddress: "592 Riedel Street",
    city: "Fort Mcmurray",
    province: "Alberta",
    country: "Canada",
    postalCode: "T9H 3J9",
  };

  describe(`Create a new clinic within organization ${organizationId}`, () => {
    clinicId = createClinic(authToken, organizationId, CLINIC_PAYLOAD);
  });

  describe(`Delete the clinic ${clinicId}`, () => {
    deleteClinic(authToken, organizationId, clinicId)
  });
}

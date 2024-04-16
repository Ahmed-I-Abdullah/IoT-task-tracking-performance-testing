import { describe, expect } from '../util/chaiExpect.js'
import { createOrganization, getOrganization, updateOrganization, deleteOrganization } from '../models/organization.js'
import { login, registerUser } from '../util/authentication.js'
import { createSuperAdmin } from '../models/user.js'

const EMAIL = "superadmin@test.com"
const PASSWORD = "verySecure"
const USER_FIRST_NAME = "Super"
const USER_MIDDLE_NAME = "Admin"
const USER_LAST_NAME = "Test"

export function setup() {
    let authToken = '';
    describe(`Setup - Create and authenticate super admin ${EMAIL}`, () => {
        const {registerationToken, isRegistered} = createSuperAdmin(EMAIL);

        if (!isRegistered) {
            describe('Register a new User', () => {
                registerUser(registerationToken, USER_FIRST_NAME, USER_MIDDLE_NAME, USER_LAST_NAME, PASSWORD)
            })
        }

        describe('Login User', () => {
            authToken = login(EMAIL, PASSWORD)
        });
    })

    return authToken
}

export default function superAdminOperations(authToken) {
    describe('Super admin CRUD operations on organizations', () => {
        const ORGANIZATION_PAYLOAD = {
            name: "Ahmed's Corp",
            streetAddress: '1564 Burdett Avenue',
            city: 'Terrace',
            province: 'British Columbia',
            country: 'Canada',
            postalCode: 'V8G 1S2',
          }
        let organizationId = "";

        describe('Create a new organization', () => {
            organizationId = createOrganization(authToken, ORGANIZATION_PAYLOAD)
        })

        describe('Get the created organization', () => {
            getOrganization(authToken, organizationId)
        })

        describe('Update the organization', () => {
            const UPDATED_PAYLOAD = {
                name: `Updated Organization Name`,
              }
            updateOrganization(authToken, organizationId, UPDATED_PAYLOAD)
        })

        describe('Delete the organization', () => {
            deleteOrganization(authToken, organizationId)
        })
    })
}
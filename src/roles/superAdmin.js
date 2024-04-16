import { describe, expect } from '../util/chaiExpect.js'
import { createOrganization, getOrganization, updateOrganization, deleteOrganization } from '../models/organization.js'
import { login, registerUser } from '../util/authentication.js'
import { createSuperAdmin } from '../models/user.js'

// Constants for super admin registration
const EMAIL = "superadmin@test.com"
const PASSWORD = "verySecure"
const USER_FIRST_NAME = "Super"
const USER_MIDDLE_NAME = "Admin"
const USER_LAST_NAME = "Test"

// Function to set up the environment
export function setup() {
    let authToken = '';

    // Set up the super admin user
    describe(`Setup - Create and authenticate super admin ${EMAIL}`, () => {
        // Create super admin if not already registered
        const {registerationToken, isRegistered} = createSuperAdmin(EMAIL);
        if (!isRegistered) {
            describe('Register a new User', () => {
                registerUser(registerationToken, USER_FIRST_NAME, USER_MIDDLE_NAME, USER_LAST_NAME, PASSWORD)
            })
        }

        // Login the super admin user
        describe('Login User', () => {
            authToken = login(EMAIL, PASSWORD)
        });
    })

    return authToken
}

// Function to perform super admin operations
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

        // Create a new organization
        describe('Create a new organization', () => {
            organizationId = createOrganization(authToken, ORGANIZATION_PAYLOAD)
        })

        // Get the created organization
        describe('Get the created organization', () => {
            getOrganization(authToken, organizationId)
        })

        // Update the organization
        describe('Update the organization', () => {
            const UPDATED_PAYLOAD = {
                name: `Updated Organization Name`,
              }
            updateOrganization(authToken, organizationId, UPDATED_PAYLOAD)
        })

        // Delete the organization
        describe('Delete the organization', () => {
            deleteOrganization(authToken, organizationId)
        })
    })
}

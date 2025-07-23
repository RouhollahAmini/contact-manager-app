import axios from "axios";

const SERVER_URL = "http://localhost:8000";

// @desc Get all contacts
// @route GET https://localhost:9000/contacts
export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

// @desc Get contact by id
// @route GET https://localhost:9000/contacts/:contactId
export const getContactById = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);
}

// @desc Get all groups
// @route GET https://localhost:9000/groups
export const getAllGroups = () => {
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
}

// @desc Get group by id
// @route GET https://localhost:9000/groups/groupId
export const getGroupById = (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
}

// @desc create contact
// @route POST https://localhost:9000/contacts
export const createContact = (contact) => {
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url, contact);
}

// @desc update contact
// @route PUT https://localhost:9000/contacts/:contactId
export const updateContact = (contactId, contact) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url, contact);
}

// @desc delete contact
// @route DELETE https://localhost:9000/contacts/:contactId
export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
}
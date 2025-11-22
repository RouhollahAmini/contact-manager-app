import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";
import db from "./firebaseConfig";
import { formatContactData } from "../helpers/firebaseHelpers";

// @desc Get all contacts
// @route GET from firestore contacts collection
export const getAllContacts = async () => {
  try {
    const contactsCol = collection(db, 'contacts');
    const contactsSnapshot = await getDocs(contactsCol);
    const contactsList = contactsSnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    return { data: contactsList };
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
};

// @desc Get contact by id
// @route GET from firestore contacts collection by id
export const getContactById = async (contactId) => {
  try {
    const contactDoc = doc(db, 'contacts', contactId);
    const contactSnapshot = await getDoc(contactDoc);
    
    if (contactSnapshot.exists()) {
      return { data: { id: contactSnapshot.id, ...contactSnapshot.data() } };
    } else {
      throw new Error("Contact not found");
    }
  } catch (error) {
    console.error("Error fetching contact: ", error);
    throw error;
  }
};

// @desc Get all groups
// @route GET from firestore groups collection
export const getAllGroups = async () => {
  try {
    const groupsCol = collection(db, 'groups');
    const groupsSnapshot = await getDocs(groupsCol);
    const groupsList = groupsSnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    return { data: groupsList };
  } catch (error) {
    console.error("Error fetching groups: ", error);
    throw error;
  }
};

// @desc Get group by id
// @route GET from firestore groups collection by id
export const getGroupById = async (groupId) => {
  try {
    const groupDoc = doc(db, 'groups', groupId);
    const groupSnapshot = await getDoc(groupDoc);
    
    if (groupSnapshot.exists()) {
      return { data: { id: groupSnapshot.id, ...groupSnapshot.data() } };
    } else {
      throw new Error("Group not found");
    }
  } catch (error) {
    console.error("Error fetching group: ", error);
    throw error;
  }
};

// @desc create contact
// @route POST to firestore contacts collection
export const createContact = async (contact) => {
  try {
    // Format contact data for Firestore
    const formattedContact = formatContactData(contact);
    
    const contactsCol = collection(db, 'contacts');
    const docRef = await addDoc(contactsCol, formattedContact);
    const newContact = { id: docRef.id, ...formattedContact };
    return { data: newContact, status: 201 };
  } catch (error) {
    console.error("Error creating contact: ", error);
    throw error;
  }
};

// @desc update contact
// @route PUT to firestore contacts collection by id
export const updateContact = async (contactId, contact) => {
  try {
    // Format contact data for Firestore
    const formattedContact = formatContactData(contact);
    
    const contactDoc = doc(db, 'contacts', contactId);
    await updateDoc(contactDoc, formattedContact);
    const updatedContact = { id: contactId, ...formattedContact };
    return { data: updatedContact, status: 200 };
  } catch (error) {
    console.error("Error updating contact: ", error);
    throw error;
  }
};

// @desc delete contact
// @route DELETE from firestore contacts collection by id
export const deleteContact = async (contactId) => {
  try {
    const contactDoc = doc(db, 'contacts', contactId);
    await deleteDoc(contactDoc);
    return { status: 200 };
  } catch (error) {
    console.error("Error deleting contact: ", error);
    throw error;
  }
};
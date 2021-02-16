#!/usr/bin / env node

import { initializeApp, credential, firestore } from 'firebase-admin';
initializeApp({
  credential: credential.cert(__dirname + '/credentials.json'),
});
const db = firestore();

main();

async function main() {

  // Get User profile
  const userProfile = await getUserProfile('0');
  console.log(userProfile);

  // Get User profile hobbies
  const userProfileHobbies = await getUserProfileHobbies('0');
  console.log(userProfileHobbies);

  // Get User profile cities
  const userProfileCities = await getUserProfileCities('0');
  console.log(userProfileCities);

  // Get User profiles from city
  const userProfilesFromCity = await getUserProfilesFromCity('Countries/226/Cities/1');
  console.log(userProfilesFromCity);

  // Get User profiles from same company
  const userProfilesFromSameCompany = await getUserProfilesFromSameCompany();
  console.log(userProfilesFromSameCompany);
}

const getUserProfile = async (userProfileId: string) => {
  const UserProfileRef = db.collection('UserProfiles');
  return (await UserProfileRef.doc(userProfileId).get()).data();
};

const getUserProfileHobbies = async (userProfileId: string) => {
  const UserProfileRef = db.collection('UserProfiles');
  const data = (await UserProfileRef.doc(userProfileId).get()).data() || { hobbies: [] };
  return data.hobbies;
};

const getUserProfileCities = async (userProfileId: string) => {
  const UserProfileRef = db.collection('UserProfiles');
  const data = (await UserProfileRef.doc(userProfileId).get()).data() || { cities: {} };
  return Object.values(data.cities);
};
const getUserProfilesFromCity = async (city: string) => {
  const UserProfileRef = db.collection('UserProfiles');
  const data = (await UserProfileRef.where('city', '==', city).get());
  return data.docs.map(d => d.data());
};

const getUserProfilesFromSameCompany = async () => {
  const CompanyUsersRef = db.collection('CompanyUsers');
  const data = await CompanyUsersRef.get()
  return data.docs.map(d => d.data());
}
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  videoCollecltionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
};

const {
  endpoint,
  projectId,
  platform,
  databaseId,
  userCollectionId,
  videoCollecltionId,
  storageId,
} = config;
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Appwrite Endpoint
  .setProject(projectId) // project ID
  .setPlatform(platform); // application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    console.log(newUser);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error);
  }
};
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollecltionId);
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};
export const getLatesPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollecltionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

import PocketBase from 'pocketbase';

// Initialize the PocketBase instance using environment variable
const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export default client;

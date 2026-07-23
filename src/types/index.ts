import type { InjectionKey } from 'vue';
import type PocketBase from 'pocketbase';

// PocketBase dependency injection key
export const pocketBaseSymbol: InjectionKey<PocketBase> = Symbol('PBClient');

// Data Types
export interface UserRecord {
  id: string;
  username: string;
  email?: string;
  profile?: {
    id: string;
    username: string;
  };
}

export interface Post {
  id: string;
  title: string;
  content: string;
  user: string;
  userdata?: string;
  created?: string;
  updated?: string;
  expand?: {
    user?: UserRecord;
  };
}

export interface PostPayload {
  title: string;
  content: string;
  user: string;
  userdata?: string;
}

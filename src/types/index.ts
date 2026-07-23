import type { InjectionKey } from 'vue';
import type PocketBase from 'pocketbase';

// PocketBase dependency injection key
export const pocketBaseSymbol: InjectionKey<PocketBase> = Symbol('PBClient');

// Data Types
export interface UserRecord {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export interface Post {
  id: string;
  collectionId?: string;
  collectionName?: string;
  title: string;
  content: string;
  user?: string;
  file?: string;
  created?: string;
  updated?: string;
  expand?: {
    user?: UserRecord;
  };
}

export interface PostPayload {
  title: string;
  content: string;
  user?: string;
  file?: File;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SavedMedia {
  id: string;
  type: 'photo' | 'video';
  blob?: Blob;      // Present for user-uploaded direct media
  src?: string;      // Present for preloaded hardcoded assets
  likes: number;
  order: number;
}

const DB_NAME = 'GNDAGalleryDB_v1';
const STORE_NAME = 'media_items';

export function openGalleryDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    } catch (e) {
      reject(e);
    }
  });
}

export async function saveMediaItem(item: SavedMedia): Promise<void> {
  const db = await openGalleryDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(item);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function saveAllMediaItems(items: SavedMedia[]): Promise<void> {
  const db = await openGalleryDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Clear and put them
    const clearReq = store.clear();
    clearReq.onsuccess = () => {
      if (items.length === 0) {
        resolve();
        return;
      }
      let completed = 0;
      let hasError = false;
      for (const item of items) {
        const req = store.put(item);
        req.onsuccess = () => {
          completed++;
          if (completed === items.length && !hasError) {
            resolve();
          }
        };
        req.onerror = () => {
          if (!hasError) {
            hasError = true;
            reject(req.error);
          }
        };
      }
    };
    clearReq.onerror = () => reject(clearReq.error);
  });
}

export async function getAllMediaItems(): Promise<SavedMedia[]> {
  const db = await openGalleryDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => {
      const results = request.result as SavedMedia[];
      results.sort((a, b) => a.order - b.order);
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function deleteMediaItem(id: string): Promise<void> {
  const db = await openGalleryDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

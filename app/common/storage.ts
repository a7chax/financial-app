import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV({
    id: 'rn-mmkv-storage',
  });

export const setLocalStorage = (key: string, value: string) => {
storage.set(key, value);
};

export const getLocalStorage = (key: string) : string | undefined => {
return storage.getString(key);
};

export const removeLocalStorage = (key: string) => {
storage.delete(key);
};
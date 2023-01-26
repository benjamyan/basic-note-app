/**
 * https://michalzalecki.com/why-using-localStorage-directly-is-a-bad-idea/
 * https://www.npmjs.com/package/storage-factory
 * 
 * The idea here is that if localStorage is not supported, we have a fallback
 * 
 * Regarding security/usage issues - this is a todo app, not enterprise.
 * If I have the time later, I'll address using indexDB or service workers.
 * For the time being, this will do just fine.
 */
const randomStr = (): string=> require('../../utils').randomStr();
const isSupported = (): boolean=> {
    try {
         const key = `__test_${randomStr()}__`;
         localStorage.setItem(key, randomStr());
         localStorage.removeItem(key);
         return true;
    } catch (e) {
         return false;
    }
};

// type StorageFactoryModule = {
//     getItem: ()=> void
// }
export default function storageFactory<Object>() {
    let inMemoryStorage: Record<string, any> = {};
    function getItem(name='') {
        if (isSupported()) {
            return localStorage.getItem(name);
        }
        if (inMemoryStorage.hasOwnProperty(name)) {
            return inMemoryStorage[name];
        }
        return null;
    }
    function removeItem(name='') {
        if (isSupported()) {
            localStorage.removeItem(name);
        } else {
            delete inMemoryStorage[name];
        }
    }
    function setItem(name='', value='') {
        if (isSupported()) {
            localStorage.setItem(name, value);
        } else {
            inMemoryStorage[name] = String(value);
        }
    }
    function clear() {
        if (isSupported()) {
            localStorage.clear();
        } else {
            inMemoryStorage = {};
        }
    }
    function key(index=-1) {
        if (isSupported()) {
            return localStorage.key(index);
        } else {
            return Object.keys(inMemoryStorage)[index] || null;
        }
    }
    function length() {
        if (isSupported()) {
            return localStorage.length;
        } else {
            return Object.keys(inMemoryStorage).length;
        }
    }
    return {
        getItem,
        setItem,
        removeItem,
        clear,
        key,
        get active() {
            if (isSupported()) {
                return localStorage
            } else {
                return inMemoryStorage
            }
        },
        get length() {
            return length();
        }
    };
}
import { IFulfilledNoteContent, IStdNoteContent } from '../../types';
import StorageFactorial from './StorageFactory';
import { randomStr } from '../'
const StorageFactory = StorageFactorial(); 

const localStorageHelperModule = {
    new(value: JSON | string): IFulfilledNoteContent | Error {
        try {
            const valueToStore = (
                typeof value !== 'string' ? JSON.stringify(value): value
            );
            const newNid = randomStr();
            StorageFactory.setItem(newNid, valueToStore);

            const newNoteInStorage = this.exists(newNid)
            if (typeof newNoteInStorage === 'string') {
                return {
                    ...JSON.parse(newNoteInStorage),
                    _nid: newNid
                };
            }
            throw new Error('Unsuccessful storage attempt')
        } catch (err) {
            console.error(err);
            return err instanceof Error ? err : new Error('Unhandled exception.');
        }
    },
    add(key: string, value: JSON | string): boolean | Error {
        try {
            const isKeyPresent = (
                !!this.exists(key) ? true : false
            );
            if (isKeyPresent && this.isDuplicate(key, value)) {
                return false;
            } else {
                const valueToStore = (
                    typeof value !== 'string' ? JSON.stringify(value): value
                );
                StorageFactory.setItem( key, valueToStore );
                return true;
            };
        } catch (err) {
            console.error(err);;
            return err instanceof Error ? err : new Error('Unhandled exception.');
        }
    },
    update(key: string, value: JSON | string): boolean | Error {
        try {
            if (typeof value !== 'string') {
                value = JSON.stringify(value)
            };
            StorageFactory.setItem(key, value);
            return true;
        } catch (err) {
            console.error(err);
            return err instanceof Error ? err : new Error('Unhandled exception.');
        }
    },
    remove(key: string): boolean | Error {
        // console.log("local remove");
        try {
            StorageFactory.removeItem(key);
            return true;
        } catch (err) {
            console.error(err);
            return err instanceof Error ? err : new Error('Unhandled exception.');
        }
    },
    exists(key: string): boolean | string | Error {
        try {
            const localItemByKey = StorageFactory.getItem(key);
            if (!!localItemByKey) {
                return localItemByKey;
            };
            return false;
        } catch (err) {
            console.error(err);
            return err instanceof Error ? err : new Error('Unhandled exception.');
        }
    },
    isDuplicate(key: string, value: JSON | string): boolean | Error {
        try {
            const itemByKey = this.exists(key);
            const valueToCheck: string = (
                typeof value !== 'string' ? JSON.stringify(value): value
            );
            // if (!!itemByKey && itemByKey === valueToCheck) {
            if (!!itemByKey) {
                // if (typeof itemByKey === 'object') {
                    return itemByKey === valueToCheck
                // }
                // return true;
            };
            return false;
            // return Object.values(StorageFactory).every(
            //     value=> value === valueToCheck
            // )
        } catch (err) {
            console.error(err);
            return err instanceof Error ? err : new Error('Unhandled exception.');
        }
    },
    get length(): number {
        return StorageFactory.length
    },
    get localNotes(): Array<IStdNoteContent> | undefined {
        const processNoteForReturn = (key: string): IStdNoteContent=> {
            let noteItem = JSON.parse(
                StorageFactory.getItem(key)
            );
            noteItem._nid = key.split('note_')[1];
            return noteItem
        };
        if (StorageFactory.length > 0) {
            return (
                Object.keys(StorageFactory.active).map(
                    StorageFactoryItem=> {
                        if (StorageFactoryItem.startsWith('note')) {
                            return processNoteForReturn(StorageFactoryItem);
                        } else return false;
                    } 
                ).filter(Boolean)
            ) as Array<IStdNoteContent>;
        } else {
            return undefined
        };
    }
}

export { localStorageHelperModule }

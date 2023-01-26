import randomStr from './generic/randomStr';
import err from './generic/err';
import { localStorageHelperModule } from './storage/localStorage.helpers';
// import StorageFactory from '../../process/utils/StorageFactory';

// const utils = {
// 	err,
// 	randomStr,
// 	// StorageFactory
// }

// export default utils;
export { // this is antipattern
	err,
	randomStr,
	localStorageHelperModule as storage
	// StorageFactory
}
// import { ProcessModule } from "..";
import Storage from "../storage/localStorage.helpers";

export default class UserActions /*extends ProcessModule*/ {
	accountContent = {};
    constructor() {
        // super();
		this.accountContent = {};
    }
	get currentTheme(): string {
		const localTheme = Storage.exists('theme');
		if (!!localTheme && localTheme.length > 1) {
			return localTheme;
		};
		return 'light';
	}
	set currentTheme(givenTheme: string) {
		this.currentTheme = givenTheme;
	}
	async changeTheme(givenTheme: string): Promise<void> {
		console.log('1')
		Storage.add('theme', givenTheme);
		// if (!!this.Token.access) {
		// 	this.Service.user.postMessage({
		// 		type: "PUT",
		// 		props: {
		// 			// _id: 
		// 			theme: givenTheme
		// 		}
		// 	});
		// };
		// this.currentTheme = givenTheme;
	}
	async getUserAccountContent(userId: string) {
		console.log("UserActions getUserAccountContent");
		//
	}
};

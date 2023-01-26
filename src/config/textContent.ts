const navigation = {
	header: {
		logo: "../logo192.png",
		nav: [
			{ text: 'Register/Login' },
			{ text: 'FAQ' }
		]
	},
	footer: {
		logo: "",
		nav: []
	}
}
const views = {
	auth: {
		login: 'Welcome back!',
		register: 'Glad to have ya',
		reset: 'Oops!',
		success: 'Logged in!'
	},
	entry: {
		newUser: {
			h2: "Hello world!",
			p: "A React component is considered pure if it renders the same output for the same state and props. For class components like this, React provides the PureComponent base class."
		},
		welcomeBack: {
			h2: "Welcome back, ##user.name##!",
			p: "You have ##user.noteCount## notes, ##user.notes.urgent## are urgent."
		}
	},
	list: {
		isEmpty: {
			h3: "Nothing to show!",
			p: "Get stated by clicking the button below."
		}
	},
	faq: {}
}
const regexp = {
	email: {
		// re: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g,
		str: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
	},
	password: {
		// re: /[`!@#$%^&*()_+-=\[\]{};':\"\|,.<>/?~]/g,
		str: '[a-zA-Z0-9$%&]{1,}'
	}
}
const notes = {
	empty: {
		time: 'End of Day'
	},
	new: {
		"title": "New note",
		"priority": 4,
		"order": -1
	},
	priority: [
		'High',
		'Med.',
		'Low',
		'None'
	]
}

const content = {
	navigation,
	views,
	regexp,
	notes
};
export {
	notes,
	regexp,
	views,
	navigation
}
export default content;

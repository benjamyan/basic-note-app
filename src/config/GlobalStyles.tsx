import { createGlobalStyle, DefaultTheme } from 'styled-components';

import type { ClientContextState } from '../providers'

export interface ThemeComposition {
    bodyBgColor: string,
    contentBgColor: string,
    navBgColor: string,
    textColor: string,
    opposingTextColor: string,
    urgentTextColor: string,
    borderColor: string,
    listItemBgColor: string,
    buttonBgColor: string
}
// export interface Testttt {
//     [key: Lowercase<ClientContextState['theme']>]: ThemeComposition;
// }
// type xasd = Lowercase<ClientContextState['theme']>
declare module 'styled-components' {
    export interface DefaultTheme {
        // [K in typeof ClientContextState['theme'] as `${K}`]: ThemeComposition;
        // [K in Lowercase<ClientContextState['theme']>]: ThemeComposition;
        // [key: `${Lowercase<ClientContextState['theme']>}`]: ThemeComposition;
        [key: string]: ThemeComposition;
        // light: ThemeComposition;
        // dark: ThemeComposition;

        // bodyBgColor: string,
        // contentBgColor: string,
        // navBgColor: string,
        // textColor: string,
        // opposingTextColor: string,
        // urgentTextColor: string,
        // borderColor: string,
        // listItemBgColor: string,
        // buttonBgColor: string
    }
    // function createGlobalStyle<P extends Lowercase<ClientContextState['theme']>>(): GlobalStyleComponent<P, DefaultTheme>
    // export interface GlobalStyleComponent<P extends { theme?: Lowercase<ClientContextState['theme']> | undefined }, T> extends React.ComponentClass<ThemedGlobalStyledClassProps<P, T>> {}
    // export interface GlobalStyleComponent<P extends { theme?: T | undefined }, T> extends React.ComponentClass<ThemedGlobalStyledClassProps<P, T>> {}

}

const themeStyling: DefaultTheme = {
    light: {
        bodyBgColor: '#fff',
        contentBgColor: '#fff',
        navBgColor: '#ccc',
        textColor: '#000',
        opposingTextColor: '#fff',
        urgentTextColor: '#f80606',
        borderColor: '#000',
        listItemBgColor: '#efefef',
        buttonBgColor: '#dfdfdf'
    },
	dark: {
		bodyBgColor: '#000',
        contentBgColor: '#999',
		navBgColor: '#555',
		textColor: '#fff',
        opposingTextColor: '#000',
        urgentTextColor: '#f80606',
		borderColor: '#fff',
		listItemBgColor: '#777',
		buttonBgColor: '#333'
	}
};

const GlobalStyles = createGlobalStyle<{
    theme: keyof typeof themeStyling 
}>`
    :root {
        ${({ theme }) => `
            --body-bg-color: ${themeStyling[theme].bodyBgColor};
            --content-bg-color: ${themeStyling[theme].contentBgColor};
            --nav-bg-color: ${themeStyling[theme].navBgColor};
            --text-color: ${themeStyling[theme].textColor};
            --opposing-text-color: ${themeStyling[theme].opposingTextColor};
            --urgent-text-color: ${themeStyling[theme].urgentTextColor};
            --border-color: ${themeStyling[theme].borderColor};
            --li-bg-color: ${themeStyling[theme].listItemBgColor};
            --btn-bg-color: ${themeStyling[theme].buttonBgColor};
        `}
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    html {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
        -webkit-font-variant-ligatures: none;
        font-variant-ligatures: none;
    }
    * {
        margin: 0;
        padding: 0;
    }
    *, *:before, *:after {
        -webkit-box-sizing: inherit;
        -moz-box-sizing: inherit;
        box-sizing: inherit;
    }
	::-webkit-input-placeholder,
    ::-moz-placeholder,
    :-ms-input-placeholder,
    :-moz-placeholder {
        color: ${
            ({ theme }) => themeStyling[theme].textColor
		};
    }
	body {
		background-color: ${ 
			({ theme }) => themeStyling[theme].bodyBgColor
		};
	}
    article {
		background-color: ${
            ({ theme }) => themeStyling[theme].contentBgColor
		};
	}
	header, footer, aside, nav, section {
		background-color: ${
			({ theme }) => themeStyling[theme].navBgColor
		};
	}
    h1, h2, h3, h4, h5, h6, p, em, body, html, textarea,
    input, submit, select, option, button, strong, span, b, sup, sub,
    figcaption, blockquote, .rc-time-picker-input {
        color: ${
			({ theme }) => themeStyling[theme].textColor
		};
        padding: 0;
        margin: 0;
        font-family: sans-serif;
        font-kerning: normal;
        text-align: left;
        line-height: 1;
    }
	button, input, textarea, select, .rc-time-picker-input {
		background-color: ${
			({ theme }) => themeStyling[theme].buttonBgColor
		};
	}
    h1 {}
    h2 {}
    h3 {}
    h4 {
        font-size: 14px;
    }
    h5 {
        font-size: 10px;
        font-weight: 600;
    }
    p {
        font-size: 11px;
    }
`;
export {
    GlobalStyles
}

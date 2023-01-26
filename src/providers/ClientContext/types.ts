// export type GActionContext = {
//     type Value = null | 'LOADING' | 'NOTE' | 'AUTH';
//     type SetValue = React.Dispatch<React.SetStateAction<Value>>;
//     type Provider = (
//         ({children}: { 
//             children: React.ReactChildren | JSX.Element | JSX.Element[]
//         })=> React.ChildContextProvider
//     );
//     type Consumer = ()=> React.Consumer;
// }

export type ClientContextState = {
    action: null | 'LOADING' | 'NOTE' | 'AUTH';
    theme: 'LIGHT' | 'DARK';
}

export type ClientContextProviderValue = {
    client: ClientContextState;
    updateClient: (
        <T extends keyof ClientContextState>(
            key: T,
            value: ClientContextState[T]
        )=> void
    );
}

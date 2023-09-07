import { createContext } from 'react';

const createNewContext = (defaultValue) => {
    const context = createContext(defaultValue);
    return [context, context.Provider];
};

const [AuthContext, AuthProvider] = createNewContext();

export {
    AuthContext, AuthProvider
}
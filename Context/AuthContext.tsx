import { Dispatch, SetStateAction, Context, createContext } from 'react';

export interface IAuthContext {
    token: string | null,
    host: string | null,
    setToken: Dispatch<SetStateAction<string>> | null,
    setHost: Dispatch<SetStateAction<string>> | null,
};

export const AuthContext: any = createContext(null);

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type State<T> = [
  T | undefined,
  Dispatch<SetStateAction<T | undefined>>
];

interface Token {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
}

const defaultValue = [undefined, () => undefined];

const TokenContext = createContext(defaultValue as State<Token>);

export const Provider: React.FC = ({ children }) => (
  <TokenContext.Provider value={useState()}>
    {children}
  </TokenContext.Provider>
);

export const useTokenContext = () => useContext(TokenContext);

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

interface Season {
  id: number;
  label: string;
  created_at: string;
  updated_at: string;
}

const defaultValue = [undefined, () => undefined];

const TokenContext = createContext(defaultValue as State<Token>);
const SeasonsContext = createContext(defaultValue as State<Season[]>);
const ActiveSeasonContext = createContext(defaultValue as State<number>);

export const Provider: React.FC = ({ children }) => (
  <TokenContext.Provider value={useState()}>
    <SeasonsContext.Provider value={useState()}>
      <ActiveSeasonContext.Provider value={useState()}>
        {children}
      </ActiveSeasonContext.Provider>
    </SeasonsContext.Provider>
  </TokenContext.Provider>
);

export const useTokenContext = () => useContext(TokenContext);
export const useSeasonsContext = () => useContext(SeasonsContext);
export const useActiveSeasonContext = () => useContext(ActiveSeasonContext);

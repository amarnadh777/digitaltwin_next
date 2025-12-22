'use client';
import { createContext, useContext, useState } from 'react';

const FocusContext = createContext(null);

export function FocusProvider({ children }) {
  const [focusPart, setFocusPart] = useState(null);

  return (
    <FocusContext.Provider value={{ focusPart, setFocusPart }}>
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  return useContext(FocusContext);
}

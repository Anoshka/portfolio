import { createContext, useState, useContext, useEffect } from 'react';

const UnlockContext = createContext();

export function UnlockProvider({ children }) {
  const [unlocked, setUnlocked] = useState(false);

  // Check localStorage on initial load
  useEffect(() => {
    const storedUnlocked = localStorage.getItem('unlocked');
    if (storedUnlocked === 'true') {
      setUnlocked(true);
    }
  }, []);

  const unlockContent = () => {
    setUnlocked(true);
    localStorage.setItem('unlocked', 'true');
  };

  const lockContent = () => {
    setUnlocked(false);
    localStorage.removeItem('unlocked');
  };

  return (
    <UnlockContext.Provider value={{ unlocked, unlockContent, lockContent }}>
      {children}
    </UnlockContext.Provider>
  );
}

export function useUnlock() {
  return useContext(UnlockContext);
}

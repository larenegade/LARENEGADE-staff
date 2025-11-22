import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

const BlockedContext = createContext();

export function BlockedProvider({ children }) {
  const [blockedEmails, setBlockedEmails] = useState({});
  const [blockedPhones, setBlockedPhones] = useState({});
  const [blockedNames, setBlockedNames] = useState({});

  useEffect(() => {
    onValue(ref(db, 'blockedList/email'), (snap) => setBlockedEmails(snap.val() || {}));
    onValue(ref(db, 'blockedList/phone'), (snap) => setBlockedPhones(snap.val() || {}));
    onValue(ref(db, 'blockedList/name'), (snap) => setBlockedNames(snap.val() || {}));
  }, []);

  const isBlocked = (email, phone, firstName, lastName) => {
    if (blockedEmails[email] || blockedPhones[phone] || blockedNames[`${firstName} ${lastName}`]) return true;
    return false;
  };

  return (
    <BlockedContext.Provider value={{ isBlocked, blockedEmails, blockedPhones, blockedNames }}>
      {children}
    </BlockedContext.Provider>
  );
}

export const useBlocked = () => useContext(BlockedContext);

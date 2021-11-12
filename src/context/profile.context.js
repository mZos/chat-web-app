import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;

    const authUnsubscribe = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt } = snap.val();
          const user = {
            name,
            createdAt,
            uid: authObj.uid,
            email: authObj.email,
          };

          setProfile(user);
          setIsLoading(false);
        });
      } else {
        if (userRef) userRef.off();
        setProfile(null);
        setIsLoading(null);
      }
    });

    return () => {
      authUnsubscribe();
      if (userRef) userRef.off();
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}{' '}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
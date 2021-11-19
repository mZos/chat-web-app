/* eslint-disable prefer-const */
import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusRef;
    const authUnsubscribe = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);

        userRef.on('value', snap => {
          let { name, createdAt, avatar } = snap.val();

          if (name === null) name = 'User';
          const user = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };

          setProfile(user);
          setIsLoading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          if (snapshot.val() === false) {
            return;
          }
          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) userRef.off();
        if (userStatusRef) userStatusRef.off();
        database.ref('.info/connected').off();

        setProfile(null);
        setIsLoading(null);
      }
    });

    return () => {
      authUnsubscribe();
      database.ref('.info/connected').off();
      if (userRef) userRef.off();
      if (userStatusRef) userStatusRef.off();
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}{' '}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

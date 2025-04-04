import { useEffect, useState } from "react";
import { onAuthStateChanged, User, getAuth } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(); // Call getAuth to get the Auth instance
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
};
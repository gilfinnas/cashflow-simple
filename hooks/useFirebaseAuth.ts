"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Import the auth object we created

/**
 * Custom hook for Firebase authentication.
 * Listens to the authentication state and provides the current user object and loading state.
 */
export function useFirebaseAuth() {
  // State to hold the authenticated user object
  const [user, setUser] = useState<User | null>(null);
  // State to indicate if the authentication check is in progress
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
      // Set loading to false once the check is complete
      setLoading(false);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return { user, loading };
}

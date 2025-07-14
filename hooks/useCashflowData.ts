"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "firebase/auth";
import { defaultCategories } from "@/lib/default-categories"; // We will create this file next

/**
 * Custom hook to fetch and manage a user's cashflow data from Firestore in real-time.
 * @param user The authenticated user object from useFirebaseAuth.
 */
export function useCashflowData(user: User | null) {
  const [cashflowData, setCashflowData] = useState<any>(null);
  const [userCategories, setUserCategories] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [subscriptionExpired, setSubscriptionExpired] = useState(false);

  useEffect(() => {
    // If there's no user, reset states and stop loading.
    if (!user) {
      setCashflowData(null);
      setUserCategories({});
      setLoading(false);
      setSubscriptionExpired(false);
      return;
    }

    // Set up the real-time listener to the user's document in Firestore.
    const docRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      setLoading(true);
      try {
        const userData = docSnap.exists() ? docSnap.data() : null;

        // Case 1: New user or user without subscription data.
        // We create a default document for them with a 14-day trial.
        if (!userData || !userData.subscriptionEndDate) {
          const trialEndDate = new Date();
          trialEndDate.setDate(trialEndDate.getDate() + 14);

          const initialData = {
            clientName: user.email || "שם העסק",
            openingBalance: 10000,
            bankLimit: 0,
            years: {},
            settings: { autoSave: false, autoAlerts: true },
            subscriptionEndDate: Timestamp.fromDate(trialEndDate),
            subscriptionType: "trial",
            transactions: [],
            categories: defaultCategories, // Set default categories for new users
          };

          await setDoc(docRef, initialData, { merge: true });
          // The onSnapshot listener will be triggered again with the new data,
          // so we don't need to set state here.
          return;
        }

        // Case 2: Existing user.
        // Check if their subscription is still valid.
        const isExpired = userData.subscriptionEndDate.toDate() < new Date();
        setSubscriptionExpired(isExpired);

        if (isExpired) {
          setCashflowData(null);
          setUserCategories({});
        } else {
          // Subscription is active, set the data.
          setCashflowData(userData);

          // Load user-specific categories or fall back to default.
          // This ensures backward compatibility for users without saved categories.
          const categoriesToUse = userData.categories && Object.keys(userData.categories).length > 0
            ? userData.categories
            : defaultCategories;
          setUserCategories(categoriesToUse);
        }
      } catch (error) {
        console.error("Error processing user data snapshot:", error);
        // Handle potential errors, e.g., by showing a toast message.
      } finally {
        setLoading(false);
      }
    }, (error) => {
      console.error("Firestore onSnapshot error:", error);
      setLoading(false);
      // Handle listener errors, e.g., permissions issues.
    });

    // Cleanup: Unsubscribe from the listener when the component unmounts or the user changes.
    return () => unsubscribe();
  }, [user]); // This effect re-runs whenever the user object changes.

  return { cashflowData, userCategories, loading, subscriptionExpired };
}

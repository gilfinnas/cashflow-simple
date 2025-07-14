"use client";

import { useState } from "react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useCashflowData } from "@/hooks/useCashflowData";

// Import UI Components
import { AppContainer } from "@/components/app/AppContainer";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { Loader } from "@/components/ui/Loader";
import { Toaster } from "@/components/ui/sonner"; // Corrected import for sonner
import { SubscriptionBanner } from "@/components/ui/SubscriptionBanner";
import { ScrollNavigation } from "@/components/ui/ScrollNavigation";
import { SupportButton } from "@/components/ui/SupportButton";
import { AIAssistant } from "@/components/ai/AIAssistant";

// Import Modal Components
import { VATSetupModal } from "@/components/modals/VATSetupModal";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { CategoryEditorModal } from "@/components/modals/CategoryEditorModal";
import { CustomAlertModal } from "@/components/modals/CustomAlertModal";
import { CustomConfirmModal } from "@/components/modals/CustomConfirmModal";
import { SubscriptionModal } from "@/components/modals/SubscriptionModal";

export default function HomePage() {
  // --- REAL FIREBASE HOOKS ---
  const { user, loading: authLoading } = useFirebaseAuth();
  const {
    cashflowData,
    userCategories,
    loading: dataLoading,
    subscriptionExpired,
  } = useCashflowData(user);

  // State for managing modal visibility
  const [showVATSetup, setShowVATSetup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);

  const loading = authLoading || (user && dataLoading);

  // --- Conditional Rendering Logic ---

  // 1. Show loader while checking auth or loading data
  if (loading) {
    return <Loader />;
  }

  // 2. If no user is logged in, show the authentication form
  if (!user) {
    return <AuthContainer />;
  }

  // 3. If user is logged in but subscription is expired, show the subscription modal
  if (subscriptionExpired) {
    return <SubscriptionModal />;
  }

  // 4. If user is logged in, data is loaded, and subscription is active, show the main app
  if (user && cashflowData) {
    return (
      <>
        <SubscriptionBanner userData={cashflowData} />
        <ScrollNavigation />
        <SupportButton />
        <AIAssistant />
        <AppContainer
          cashflowData={cashflowData}
          userCategories={userCategories}
          onShowSettings={() => setShowSettings(true)}
          onShowVATSetup={() => setShowVATSetup(true)}
        />

        {/* Modals */}
        {showVATSetup && (
          <VATSetupModal
            onClose={() => setShowVATSetup(false)}
            currentSettings={cashflowData?.vatSettings}
          />
        )}
        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            onShowCategoryEditor={() => {
              setShowSettings(false); // Close settings modal
              setShowCategoryEditor(true); // Open category editor
            }}
            onShowVATSetup={() => {
              setShowSettings(false); // Close settings modal
              setShowVATSetup(true); // Open VAT setup
            }}
            userData={cashflowData}
          />
        )}
        {showCategoryEditor && (
          <CategoryEditorModal
            onClose={() => setShowCategoryEditor(false)}
            userCategories={userCategories}
            cashflowData={cashflowData}
          />
        )}
        
        {/* These modals are likely global, so they can stay here */}
        <CustomAlertModal />
        <CustomConfirmModal />
        <Toaster />
      </>
    );
  }

  // Fallback case, though it should ideally not be reached.
  return <Loader />;
}

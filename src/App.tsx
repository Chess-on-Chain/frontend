// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Gameplay from "./pages/Gameplay";
import Profile from "./pages/Profile";
import BaseLayout from "./components/ui/layout/BaseLayout";
import { IdentityKitProvider } from "@nfid/identitykit/react";
import "@nfid/identitykit/react/styles.css";
import { IdentityKitAuthType } from "@nfid/identitykit";
import { useAnonymousCaller } from "./hooks/canister";

function App() {
  useAnonymousCaller().get_match("MANTAP")

  return (
    <IdentityKitProvider authType={IdentityKitAuthType.DELEGATION}>
      <Router>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/gameplay" element={<Gameplay />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </IdentityKitProvider>
  );
}

export default App;

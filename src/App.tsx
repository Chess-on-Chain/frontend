import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Gameplay from "./pages/Gameplay";
import Profile from "./pages/Profile";
import BaseLayout from "./components/ui/layout/BaseLayout";
import { IdentityKitProvider } from "@nfid/identitykit/react";
import "@nfid/identitykit/react/styles.css";
import { IdentityKitAuthType } from "@nfid/identitykit";
import { useAnonymousCaller } from "./hooks/canister";
import BaseLayout from './components/ui/layout/BaseLayout'
import FullscreenGameLayout from './components/ui/layout/FullscreenLayout'
import ProfileSettings from './pages/ProfileSettings'


function App() {
  useAnonymousCaller().get_match("MANTAP")

  return (
            <IdentityKitProvider authType={IdentityKitAuthType.DELEGATION}>
    <Router>
      <Routes>
        <Route path='/' element={<BaseLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/edit' element={<ProfileSettings />} />
        </Route>

        <Route element={<FullscreenGameLayout />}>
          <Route path='/gameplay' element={<Gameplay />} />
        </Route>
      </Routes>
    </Router>
          </IdentityKitProvider>
  )
}

export default App;

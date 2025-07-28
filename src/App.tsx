import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Gameplay from "./pages/Gameplay";
import Profile from "./pages/Profile";
import BaseLayout from "./components/ui/layout/BaseLayout";
import { IdentityKitProvider } from "@nfid/identitykit/react";
import "@nfid/identitykit/react/styles.css";
import { IdentityKitAuthType } from "@nfid/identitykit";
import FullscreenGameLayout from "./components/ui/layout/FullscreenLayout";
import ProfileSettings from "./pages/ProfileSettings";
import { BoardProvider } from "./context/BoardContext";
import ComingSoon from "./pages/ComingSoon";
import { useContext, useState } from "react";
import { clearToken } from "./helpers/api";
import ConnectSuccessContext from "./context/ConnectSuccessContext";
import { UserProvider } from "./context/UserContext";
import { MatchProvider } from "./context/MatchContext";

function Provider({ children }: any) {
  const [isConnect, setIsConnect] = useState(false);

  return (
    <ConnectSuccessContext.Provider value={[isConnect, setIsConnect]}>
      {children}
    </ConnectSuccessContext.Provider>
  );
}

function Home() {
  const [, setIsConnect] = useContext(ConnectSuccessContext);

  return (
    <IdentityKitProvider
      authType={IdentityKitAuthType.DELEGATION}
      signerClientOptions={{
        targets: (import.meta.env.VITE_CANISTER_TARGET as string).split(","),
        idleOptions: {
          disableIdle: true,
        },
        maxTimeToLive: 7200000000000n,
      }}
      onDisconnect={() => clearToken()}
      onConnectSuccess={() => {
        setIsConnect(true);
      }}
    >
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<ProfileSettings />} />
              <Route path="/gameplay/coming-soon" element={<ComingSoon />} />
            </Route>

            {/* <Route
              element={
                <MatchProvider>
                  <BoardProvider>
                    <FullscreenGameLayout />
                  </BoardProvider>
                </MatchProvider>
              }
            > */}
            <Route
              path="/gameplay"
              element={
                <MatchProvider>
                  <BoardProvider>
                    <FullscreenGameLayout>
                      <Gameplay />
                    </FullscreenGameLayout>
                  </BoardProvider>
                </MatchProvider>
              }
            />
            {/* </Route> */}
          </Routes>
        </Router>
      </UserProvider>
    </IdentityKitProvider>
  );
}

function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default App;

import { Outlet, useLocation } from "react-router-dom";
import { Navbar, BottomTabs } from "../common";

const BaseLayout = () => {
  const location = useLocation();

  const hiddenRoutes = ["/gameplay"];
  const shouldHideUI = hiddenRoutes.includes(location.pathname);

  return (
    <div className="flex w-screen min-h-screen flex-col hide-scrollbar">
      {!shouldHideUI && (
        <header className="bg-transparent px-8 py-4 xl:px-20 md:py-6 shadow-md transition-all duration-300">
          <Navbar />
        </header>
      )}
      <main className="content flex-1">
        <Outlet />
      </main>
      {!shouldHideUI && (
        <footer className="block sm:hidden">
          <BottomTabs />
        </footer>
      )}
    </div>
  );
};

export default BaseLayout;

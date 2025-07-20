import { Outlet } from "react-router-dom";
import { Navbar, BottomTabs } from "../common";
// import BottomTabs from "../common/navigation/bottomTabs";

const BaseLayout = () => {
  return (
    <div className="flex w-screen min-h-screen flex-col">
      <header className="bg-transparent px-8 py-4 xl:px-20 md:py-6 shadow-md">
        <Navbar />
      </header>
      <main className="content" style={{ padding: "1rem" }}>
        <Outlet />
      </main>
      <footer className="block sm:hidden">
        <BottomTabs />
      </footer>
    </div>
  );
};

export default BaseLayout;

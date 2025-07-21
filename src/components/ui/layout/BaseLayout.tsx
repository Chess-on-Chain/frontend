import { Outlet } from "react-router-dom";
import { Navbar } from "../common";

const BaseLayout = () => {
  return (
    <div className="flex w-screen min-h-screen flex-col">
      <header className="bg-transparent px-8 py-4 shadow-md">
        <Navbar />
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;

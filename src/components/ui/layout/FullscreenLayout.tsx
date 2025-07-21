// import { Outlet } from "react-router-dom";

import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const FullscreenGameLayout = ({ children }: Props) => {
  return (
    // <div className="w-screen h-screen overflow-hidden flex items-center justify-center text-wite">
    <div className="w-screen h-screen flex flex-col text-white">
      <header className="flex items-center justify-center bg-black">
        <h1 className="text-lg">Header</h1>
      </header>

      <main className="relative flex-1 flex items-center justify-center">
        <div className="w-[768px] h-[768px] bg-secondary">{children}</div>
      </main>

      <footer className="flex items-center justify-center h-24 bg-black">
        <div className="w-full max-w-screen-md border border-r-red-600">
          Footer
        </div>
      </footer>
    </div>
  );
};

export default FullscreenGameLayout;

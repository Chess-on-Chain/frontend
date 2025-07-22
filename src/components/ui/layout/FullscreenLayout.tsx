import { Outlet } from "react-router-dom";

const FullscreenGameLayout = () => {
  return (
    // <div className="w-screen h-screen overflow-hidden flex items-center justify-center text-wite">
    <div className="w-screen h-screen flex flex-col text-white">
      <header className="flex items-center justify-center bg-black">
        <h1 className="text-lg">Header</h1>
      </header>

      <main className="relative flex-1 flex items-center justify-center">
        <div className="w-full h-[768px] flex justify-center items-center bg-black">
          <Outlet />
        </div>
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

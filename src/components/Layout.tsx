import { Link, Outlet } from "react-router-dom";
import ConnectWalletBtn from "./ui/common/button/BtnConnectWallet";

const Layout = () => {
  return (
    <div className="flex w-screen min-h-screen flex-col">
     
      <header className="bg-black px-8 py-4 shadow-md">
        <nav className="relative flex justify-between">
          <div className="left">
            <div className="w-full sm:w-[30%] md:w-[40%]">
                <Link to='/' >
                    <img
                      src="/Logo-COC.png"
                      alt="Logo Chess on Chain"
                      className="w-full h-auto" />
                </Link>
            </div>
          </div>

          <div className="right h-full self-center">
            <ConnectWalletBtn />
          </div>
        </nav>
      </header>

      <main className="content" style={{ padding: "1rem" }}>
        <Outlet />
      </main>
      
      
    </div>
  );
};

export default Layout;

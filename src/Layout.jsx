import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsApp from "./components/WhatsApp";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <WhatsApp />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

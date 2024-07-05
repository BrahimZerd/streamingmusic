import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <main className="w-screen h-screen overflow-hidden	">{children}</main>;
};

export default Layout;

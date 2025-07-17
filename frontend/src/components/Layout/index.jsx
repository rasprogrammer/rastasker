import Sidebar from "@/components/Layout/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

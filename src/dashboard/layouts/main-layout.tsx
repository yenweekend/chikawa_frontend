import {
  // Icons cũ
  LineChart,
  Users,   
  ChevronUp,
  // Icons cho Sidebar
  LayoutGrid, 
  Package,    
  Tag,        
  Bell,       
  Settings,   
  Infinity as InfinityIcon 
} from 'lucide-react';

export const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar cố định bên trái */}
      <aside className="w-64 bg-white shadow-lg fixed h-full z-20 flex flex-col">
        {/* Logo Area */}
        <div className="p-6 flex items-center space-x-2">
          <InfinityIcon className="text-purple-700 w-8 h-8" />
          <span className="text-2xl font-bold text-purple-700">Spodut</span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <div className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            <LayoutGrid size={20} className="mr-3" />
            <span className="font-medium">Dashboard</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-4 py-3 text-purple-700 bg-purple-50 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <Package size={20} className="mr-3" />
                <span className="font-medium">Products</span>
              </div>
              <ChevronUp size={16} />
            </div>
            {/* Sub-menu */}
            <div className="pl-11 space-y-1">
              <div className="py-2 text-sm text-purple-700 font-medium bg-purple-100 rounded-md px-3 cursor-pointer">
                Product List
              </div>
              <div className="py-2 text-sm text-gray-500 hover:text-gray-900 px-3 cursor-pointer">
                Categories
              </div>
            </div>
          </div>

          <div className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Tag size={20} className="mr-3" />
            <span className="font-medium">Orders</span>
          </div>

          <div className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Users size={20} className="mr-3" />
            <span className="font-medium">Customers</span>
          </div>

          <div className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            <LineChart size={20} className="mr-3" />
            <span className="font-medium">Chatbot</span>
          </div>

          <div className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Bell size={20} className="mr-3" />
            <span className="font-medium">Notifications</span>
          </div>

          <div className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Settings size={20} className="mr-3" />
            <span className="font-medium">Settings</span>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
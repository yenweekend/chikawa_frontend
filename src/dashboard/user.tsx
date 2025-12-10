import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  MessagesSquare,
  LineChart,
  ShoppingCart,
  Users,
  Percent,
  PieChart,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Calendar,
  Search,
  RefreshCw,
  BarChart,
  CheckCircle, 
  Eye,
  BarChart2, 
  Trash2,     
  X as XIcon, 
  AlertTriangle,
  Maximize,
  ArrowDownCircle,
  Bot,
  User,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  Menu,
  Bell,
  LayoutDashboard,
  FileText,
  Settings,
  Home
} from 'lucide-react';

// ===============================================
// === LAYOUT COMPONENT (INLINED TO FIX IMPORT ERROR) ===
// ===============================================

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} className="text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-gray-800 hidden sm:block">AppShell</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}>
          <div className="p-4 flex flex-col space-y-1 overflow-y-auto flex-1">
             <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">Menu</div>
             <SidebarItem 
               icon={Home} 
               label="Home" 
               active={activeTab === 'home'} 
               onClick={() => setActiveTab('home')} 
             />
             <SidebarItem 
               icon={LayoutDashboard} 
               label="Dashboard" 
               active={activeTab === 'dashboard'} 
               onClick={() => setActiveTab('dashboard')} 
             />
             <SidebarItem 
               icon={FileText} 
               label="Reports" 
               active={activeTab === 'reports'} 
               onClick={() => setActiveTab('reports')} 
             />
             <SidebarItem 
               icon={Settings} 
               label="Settings" 
               active={activeTab === 'settings'} 
               onClick={() => setActiveTab('settings')} 
             />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// ===============================================
// === CẤU HÌNH API ===
// ===============================================
const API_BASE_URL = 'http://localhost:8083/api/v1';
import React, { useState, useEffect, useRef } from "react";
import { 
  Filter, 
  Download, 
  RotateCcw, 
  Search, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  RefreshCcw,
  Trash2,
  Check,
  X
} from "lucide-react";
import { MainLayout } from "./layouts/main-layout";

// --- Order Detail Modal (Updated to Light Theme) ---
const OrderDetailModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Changed bg-slate-800 to bg-white, text-white to text-slate-900 */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-slate-900 font-sans">
        
        {/* Modal Header - Light Theme */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Order Details</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          
          {/* Section 1: Order Info */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-4">Order Information</h4>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Order ID:</p>
                <p className="text-sm font-medium text-slate-900">{order.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Date:</p>
                <p className="text-sm font-medium text-slate-900">{order.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Status:</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                  order.status === 'Success' ? 'bg-emerald-100 text-emerald-700' :
                  order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="col-span-3 mt-2">
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Total Amount:</p>
                <p className="text-lg font-bold text-indigo-600">{order.total}</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Section 2: Customer Info */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-4">Customer Information</h4>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Full Name:</p>
                <p className="text-sm font-medium text-slate-900">{order.customer}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Email:</p>
                <p className="text-sm font-medium text-slate-700">{order.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Phone Number:</p>
                <p className="text-sm font-medium text-slate-900">{order.phone || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Section 3: Product Details */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-4">Product Details</h4>
            {/* Light background for product box */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Product Name:</p>
                  <p className="text-sm font-bold text-slate-900">{order.productName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Quantity:</p>
                  <p className="text-sm font-medium text-slate-900">{order.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Location / Note:</p>
                  <p className="text-sm font-medium text-slate-700">{order.location || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer - Light Theme */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
            Close
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-md shadow-indigo-200">
            Process Order
          </button>
        </div>

      </div>
    </div>
  );
};

// --- Helper Component for Dropdown Actions ---
const ActionMenu = ({ order, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActionClick = (action) => {
    onAction(action, order);
    setIsOpen(false);
  };

  // Define actions based on status
  const getActions = () => {
    switch (order.status) {
      case 'Pending':
        return [
          { label: 'View Details', icon: Eye, action: 'view', color: 'text-slate-600' },
          { label: 'Confirm Order', icon: Check, action: 'confirm', color: 'text-emerald-600' },
          { label: 'Cancel Order', icon: XCircle, action: 'cancel', color: 'text-red-600' },
        ];
      case 'Cancelled':
        return [
          { label: 'View Details', icon: Eye, action: 'view', color: 'text-slate-600' },
          { label: 'Restore Order', icon: RefreshCcw, action: 'restore', color: 'text-blue-600' },
          { label: 'Re-confirm', icon: Check, action: 'confirm', color: 'text-emerald-600' },
        ];
      case 'Success':
        return [
          { label: 'View Details', icon: Eye, action: 'view', color: 'text-slate-600' },
        ];
      default:
        return [];
    }
  };

  const actions = getActions();

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
          {actions.map((item, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(item.action)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 ${item.color}`}
            >
              <item.icon size={14} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const OrderDashBoard = () => {
  // State for Orders
  // Added more fields for the modal details
  const [orders, setOrders] = useState([
    { id: "ORD-001", customer: "Nguyen Van A", email: "nguyenvana@gmail.com", phone: "0912345678", productName: "Concert Ticket A", category: "Ticket", quantity: 2, total: "$500.00", status: "Success", date: "12/10/2023", location: "Stadium Zone A" },
    { id: "ORD-002", customer: "Tran Thi B", email: "tranthib@example.com", phone: "0987654321", productName: "Fan Meeting Pass", category: "Meeting", quantity: 1, total: "$250.00", status: "Pending", date: "13/10/2023", location: "Convention Center" },
    { id: "ORD-003", customer: "Le Van C", email: "levanc@outlook.com", phone: "0909090909", productName: "Food Fest Bundle", category: "Festival", quantity: 4, total: "$1,000.00", status: "Cancelled", date: "14/10/2023", location: "City Park" },
    { id: "ORD-004", customer: "Pham Thi D", email: "phamthid@test.com", phone: "0911223344", productName: "Concert Ticket VIP", category: "Ticket", quantity: 2, total: "$500.00", status: "Success", date: "15/10/2023", location: "Stadium VIP Box" },
    { id: "ORD-005", customer: "Hoang Van E", email: "hoangvane@mail.com", phone: "0922334455", productName: "Flying Show Entry", category: "Show", quantity: 3, total: "$750.00", status: "Pending", date: "16/10/2023", location: "Sky Arena" },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10); // State for 'Show per page'

  // Action Handler
  const handleOrderAction = (action, order) => {
    if (action === 'view') {
      setSelectedOrder(order);
      setIsModalOpen(true);
      return;
    }

    setOrders(prevOrders => prevOrders.map(o => {
      if (o.id !== order.id) return o;

      if (action === 'confirm') {
        return { ...o, status: 'Success' };
      }
      if (action === 'cancel') {
        return { ...o, status: 'Cancelled' };
      }
      if (action === 'restore') {
        return { ...o, status: 'Pending' }; // Restore to Pending
      }
      return o;
    }));
  };

  return (
    <MainLayout>
      {/* Reduced padding to p-3 (~12px) to be closer to sidebar as requested */}
      <div className="space-y-6 animate-in fade-in duration-500 p-3 bg-slate-50 min-h-screen">
        
        {/* --- HEADER SECTION --- */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Order Processing</h1>
            <p className="text-slate-500 mt-1 text-sm">Manage and process all product orders</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
              <Filter size={16} className="mr-2" /> Filter
            </button>
            <button className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm shadow-indigo-200">
              <Download size={16} className="mr-2" /> Export Data
            </button>
          </div>
        </div>

        {/* --- FILTERS SECTION --- */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Filter: Order Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Order Status</label>
              <div className="relative">
                <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer">
                  <option>All Statuses</option>
                  <option>Success</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Filter: Category (Renamed from Event to Product Category concept) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Category</label>
              <div className="relative">
                <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer">
                  <option>All Categories</option>
                  <option>Ticket</option>
                  <option>Meeting</option>
                  <option>Festival</option>
                  <option>Show</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Filter: Order Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Order Date</label>
              <div className="relative">
                <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer">
                  <option value="all">All Days</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Search</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Order ID, Customer..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
            <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-red-600 hover:border-red-200 transition-all">
              <RotateCcw size={14} className="mr-2" /> Reset
            </button>
            <button className="flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm">
              <Search size={14} className="mr-2" /> Apply
            </button>
          </div>
        </div>

        {/* --- LIST SECTION --- */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-visible">
          {/* List Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50 rounded-t-xl">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <h3 className="font-bold text-slate-800 text-lg whitespace-nowrap">Order List</h3>
              
              {/* Batch Actions */}
              <div className="hidden md:flex items-center gap-2">
                <button className="flex items-center px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-100 transition-all">
                  <CheckCircle2 size={14} className="mr-1.5" /> Batch Confirm
                </button>
                <button className="flex items-center px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-all">
                  <XCircle size={14} className="mr-1.5" /> Batch Cancel
                </button>
              </div>
            </div>

            {/* Show Per Page Control (Top Right Corner) */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Show:</span>
              <div className="relative">
                <select 
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-indigo-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:border-indigo-400 transition-colors"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <span>per page</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                  <th className="px-6 py-4 w-10 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                  </th>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4 text-center">Qty</th>
                  <th className="px-6 py-4 text-right">Total</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                    </td>
                    <td className="px-6 py-4 font-medium text-indigo-600 cursor-pointer hover:underline">{order.id}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{order.customer}</td>
                    <td className="px-6 py-4 text-slate-600">{order.productName}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{order.quantity}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800">{order.total}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Success' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{order.date}</td>
                    <td className="px-6 py-4 text-center">
                      <ActionMenu order={order} onAction={handleOrderAction} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500">
              Page <span className="font-medium text-slate-900">1</span> of <span className="font-medium text-slate-900">4</span>
            </div>
            
            <div className="flex gap-2">
              <button className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 disabled:opacity-50 transition-colors">
                <ChevronLeft size={18} />
              </button>
              
              <button className="w-9 h-9 flex items-center justify-center bg-indigo-600 text-white rounded-lg shadow-sm font-medium transition-colors">
                1
              </button>
              
              <button className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                2
              </button>
              
              <button className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                3
              </button>
              
              <button className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                4
              </button>
              
              <button className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 disabled:opacity-50 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      <OrderDetailModal 
        order={selectedOrder} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </MainLayout>
  );
};
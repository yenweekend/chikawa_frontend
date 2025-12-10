import React, { useState } from "react";
import { MainLayout } from "./layouts/main-layout"; 

import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Search, 
  Filter, 
  Plus,
  Eye,
  EyeOff,
  Edit,
  Ban,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Mail,
  Phone,
  Lock,
  User as UserIcon,
  Save
} from "lucide-react";

export const User = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false); // State cho modal Edit
  
  // State quản lý ẩn/hiện mật khẩu (dùng chung hoặc tách riêng tùy logic, ở đây tách riêng cho UI đơn giản)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Stats Data
  const stats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: "892",
      change: "+8%",
      trend: "up",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "New Users",
      value: "45",
      change: "+15%",
      trend: "up",
      icon: UserPlus,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      title: "Blocked Users",
      value: "23",
      change: "-5%",
      trend: "down",
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  // User Data List
  const users = [
    {
      id: "6",
      username: "admin01",
      email: "admin01@example.com",
      role: "ADMIN",
      status: "TRUE",
      joinDate: "11/08/2025 11:26 PM",
      lastLogin: "12/08/2025 09:00 AM",
      avatarColor: "bg-blue-500",
      initials: "A"
    },
    {
      id: "8",
      username: "user02",
      email: "user02@example.com",
      role: "USER",
      status: "TRUE",
      joinDate: "11/08/2025 11:26 PM",
      lastLogin: "11/08/2025 11:26 PM",
      avatarColor: "bg-indigo-500",
      initials: "U"
    },
    {
      id: "9",
      username: "staff01",
      email: "staff01@example.com",
      role: "ADMIN",
      status: "FALSE",
      joinDate: "11/08/2025 11:26 PM",
      lastLogin: "-",
      avatarColor: "bg-purple-500",
      initials: "S"
    },
    {
      id: "10",
      username: "guest01",
      email: "guest01@example.com",
      role: "USER",
      status: "TRUE",
      joinDate: "11/08/2025 11:26 PM",
      lastLogin: "10/08/2025 08:30 PM",
      avatarColor: "bg-pink-500",
      initials: "G"
    },
    {
      id: "11",
      username: "manager01",
      email: "manager@example.com",
      role: "ADMIN",
      status: "TRUE",
      joinDate: "10/08/2025 10:15 AM",
      lastLogin: "12/08/2025 08:45 AM",
      avatarColor: "bg-green-500",
      initials: "M"
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6 relative">
        {/* 1. Page Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage user accounts and access permissions.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center transition-all shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </button>
            <button 
              onClick={() => setIsAddUserModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center shadow-sm hover:shadow transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* 2. Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md hover:border-indigo-100 group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* 3. Filters */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
           <div className="flex flex-col lg:flex-row gap-5 justify-between">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Search</label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search by name, email..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Role</label>
                <div className="relative">
                    <select className="w-full pl-3 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer appearance-none">
                    <option>All Roles</option>
                    <option>Admin</option>
                    <option>User</option>
                    </select>
                </div>
              </div>

              <div className="w-full sm:w-40">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Status</label>
                <div className="relative">
                    <select className="w-full pl-3 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer appearance-none">
                    <option>All Statuses</option>
                    <option>True</option>
                    <option>False</option>
                    </select>
                </div>
              </div>
              
              <div className="flex items-end gap-2">
                <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm shadow-indigo-200 h-[42px]">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
                {/* Remove Filter Button */}
                <button className="px-3 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg text-sm font-medium flex items-center transition-colors h-[42px]" title="Remove Filter">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px] flex flex-col">
            {/* Table Header */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-800">User List</h3>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 border border-gray-200 rounded shadow-sm">
                        Total: {users.length}
                    </span>
                </div>

                {/* Show ... per page */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-gray-500">Show:</span>
                    <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block p-1.5 shadow-sm cursor-pointer outline-none">
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                    </select>
                    <span className="text-gray-500">per page</span>
                </div>
            </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-gray-700 font-bold text-xs uppercase border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 w-16 text-center">#</th>
                  <th className="px-6 py-4">User Info</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4">Last Login</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user, index) => (
                    <tr key={index} className="hover:bg-indigo-50/30 transition-colors group">
                        {/* Column 1: Index */}
                        <td className="px-6 py-4 text-center font-medium text-gray-400">
                            {index + 1}
                        </td>

                        {/* Column 2: User Info */}
                        <td className="px-6 py-4">
                            <div>
                                <div className="font-bold text-gray-900 text-base">{user.username}</div>
                                <div className="text-xs text-gray-400 font-mono mt-0.5">{user.id}</div>
                            </div>
                        </td>

                        {/* Column 3: Email */}
                        <td className="px-6 py-4 text-gray-600 font-medium">
                            {user.email}
                        </td>

                        {/* Column 4: Role */}
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${
                                user.role === 'ADMIN' 
                                ? 'bg-red-50 text-red-700 border-red-100' 
                                : 'bg-purple-50 text-purple-700 border-purple-100'
                            }`}>
                                {user.role}
                            </span>
                        </td>

                        {/* Column 5: Status */}
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${
                                user.status === 'TRUE' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                : 'bg-gray-100 text-gray-600 border-gray-200'
                            }`}>
                                {user.status}
                            </span>
                        </td>

                        {/* Column 6: Join Date */}
                        <td className="px-6 py-4 text-gray-600">
                            <div className="text-sm">{user.joinDate.split(' ')[0]}</div>
                            <div className="text-xs text-gray-400">{user.joinDate.split(' ').slice(1).join(' ')}</div>
                        </td>

                        {/* Column 7: Last Login */}
                        <td className="px-6 py-4 text-gray-600">
                            {user.lastLogin !== "-" ? (
                                <>
                                    <div className="text-sm">{user.lastLogin.split(' ')[0]}</div>
                                    <div className="text-xs text-gray-400">{user.lastLogin.split(' ').slice(1).join(' ')}</div>
                                </>
                            ) : (
                                <span className="text-gray-400 text-xs italic">Never</span>
                            )}
                        </td>

                        {/* Column 8: Actions */}
                        <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => setIsEditUserModalOpen(true)}
                                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 hover:shadow-sm transition-all" 
                                  title="Edit"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 hover:shadow-sm transition-all" title="View Details">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 hover:shadow-sm transition-all" title="Block User">
                                    <Ban className="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
            
            {/* Empty State */}
            {users.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                </div>
            )}
          </div>

          {/* Footer Pagination */}
          <div className="p-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                  <span>Page <span className="font-semibold text-gray-900">1</span> of <span className="font-semibold text-gray-900">4</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-600 text-white font-medium shadow-sm transition-colors">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-indigo-600 font-medium transition-colors">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-indigo-600 font-medium transition-colors">3</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-indigo-600 font-medium transition-colors">4</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                  </button>
              </div>
          </div>
        </div>

        {/* --- ADD USER MODAL --- */}
        {isAddUserModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 flex-shrink-0">
                <h3 className="text-lg font-bold text-gray-900">Add New User</h3>
                <button 
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Modal Body - Scrollable */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
                 {/* Full Name */}
                 <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Full Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Enter full name" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                    </div>
                 </div>

                 {/* Email */}
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="email" placeholder="Enter email" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                    </div>
                 </div>

                 {/* Phone */}
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="tel" placeholder="Enter phone number" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                    </div>
                 </div>

                 {/* Role */}
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Role</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer">
                      <option>User</option>
                      <option>Admin</option>
                    </select>
                 </div>

                 {/* Status */}
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Status</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer">
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Pending</option>
                    </select>
                 </div>

                 {/* Username */}
                 <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Username</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Enter username" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                    </div>
                 </div>

                 {/* Password */}
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••" 
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                 </div>

                 {/* Confirm Password */}
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••" 
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                 </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 flex-shrink-0">
                <button 
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center shadow-sm hover:shadow transition-all">
                  <Save className="w-4 h-4 mr-2" />
                  Save User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- EDIT USER MODAL --- */}
        {isEditUserModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 flex-shrink-0">
                <h3 className="text-lg font-bold text-gray-900">Update User</h3>
                <button 
                  onClick={() => setIsEditUserModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Modal Body - Scrollable */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
                 {/* Full Name */}
                 <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Full Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" defaultValue="Admin User" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                    </div>
                 </div>

                 {/* Email */}
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="email" defaultValue="admin01@example.com" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                    </div>
                 </div>

                 {/* Phone */}
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="tel" defaultValue="0901234567" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                    </div>
                 </div>

                 {/* Role */}
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Role</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer">
                      <option>Admin</option>
                      <option>User</option>
                    </select>
                 </div>

                 {/* Status */}
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Status</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer">
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Pending</option>
                    </select>
                 </div>

                 {/* Username */}
                 <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Username</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" defaultValue="admin01" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                    </div>
                 </div>

                 {/* Password */}
                 <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">New Password (Optional)</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Leave blank to keep current password" 
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                 </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 flex-shrink-0">
                <button 
                  onClick={() => setIsEditUserModalOpen(false)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center shadow-sm hover:shadow transition-all">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
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
  Info
} from 'lucide-react';

// === IMPORT LAYOUT ===
import { MainLayout } from "./layouts/main-layout";

// ===============================================
// === CẤU HÌNH API ===
// ===============================================
const API_BASE_URL = 'http://localhost:8083/api/v1';

// ===============================================
// === CÁC HÀM HỖ TRỢ (HELPERS) ===
// ===============================================

function formatDateTime(isoString) {
  if (!isoString) return 'N/A';
  try {
    const date = new Date(isoString);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${y}/${m}/${d} ${h}:${min}`;
  } catch (e) {
    return isoString;
  }
}

function formatTimestamp(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) { return ''; }
}

function getDayAbbreviation(dayName) {
  if (!dayName) return '';
  return dayName.substring(0, 3);
}

function getFakeData() {
  return {
    stats: {
      totalConversations: 11,
      analyzedCount: 2,
      pendingCount: 9,
      potentialCount: 1,
      spamCount: 1,
      dailyStats: [
        { date: "2025-11-11", count: 6, dayOfWeek: "Tuesday" },
        { date: "2025-11-12", count: 5, dayOfWeek: "Wednesday" }
      ]
    },
    conversations: [
      {
        id: "fake_id_1_analyzed",
        threadId: "1762830567695",
        userId: 1,
        agentType: 1,
        messages: [
          { sender: "user", content: "Show me the most popular items", timestamp: "2025-11-11T03:09:35.537+00:00" },
          { sender: "bot", content: "Here are some of our popular items:\n\n* **Chiikawa Luggage Tag (Momonga)**", timestamp: "2025-11-11T03:09:35.537+00:00" }
        ],
        status: 2, analyzed: 2, role: null, createdAt: "2025-11-11T03:09:35.537+00:00"
      },
      {
        id: "fake_id_2_pending",
        threadId: "1762830567696",
        userId: null,
        agentType: 1,
        messages: [
          { sender: "user", content: "Hello", timestamp: "2025-11-12T05:10:00.000+00:00" },
          { sender: "bot", content: "Hi! How can I help you?", timestamp: "2025-11-12T05:10:05.000+00:00" }
        ],
        status: 1, analyzed: 1, role: null, createdAt: "2025-11-12T05:10:00.000+00:00"
      }
    ]
  };
}

// ===============================================
// === CÁC COMPONENT CON (UI) ===
// ===============================================

const StatItem = ({ title, value, icon: Icon, color }) => {
  const colorConfig = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
  };
  const colors = colorConfig[color] || colorConfig.blue; 
  return (
    <div className="flex items-center space-x-3 min-w-[200px] p-2">
      <div className={`p-3 rounded-full ${colors.bg}`}>
        <Icon className={colors.text} size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 whitespace-nowrap">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

const ConversationsChart = ({ dailyStats = [], totalConversations = 0 }) => {
  const legendData = [
    { day: 'Mon', color: 'bg-blue-500' },
    { day: 'Tue', color: 'bg-green-500' },
    { day: 'Wed', color: 'bg-purple-500' },
    { day: 'Thu', color: 'bg-yellow-500' },
    { day: 'Fri', color: 'bg-pink-500' },
    { day: 'Sat', color: 'bg-blue-800' },
    { day: 'Sun', color: 'bg-red-500' },
  ];
  const dailyAverage = (dailyStats && dailyStats.length > 0)
    ? (totalConversations / dailyStats.length).toFixed(0) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-6 whitespace-nowrap">Conversations (Last 7 Days)</h2>
      <div className="flex justify-around items-center text-center mb-6 px-4">
        {dailyStats.length === 0 && <p className="text-sm text-gray-500 w-full text-center">No daily stats available.</p>}
        {dailyStats.map((item) => {
          const dayAbbr = getDayAbbreviation(item.dayOfWeek);
          const legendItem = legendData.find(l => l.day === dayAbbr);
          const colorClass = legendItem ? legendItem.color.replace('bg-', 'text-') : 'text-gray-700';
          return (
            <div key={item.date} className="flex flex-col items-center space-y-1">
              <span className={`text-sm font-medium ${colorClass}`}>{dayAbbr}</span>
              <span className="text-lg font-bold text-gray-800">{item.count}</span>
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-200 my-4"></div>
      <div className="flex justify-center items-center space-x-4 flex-wrap px-4">
        {legendData.map((item) => (
          <div key={item.day} className="flex items-center space-x-1.5 my-1">
            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
            <span className="text-xs font-medium text-gray-600">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 my-4"></div>
      <div className="flex justify-around items-center text-center">
        <div className="px-4">
          <p className="text-3xl font-bold text-gray-900">{totalConversations}</p>
          <p className="text-sm font-medium text-gray-500">Total Conversations</p>
        </div>
        <div className="px-4">
          <p className="text-3xl font-bold text-gray-900">{dailyAverage}</p>
          <p className="text-sm font-medium text-gray-500">Daily Average</p>
        </div>
      </div>
    </div>
  );
};

const ConversationsFilterTabs = ({ currentFilterValue, onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 w-full">
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button className="flex items-center space-x-2 px-4 py-3 border-b-2 border-yellow-500 text-yellow-600 font-semibold whitespace-nowrap">
          <MessagesSquare size={18} />
          <span className="whitespace-nowrap">Conversations</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-3 text-gray-500 hover:text-gray-700 whitespace-nowrap">
          <ShoppingCart size={18} />
          <span>Orders</span>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">12</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-3 text-gray-500 hover:text-gray-700 whitespace-nowrap">
          <CheckCircle size={18} />
          <span>Delivered</span>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">25</span>
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Date Range:</label>
          <div className="relative"><input type="text" placeholder="mm/dd/yyyy" className="border border-gray-300 rounded-md p-2 pl-8 text-sm w-36"/><Calendar className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} /></div>
          <span className="text-gray-500">to</span>
          <div className="relative"><input type="text" placeholder="mm/dd/yyyy" className="border border-gray-300 rounded-md p-2 pl-8 text-sm w-36"/><Calendar className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} /></div>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700 whitespace-nowrap">Status:</label>
          <select id="statusFilter" className="border border-gray-300 rounded-md p-2 text-sm bg-white" value={currentFilterValue} onChange={(e) => onFilterChange(Number(e.target.value))}>
            <option value="0">All</option>
            <option value="1">Undefined</option>
            <option value="2">Potential</option>
            <option value="3">Spam</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-grow min-w-[200px]">
          <input type="text" placeholder="Search conversations..." className="border border-gray-300 rounded-md p-2 pl-10 text-sm w-full" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-md text-sm"><Search size={16} /><span>Search</span></button>
        <button className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md text-sm"><RefreshCw size={16} /><span>Refresh</span></button>
        <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md text-sm whitespace-nowrap"><BarChart size={16} /><span>Advanced Analysis</span></button>
      </div>
    </div>
  );
};

const StatusTag = ({ status }) => {
  let colors = 'bg-gray-100 text-gray-700', text = 'Undefined';
  if (status === 2) { colors = 'bg-green-100 text-green-700'; text = 'Potential'; }
  else if (status === 3) { colors = 'bg-red-100 text-red-700'; text = 'Spam'; }
  return <span className={`px-3 py-1 text-xs font-medium rounded-full ${colors}`}>{text}</span>;
};

const AnalyzeTag = ({ analyzed }) => {
  let colors = 'bg-yellow-100 text-yellow-700', text = 'Pending';
  if (analyzed === 2) { colors = 'bg-green-100 text-green-700'; text = 'Analyzed'; }
  return <span className={`px-3 py-1 text-xs font-medium rounded-full ${colors}`}>{text}</span>;
};

const ConversationsTable = ({ 
  conversations = [], 
  onViewClick, 
  onAnalyzeClick, 
  onDeleteClick,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md mt-6 w-full overflow-hidden">
      <div className="flex justify-between items-center p-6">
        <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">Conversations</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Show:</span>
          <select 
            className="border border-gray-300 rounded-md p-1 bg-white cursor-pointer"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span>per page</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['ID', 'Customer ID', 'Phone', 'Status', 'Analyze', 'Date & Time', 'Actions'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {conversations.length === 0 && <tr><td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">No conversations found.</td></tr>}
            {conversations.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-xs">
                  {row.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {row.userId ? row.userId : 'Guest'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">N/A</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusTag status={row.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap"><AnalyzeTag analyzed={row.analyzed} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDateTime(row.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button onClick={() => onViewClick(row)} className="flex items-center text-orange-500 hover:text-orange-700"><Eye size={16} className="mr-1" /> View</button>
                    <button onClick={() => onAnalyzeClick(row)} className="flex items-center text-green-500 hover:text-green-700"><BarChart2 size={16} className="mr-1" /> Analyze</button>
                    <button onClick={() => onDeleteClick(row)} className="flex items-center text-red-500 hover:text-red-700"><Trash2 size={16} className="mr-1" /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-300'}`}
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 rounded-md text-sm font-medium border ${
                  page === currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-300'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-300'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ConversationDetailModal = ({ conversation, onClose }) => {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  if (!conversation) return null;
  const messages = conversation.messages || [];
  const isAnalyzed = conversation.analyzed === 2;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <div><h2 className="text-xl font-bold text-gray-900">Conversation Details</h2><p className="text-sm text-gray-500">View analysis information and messages</p></div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XIcon size={24} /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="mb-4"><h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Conversation ID</h3><p className="text-sm text-gray-800 font-mono bg-gray-100 p-2 rounded">{conversation.id}</p></div>
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Customer Information Analysis</h3>
            {isAnalyzed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3"><CheckCircle className="text-green-500" size={20} /><p className="text-sm text-green-700 font-semibold">Conversation has been analyzed successfully.</p></div>
                <div className="mt-2 pl-8 flex items-center space-x-2"><span className="text-sm font-medium text-gray-700">Result:</span><StatusTag status={conversation.status} /></div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3"><AlertTriangle className="text-yellow-500" size={20} /><p className="text-sm text-yellow-700">Not analyzed yet. Click "Analyze" to analyze the conversation.</p></div>
            )}
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2 flex-wrap gap-y-2"><h3 className="text-xs font-semibold text-gray-500 uppercase">Message History</h3><span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">{messages.length} messages</span></div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-md hover:bg-purple-700"><Maximize size={14} /><span>Full View</span></button>
                <button className="flex items-center space-x-1 text-xs bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300"><ArrowDownCircle size={14} /><span>Scroll</span></button>
              </div>
            </div>
            <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4 overflow-y-auto ${isChatExpanded ? 'max-h-[60vh]' : 'max-h-64'} transition-all duration-300 ease-in-out`}>
              {messages.length === 0 && <p className="text-sm text-gray-500 text-center">No messages in this conversation.</p>}
              {messages.map((message, index) => (
                message.sender === 'bot' ? (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-gray-200 p-2 rounded-full"><Bot size={20} className="text-gray-600" /></div>
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2"><span className="font-semibold text-sm text-gray-800">AI Assistant</span><span className="text-xs text-gray-400">{formatTimestamp(message.timestamp)}</span></div>
                      <div className="bg-gray-200 p-3 rounded-lg mt-1"><p className="text-sm text-gray-900 whitespace-pre-wrap">{message.content}</p></div>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex items-start space-x-3 justify-end">
                    <div className="flex-1 max-w-md">
                      <div className="flex items-baseline space-x-2 justify-end"><span className="font-semibold text-sm text-orange-600">Customer</span><span className="text-xs text-gray-400">{formatTimestamp(message.timestamp)}</span></div>
                      <div className="bg-orange-100 p-3 rounded-lg mt-1"><p className="text-sm text-gray-900 whitespace-pre-wrap">{message.content}</p></div>
                    </div>
                    <div className="bg-orange-100 p-2 rounded-full"><User size={20} className="text-orange-600" /></div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex gap-2">
            <button onClick={() => setIsChatExpanded(true)} className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded-md ${isChatExpanded ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`} disabled={isChatExpanded}><ChevronUp size={14} /><span>Expand</span></button>
            <button onClick={() => setIsChatExpanded(false)} className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded-md ${!isChatExpanded ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-600 text-white hover:bg-gray-700'}`} disabled={!isChatExpanded}><ChevronDown size={14} /><span>Collapse</span></button>
          </div>
          <button onClick={onClose} className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-semibold px-4 py-2 rounded-md text-sm">Close</button>
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type }) => {
  if (!isOpen) return null;
  const isDelete = type === 'delete';
  const confirmColor = isDelete ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700';
  const icon = isDelete ? <AlertTriangle size={24} className="text-red-500" /> : <BarChart2 size={24} className="text-green-500" />;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XIcon size={20} /></button>
        </div>
        <div className="p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full">{icon}</div>
            <div className="flex-1"><p className="text-sm text-gray-700">{message}</p></div>
          </div>
        </div>
        <div className="flex justify-end items-center p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg space-x-3">
          <button onClick={onClose} className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-semibold px-4 py-2 rounded-md text-sm">Cancel</button>
          <button onClick={onConfirm} className={`text-white font-semibold px-4 py-2 rounded-md text-sm ${confirmColor}`}>{isDelete ? 'Delete' : 'Analyze'}</button>
        </div>
      </div>
    </div>
  );
};

const ErrorBanner = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center justify-between mb-4" role="alert">
      <div className="flex items-center"><Info size={20} className="mr-3" /><div><strong className="font-bold">Connection Error: </strong><span className="block sm:inline">Failed to connect to API. Displaying fallback data. (Error: {message})</span></div></div>
      <button onClick={onClose} className="ml-4 text-red-500 hover:text-red-700"><XIcon size={20} /></button>
    </div>
  );
};

// ===================================================================================
// MAIN COMPONENT: ChatbotDashboard
// ===================================================================================

export const ChatbotDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overviewData, setOverviewData] = useState(null);
  const [showErrorBanner, setShowErrorBanner] = useState(true);
  const [statusFilter, setStatusFilter] = useState(0); 
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [confirmationState, setConfirmationState] = useState({ isOpen: false, type: null, data: null, title: '', message: '' });
  
  // === STATE CHO PHÂN TRANG ===
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const isInitialMount = useRef(true);

  // === TÍNH TOÁN PHÂN TRANG ===
  const allConversations = overviewData?.conversations || [];
  const totalItems = allConversations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedConversations = allConversations.slice(startIndex, startIndex + itemsPerPage);

  const fetchData = useCallback(async () => {
    setShowErrorBanner(true); setError(null);
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/overview`, { method: 'GET', mode: 'cors', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.code === 0 && data.result) { 
        setOverviewData(data.result); 
        setError(null);
        setCurrentPage(1); 
      } 
      else { throw new Error('Invalid data structure from API.'); }
    } catch (err) {
      console.error("Failed to fetch data:", err); setError(err.message); setOverviewData(getFakeData()); setShowErrorBanner(true);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleViewClick = (conversationData) => { setSelectedConversation(conversationData); };
  const handleCloseModal = () => { setSelectedConversation(null); };
  const handleAnalyzeClick = (conversation) => { setConfirmationState({ isOpen: true, type: 'analyze', data: conversation, title: 'Confirm Analysis', message: `Are you sure you want to analyze conversation ID: ${conversation.id}?` }); };
  const handleDeleteClick = (conversation) => { setConfirmationState({ isOpen: true, type: 'delete', data: conversation, title: 'Confirm Deletion', message: `Are you sure you want to delete conversation ID: ${conversation.id}? This action cannot be undone.` }); };
  const handleCloseConfirmation = useCallback(() => { setConfirmationState({ isOpen: false, type: null, data: null, title: '', message: '' }); }, []);

  const executeFilter = useCallback(async () => {
    if (statusFilter === 0) { if (!isInitialMount.current) await fetchData(); return; }
    console.log(`Filtering by status: ${statusFilter}`); setLoading(true); setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/filter-status?status=${statusFilter}`, { method: 'GET', mode: 'cors', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
      if (!response.ok) throw new Error(`Filter API failed! status: ${response.status}`);
      const filteredConversations = await response.json();
      setOverviewData(prevData => ({ stats: prevData?.stats || getFakeData().stats, conversations: filteredConversations }));
      setCurrentPage(1);
    } catch (err) { console.error("Failed to filter data:", err); setError(err.message); setShowErrorBanner(true); } 
    finally { setLoading(false); }
  }, [statusFilter, fetchData]);

  useEffect(() => { if (isInitialMount.current) { isInitialMount.current = false; } else { executeFilter(); } }, [statusFilter, executeFilter]);

  const handleConfirmAction = useCallback(async () => {
    const { type, data } = confirmationState;
    handleCloseConfirmation();
    if (error && !confirmationState.data.id.startsWith('fake_')) { alert("Cannot perform action: API connection failed. Please refresh."); return; }
    try {
      setLoading(true);
      if (type === 'analyze') {
        const response = await fetch(`${API_BASE_URL}/analyze/${data.id}`, { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(`Analyze API failed! status: ${response.status}`);
        await fetchData();
      } else if (type === 'delete') {
        const response = await fetch(`${API_BASE_URL}/delete/${data.id}`, { method: 'DELETE', mode: 'cors' });
        if (!response.ok) throw new Error(`Delete API failed! status: ${response.status}`);
        await fetchData();
      }
    } catch (err) { console.error(`Failed to ${type} conversation:`, err); setError(err.message); setShowErrorBanner(true); } 
    finally { setLoading(false); }
  }, [confirmationState, fetchData, handleCloseConfirmation, error]);

  if (loading && !overviewData) {
    return (
      <MainLayout>
        <div className="flex h-full items-center justify-center">
          <div className="flex items-center text-blue-600 text-xl font-medium px-4 py-2 rounded-lg">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Loading Dashboard...
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!overviewData || !overviewData.stats || !overviewData.conversations) {
    return ( 
      <MainLayout>
        <div className="flex h-full items-center justify-center flex-col">
          <p className="text-xl font-medium text-red-600">Failed to load any data.</p>
          {error && <p className="text-sm text-gray-500 mt-2">{error}</p>}
        </div>
      </MainLayout> 
    );
  }

  const derivedStats = [
    { id: 1, title: 'Total Conversations', value: overviewData.stats.totalConversations, icon: MessagesSquare, color: 'blue' },
    { id: 2, title: 'Analyzed', value: overviewData.stats.analyzedCount, icon: LineChart, color: 'green' },
    { id: 3, title: 'Pending', value: overviewData.stats.pendingCount, icon: Clock, color: 'yellow' },
    { id: 4, title: 'Potential (Good)', value: overviewData.stats.potentialCount, icon: CheckCircle2, color: 'green' },
    { id: 5, title: 'Spam', value: overviewData.stats.spamCount, icon: XCircle, color: 'red' },
  ];

  return (
    <MainLayout>
      <div className="relative">
        {loading && (
          <div className="fixed top-4 right-4 z-[100]">
            <div className="flex items-center bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Loading...
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-8 whitespace-nowrap">Manage user conversation</h1>
        {error && showErrorBanner && <ErrorBanner message={error} onClose={() => setShowErrorBanner(false)} />}

        <div className="space-y-6 mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {derivedStats.map((stat) => (
                <StatItem 
                  key={stat.id} 
                  title={stat.title} 
                  value={stat.value} 
                  icon={stat.icon} 
                  color={stat.color} 
                />
              ))}
            </div>
          </div>

          <ConversationsChart dailyStats={overviewData.stats.dailyStats} totalConversations={overviewData.stats.totalConversations} />
          <ConversationsFilterTabs currentFilterValue={statusFilter} onFilterChange={setStatusFilter} />
          
          <ConversationsTable 
            conversations={paginatedConversations} 
            onViewClick={handleViewClick} 
            onAnalyzeClick={handleAnalyzeClick} 
            onDeleteClick={handleDeleteClick}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>

        <ConversationDetailModal conversation={selectedConversation} onClose={handleCloseModal} />
        <ConfirmationModal isOpen={confirmationState.isOpen} onClose={handleCloseConfirmation} onConfirm={handleConfirmAction} title={confirmationState.title} message={confirmationState.message} type={confirmationState.type} />
      </div>
    </MainLayout>
  );
};
import { LogOut, PanelLeftIcon, PenSquare, Plus, User, Coins, MessageSquare, PanelRightIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { getConversations } from '../features/getConversations.js';
import { useDispatch, useSelector } from 'react-redux';
import { setConversations, addConversations, setSelectedConversation } from '../redux/conversationSlice.js';
import { createConversation } from '../features/createConversation.js';
import logout from '../features/logout.js';
import { setUserdata } from '../redux/UserSlice.js';

function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  // fetch the conversation from the redux store
  const { conversations, selectedConversation } = useSelector(state => state.conversation);
  // get user data from user Slice
  const { userData } = useSelector(state => state.user);
  // state to store profile image error in footer section
  const [imageError, setImageError] = useState(false);

  // get the conversation and also add to redux store
  useEffect(() => {
    const getConv = async () => {
      const data = await getConversations();
      dispatch(setConversations(data));
    }
    getConv();
  }, [userData?._id]);

  // on click of new chat 
  const handleCreateConversation = async () => {
    const data = await createConversation();
    dispatch(addConversations(data));
  }

  // collapsed sidebar view
  if (collapsed) {
    return (
      <div className='hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-2 shrink-0'>
        <button
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
          onClick={() => setCollapsed(false)}
          title="Expand Sidebar"
        >
          <PanelRightIcon size={18} />
        </button>

        <button
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
          onClick={handleCreateConversation}
          title="New Chat"
        >
          <Plus size={17}/>
        </button>

        <div className='flex-1 w-full overflow-y-auto px-2 py-2 flex flex-col items-center gap-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {conversations.map((conv, i) => {
            const isActive = (selectedConversation?._id || selectedConversation?.id) === (conv?._id || conv?.id);
            const convId = conv?._id || conv?.id || i;
            return (
              <button
                key={convId}
                onClick={() => dispatch(setSelectedConversation(conv))}
                title={conv?.title || "New Chat"}
                className={`flex items-center justify-center w-9 h-9 shrink-0 rounded-xl transition-colors duration-150 border-none cursor-pointer ${
                  isActive 
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                    : 'bg-transparent text-slate-500 hover:text-slate-200 hover:bg-white/[0.05]'
                }`}
              >
                <MessageSquare size={16} />
              </button>
            )
          })}
        </div>

        <div className="relative shrink-0">
          {(userData?.avatar && !imageError) ? (
            <img
              src={userData?.avatar}
              alt="Avatar"
              onError={() => setImageError(true)}
              className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
            />
          ) : (
            <div className="w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center">
              <User size={15} className='text-slate-400' />
            </div>
          )}
        </div>
      </div>
    );
  }

  // expanded sidebar view
  return (
    <div className='fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]'>
      <div className='flex flex-col h-full'>
        {/* HEADER DIV */}
        <div className='flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]'>
          <div 
            className='hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
            onClick={() => setCollapsed(true)}
            title="Collapse Sidebar"
          >
            <PanelLeftIcon size={18} />
          </div>
          <span className='text-[16px] font-semibold text-slate-100 tracking-tight flex-1'>CortexAI</span>
          <span className='text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide'>
            free
          </span>
          <button 
            className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
            onClick={handleCreateConversation}
            title="New Chat"
          >
            <PenSquare size={14} />
          </button>
        </div>

        {/* Add conversation button */}
        <div className='px-4 pt-4 pb-1'>
          <button 
            className='w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150'
            onClick={handleCreateConversation}
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        {/* conversations header */}
        <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
          {conversations.length === 0 ? 'No Recent Conversation' : 'Recents Conversation'}
        </div>

        {/* conversations list of chats */}
        <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {conversations.map((conv, i) => {
            const isActive = (selectedConversation?._id || selectedConversation?.id) === (conv?._id || conv?.id);
            const convId = conv?._id || conv?.id || i;
            return (
              <div
                key={convId}
                onClick={() => dispatch(setSelectedConversation(conv))}
                className={`flex items-center gap-2.5 cursor-pointer mb-1 px-3 py-2.5 rounded-[10px] transition-colors duration-150 ${
                  isActive 
                    ? 'bg-indigo-500/10 border border-indigo-500/[0.18]' 
                    : 'bg-transparent border border-transparent hover:bg-white/[0.05]'
                }`}
              >
                <div className={`flex items-center justify-center shrink-0 w-7 h-7 rounded-lg transition-colors duration-150 ${
                  isActive ? "text-indigo-400 bg-indigo-500/15" : "bg-white/[0.05] text-slate-500"
                }`}>
                  <MessageSquare size={13} />
                </div>
                <span className={`text-[13px] font-medium truncate flex-1 min-w-0 ${isActive ? "text-slate-100" : "text-slate-300"}`}>
                  {conv?.title || "New Chat"}
                </span>
              </div>
            );
          })}
        </div>

        {/* profile section footer */}
        <div className="mx-2.5 h-px bg-white/[0.06]"></div>

        <div className='px-3.5 py-3.5'>
          {userData ? (
            <div className='flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150'>
              <div className="relative shrink-0">
                {(userData?.avatar && !imageError) ? (
                  <img
                    src={userData?.avatar}
                    alt="Avatar"
                    onError={() => setImageError(true)}
                    className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center">
                    <User size={15} className='text-slate-400' />
                  </div>
                )}
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-[13.5px] font-semibold text-slate-100 truncate'>{userData?.name || "user"}</p>
                <p className='text-[11px] text-slate-600 mt-px'>Free Plan</p>
              </div>

              <div className='flex gap-1'>
                <button className='flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/[0.08] transition-all duration-150'>
                  <Coins size={16} />
                </button>
                <button
                  onClick={() => {
                    logout();
                    dispatch(setUserdata(null));
                  }}
                  className='flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-slate-600 cursor-pointer hover:bg-white/[0.08] transition-all duration-150'
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button className='w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-200 bg-white/[0.05] border-white/[0.08] rounded-xl py-[11px] cursor-pointer hover:bg-white/[0.08] transition-colors duration-150'>
              Login
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
import { MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';

interface LiveChatButtonProps {
  onlineUsers?: number;
}

export function LiveChatButton({ onlineUsers = 142 }: LiveChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Event Host', message: 'Welcome to the event! Feel free to ask any questions.', timestamp: '10:30 AM', isHost: true },
    { id: 2, user: 'Sarah Johnson', message: 'Great presentation so far!', timestamp: '10:32 AM', isHost: false },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isHost: false,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-1/2 -translate-y-1/2 right-0 z-50 flex flex-col items-center gap-3 px-4 py-6 bg-gradient-to-b from-[#10B759] to-[#0E9F4D] text-white rounded-l-2xl shadow-lg hover:shadow-xl transition-all hover:pr-5"
          style={{ boxShadow: '0 4px 20px rgba(16, 183, 89, 0.3)' }}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="font-bold text-sm tracking-wider" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>LIVE CHAT</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-lg shadow-2xl border border-slate-200 flex flex-col"
          style={{ 
            height: '600px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5" />
              <div>
                <h3 className="font-semibold text-lg">Live Chat</h3>
                <p className="text-xs text-white/80">{onlineUsers} participants online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold ${msg.isHost ? 'text-[#10B759]' : 'text-[#5B7C8F]'}`}>
                    {msg.user}
                  </span>
                  <span className="text-xs text-slate-400">{msg.timestamp}</span>
                </div>
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.user === 'You'
                      ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                      : msg.isHost
                      ? 'bg-[#10B759]/10 text-slate-800 border border-[#10B759]/20'
                      : 'bg-white text-slate-800 border border-slate-200'
                  }`}
                  style={{
                    borderRadius: '4px',
                    boxShadow: msg.user === 'You' ? '0 2px 8px rgba(16, 183, 89, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 bg-white rounded-b-lg">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
                style={{ borderRadius: '4px' }}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                style={{ 
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(16, 183, 89, 0.2)'
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  switchUser,
  sendMessage,
  createGroup,
  switchGroup,
} from "./store/features/chatSlice";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.chat.currentUser);
  const currentGroupId = useSelector((state) => state.chat.currentGroupId);
  const groups = useSelector((state) => state.chat.groups);
  const currentGroup = groups.find((g) => g.id === currentGroupId);

  const [newMessage, setNewMessage] = useState("");
  const [newGroupTitle, setNewGroupTitle] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      dispatch(sendMessage(newMessage));
      setNewMessage("");
    }
  };

  const handleCreateGroup = () => {
    if (newGroupTitle.trim() !== "") {
      dispatch(createGroup(newGroupTitle));
      setNewGroupTitle("");
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Teams</h2>
          <ul className="space-y-2">
            {groups.map((group) => (
              <li
                key={group.id}
                onClick={() => dispatch(switchGroup(group.id))}
                className={`cursor-pointer p-2 rounded hover:bg-gray-700 ${
                  group.id === currentGroupId ? "bg-gray-700" : ""
                }`}
              >
                # {group.title}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <input
              type="text"
              className="w-full mb-2 px-2 py-1 text-black rounded"
              placeholder="New group title"
              value={newGroupTitle}
              onChange={(e) => setNewGroupTitle(e.target.value)}
            />
            <button
              onClick={handleCreateGroup}
              className="w-full bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
            >
              Create Group
            </button>
          </div>
        </div>

        <button
          onClick={() => dispatch(switchUser())}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded w-full mt-4"
        >
          Switch to {currentUser === "Alice" ? "Bob" : "Alice"}
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold"># {currentGroup?.title}</h3>
          <span className="text-sm text-gray-600">
            Logged in as: {currentUser}
          </span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-4">
          {currentGroup?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded shadow max-w-xs ${
                  msg.sender === currentUser
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                <p className="text-xs font-bold mb-1">{msg.sender}</p>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

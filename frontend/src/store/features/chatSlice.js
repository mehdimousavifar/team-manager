import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "Alice",
  currentGroupId: 1,
  groups: [
    {
      id: 1,
      title: "General",
      messages: [
        { id: 1, sender: "Alice", content: "Hey Bob, ready to work?" },
        { id: 2, sender: "Bob", content: "Yeah, let's go!" },
      ],
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    switchUser: (state) => {
      state.currentUser = state.currentUser === "Alice" ? "Bob" : "Alice";
    },
    switchGroup: (state, action) => {
      state.currentGroupId = action.payload;
    },
    sendMessage: (state, action) => {
      const group = state.groups.find((g) => g.id === state.currentGroupId);
      if (group) {
        group.messages.push({
          id: group.messages.length + 1,
          sender: state.currentUser,
          content: action.payload,
        });
      }
    },
    createGroup: (state, action) => {
      const newGroup = {
        id: nanoid(),
        title: action.payload,
        messages: [],
      };
      state.groups.push(newGroup);
      state.currentGroupId = newGroup.id;
    },
  },
});

export const { switchUser, sendMessage, createGroup, switchGroup } = chatSlice.actions;
export default chatSlice.reducer;
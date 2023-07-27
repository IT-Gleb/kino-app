import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const ticketSlice = createSlice({
  name: "Tickets",
  initialState: {
    pZalData: {},
    tickets: [],
    reUpdate: 0,
  },
  reducers: {
    addTicket(state, action) {
      //console.log(action.payload);
      state.tickets.push(action.payload);
      // console.log(state.tickets.length);
    },
    removeTicket(state, action) {
      //console.log(action.payload);
      state.tickets = state.tickets.filter((value) => {
        return value.id !== action.payload.id;
      });
      // console.log(state.tickets.length);
    },
    initTikets(state, action) {
      state.tickets = cloneDeep(action.payload);
    },
    clearTikets(state, action) {
      state.tickets.length = 0;
      state.tickets = [];
      //state.pZalData = {};
    },
    saveZalData(state, action) {
      //console.log(action.payload);
      state.pZalData = cloneDeep(action.payload);
    },
    updateRe(state, action) {
      state.reUpdate = action.payload;
    },
  },
});

export const {
  addTicket,
  removeTicket,
  initTikets,
  clearTikets,
  saveZalData,
  updateRe,
} = ticketSlice.actions;
export default ticketSlice.reducer;

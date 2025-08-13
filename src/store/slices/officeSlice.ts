import { createSlice } from '@reduxjs/toolkit';
import type { officeReservationState, LocationData } from '@/type/office';
const initialState: officeReservationState = {
  resInfo: {
    total: 0,
    officeTotal: 0,
    desksTotal: 0,
    startDate: null,
    endDate: null,
    resDesks: [],
    resOffice: null,
  },
};
const officeReservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setTotal(state) {
      state.resInfo.total =
        state.resInfo.desksTotal + state.resInfo.officeTotal;
    },
    setOffice(state, action: { payload: LocationData | null }) {
      state.resInfo.resOffice = action.payload;
    },
    setDesks(state, action) {
      state.resInfo.resDesks.push(action.payload);
      state.resInfo.desksTotal = state.resInfo.resDesks.reduce(
        (sum, desk) => sum + (desk.basePrice || 0),
        0,
      );
      state.resInfo.total =
        state.resInfo.desksTotal + state.resInfo.officeTotal;
    },
    removeDesk(state, action) {
      const idx = state.resInfo.resDesks.findIndex(
        (desk) => desk.id === action.payload,
      );
      if (idx !== -1) {
        state.resInfo.resDesks.splice(idx, 1);
      }
      state.resInfo.desksTotal = state.resInfo.resDesks.reduce(
        (sum, desk) => sum + (desk.basePrice || 0),
        0,
      );
      state.resInfo.total =
        state.resInfo.desksTotal + state.resInfo.officeTotal;
    },
    setOfficeTotal(state, action) {
      if (state.resInfo.resOffice !== null) {
        state.resInfo.officeTotal =
          (state.resInfo.resOffice.price / 31) * action.payload.duration;
      }
    },
    setReservation(state, action) {
      if (action.payload.fromDate && action.payload.toDate) {
        state.resInfo.startDate = action.payload.fromDate;
        state.resInfo.endDate = action.payload.toDate;
      }
    },
  },
});
export const {
  setTotal,
  setDesks,
  removeDesk,
  setOfficeTotal,
  setReservation,
  setOffice,
} = officeReservationSlice.actions;
export default officeReservationSlice.reducer;

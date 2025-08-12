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

    setOfficeTotal(state, action) {
      if (state.resInfo.resOffice !== null) {
        state.resInfo.officeTotal =
          (state.resInfo.resOffice.price / 31) * action.payload.duration;
      }
    },
    setStartDate() {},
    setEndDate() {},
  },
});
export const {
  setTotal,
  setDesks,
  setOfficeTotal,
  setStartDate,
  setEndDate,
  setOffice,
} = officeReservationSlice.actions;
export default officeReservationSlice.reducer;

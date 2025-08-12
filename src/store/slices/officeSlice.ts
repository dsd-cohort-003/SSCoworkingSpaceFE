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
    setDeskTotal(state, action) {
      state.resInfo.desksTotal += action.payload;
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
  setDeskTotal,
  setOfficeTotal,
  setStartDate,
  setEndDate,
  setOffice,
} = officeReservationSlice.actions;
export default officeReservationSlice.reducer;

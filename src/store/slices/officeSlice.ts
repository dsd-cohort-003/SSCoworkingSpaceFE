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
      console.log(state.resInfo.total);
    },
    setOffice(state, action: { payload: LocationData | null }) {
      state.resInfo.resOffice = action.payload;
      console.log(action.payload);
    },
    setDeskTotal(state, action) {
      state.resInfo.desksTotal += action.payload;

      console.log(state.resInfo.desksTotal);
    },
    setStartDate() {},
    setEndDate() {},
  },
});
export const { setTotal, setDeskTotal, setStartDate, setEndDate, setOffice } =
  officeReservationSlice.actions;
export default officeReservationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { LocationData } from '@/type/office';
import type { OfficeDesk } from '@/services/desksApi';

interface ReservationInfo {
  total: number | 0;
  officeTotal: number | 0;
  desksTotal: number | 0;
  startDate: Date | null;
  endDate: Date | null;
  reservedOffice: LocationData | null;
}
interface officeReservationState {
  office: LocationData | 0;
  resDesks: OfficeDesk[] | null;
  resInfo: ReservationInfo;
}
const initialState: officeReservationState = {
  office: 0,
  resDesks: [],
  resInfo: {
    total: 0,
    officeTotal: 0,
    desksTotal: 0,
    startDate: null,
    endDate: null,
    reservedOffice: null,
  },
};
const officeReservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setTotal(state) {
      if (state.resInfo) {
        state.resInfo.total =
          state.resInfo.desksTotal + state.resInfo.officeTotal;
      }
    },
    setOfficeTotal() {},
    setDeskTotal() {},
    setStartDate() {},
    setEndDate() {},
    setOffice() {},
  },
});
export const {
  setTotal,
  setOfficeTotal,
  setDeskTotal,
  setStartDate,
  setEndDate,
  setOffice,
} = officeReservationSlice.actions;
export default officeReservationSlice.reducer;

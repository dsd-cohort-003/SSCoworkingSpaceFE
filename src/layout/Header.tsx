import { NavLink } from 'react-router';

export default function Header() {
  return (
    <nav className="flex gap-4">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/booking">Booking</NavLink>
      {/*Remove later used only for dev easy access*/}
      <NavLink to="/booking/rooms">Room Booking</NavLink>
      <NavLink to="/booking/desks">Desk Booking</NavLink>
      <NavLink to="/booking/confirmation">Confirmation</NavLink>
      <NavLink to="/maintenance">Maintenance</NavLink>
      <NavLink to="/resources">Resources</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/billing">Billing</NavLink>
    </nav>
  );
}

import { useState, useEffect } from 'react';
import { deleteTicket, fetchAllTickets } from '../api/maintenanceService';
import type { MaintenanceTicket } from '../type/maintenanceTicket';
import { useNavigate } from 'react-router';

export default function MaintenanceDashboard() {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchAllTickets();
        setTickets(data);
      } catch (err) {
        console.log(err);
        setError('Failed to load tickets');
      } finally {
        setLoading(false);
      }
    };
    loadTickets();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.log(err);
      alert('Failed to delete ticket');
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/maintenance/edit/${id}`);
  };

  return (
    <div
      style={{
        padding: 20,
        paddingTop: 100,
        maxWidth: 800,
        margin: '0 auto',
        fontFamily: 'sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 30,
          textAlign: 'center',
        }}
      >
        Maintenance Dashboard
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : tickets.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                padding: 16,
                border: '1px solid #ddd',
                borderRadius: 8,
                background: '#fafafa',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ margin: '0 0 8px 0' }}>{ticket.title}</h2>
              <p style={{ margin: '4px 0' }}>
                <strong>Status:</strong> {ticket.status}
              </p>
              <p style={{ margin: '4px 0' }}>
                <strong>Location:</strong> {ticket.location}
              </p>
              {ticket.user && (
                <>
                  <p style={{ margin: '4px 0' }}>
                    <strong>User:</strong> {ticket.user.username}
                  </p>
                  <p style={{ margin: '4px 0' }}>
                    <strong>Email:</strong> {ticket.user.email}
                  </p>
                </>
              )}
              <div style={{ marginTop: 12 }}>
                <button
                  onClick={() => handleEdit(ticket.id)}
                  style={{ marginRight: 8 }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(ticket.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

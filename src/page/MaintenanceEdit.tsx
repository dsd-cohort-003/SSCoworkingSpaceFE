import { fetchTicketById, updateTicketAdmin } from '@/api/maintenanceService';
import type { MaintenanceTicket } from '@/type/maintenanceTicket';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MaintenanceEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Partial<MaintenanceTicket>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const assigneeOptions = [
    'maintenance1@example.com',
    'techsupport@example.com',
    'admin@example.com',
  ];
  const statusOptions = ['open', 'in_progress', 'closed'];

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTicketById(Number(id));
        setTicket(data);
      } catch {
        setError('Failed to load ticket');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTicketAdmin(ticket as MaintenanceTicket);
      alert('Ticket updated');
      navigate('/maintenance/dashboard');
    } catch {
      setError('Update failed');
    }
  };

  if (loading)
    return <p style={{ paddingTop: 100, textAlign: 'center' }}>Loading...</p>;
  if (error)
    return (
      <p style={{ color: 'red', paddingTop: 100, textAlign: 'center' }}>
        {error}
      </p>
    );

  return (
    <div
      style={{
        padding: 20,
        paddingTop: 100,
        maxWidth: 700,
        margin: '0 auto',
        fontFamily: 'sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        Edit Maintenance Ticket
      </h1>

      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 14 }}>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Enable Admin Mode
        </label>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          background: '#fafafa',
          padding: 24,
          border: '1px solid #ddd',
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <input
          name="title"
          value={ticket.title ?? ''}
          onChange={handleChange}
          placeholder="Title"
          style={{ padding: 10, fontSize: 16 }}
        />

        <input
          name="category"
          value={ticket.category ?? ''}
          onChange={handleChange}
          placeholder="Category"
          style={{ padding: 10, fontSize: 16 }}
        />

        <input
          name="location"
          value={ticket.location ?? ''}
          onChange={handleChange}
          placeholder="Location"
          style={{ padding: 10, fontSize: 16 }}
        />

        <textarea
          name="description"
          value={ticket.description ?? ''}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          style={{ padding: 10, fontSize: 16 }}
        />

        {isAdmin ? (
          <>
            <div>
              <label style={{ fontWeight: 'bold' }}>Status:</label>
              <select
                name="status"
                value={ticket.status ?? ''}
                onChange={handleChange}
                style={{
                  padding: 10,
                  fontSize: 16,
                  width: '100%',
                  marginTop: 4,
                }}
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 'bold' }}>Assignee:</label>
              <select
                name="assignees"
                value={ticket.assignees ?? ''}
                onChange={handleChange}
                style={{
                  padding: 10,
                  fontSize: 16,
                  width: '100%',
                  marginTop: 4,
                }}
              >
                <option value="">-- None --</option>
                {assigneeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            <input
              name="status"
              value={ticket.status ?? ''}
              readOnly
              placeholder="Status (view only)"
              style={{ padding: 10, fontSize: 16, backgroundColor: '#eee' }}
            />
            <input
              name="assignees"
              value={ticket.assignees ?? ''}
              readOnly
              placeholder="Assignee (view only)"
              style={{ padding: 10, fontSize: 16, backgroundColor: '#eee' }}
            />
          </>
        )}

        <button
          type="submit"
          style={{
            padding: 12,
            fontSize: 16,
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            marginTop: 10,
          }}
        >
          Update
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

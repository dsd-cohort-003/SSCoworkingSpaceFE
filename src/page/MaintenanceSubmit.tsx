import { createTicket, fetchTicketsByUser } from '@/api/maintenanceService';
import type {
  MaintenanceTicket,
  MaintenanceTicketDTO,
} from '@/type/maintenanceTicket';
import { useEffect, useState } from 'react';

const TEMP_USER_ID = 1;

const categoryOptions = [
  'Plumbing',
  'Electrical',
  'HVAC',
  'Pest Control',
  'Other',
];
const locationOptions = [
  'Kitchen',
  'Bathroom',
  'Living Room',
  'Bedroom',
  'Outside',
];

export default function MaintenanceSubmit() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    image: '',
  });

  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const userTickets = await fetchTicketsByUser(TEMP_USER_ID);
        setTickets(userTickets);
      } catch (err) {
        console.log(err);
        setError('Failed to load user tickets');
      }
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!formData.category) {
      setError('Category is required.');
      return;
    }
    if (!formData.location) {
      setError('Location is required.');
      return;
    }

    setSubmitting(true);
    try {
      const ticket: MaintenanceTicketDTO = {
        title: formData.title,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        userId: TEMP_USER_ID,
        status: 'open',
        image: formData.image || '',
      };
      const created = await createTicket(ticket);
      setTickets((prev) => [created, ...prev]);
      setFormData({
        title: '',
        category: '',
        location: '',
        description: '',
        image: '',
      });
      alert('Ticket submitted successfully');
    } catch (err) {
      console.log(err);
      setError('Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file.name }));
      console.log(formData.image);
    }
  };

  return (
    <div
      style={{
        padding: 20,
        paddingTop: 100,
        maxWidth: 600,
        margin: '0 auto',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ marginBottom: 20 }}>Submit Maintenance Ticket</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 15 }}
      >
        <input
          placeholder="Title (required)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={{ padding: 10, fontSize: 16 }}
        />
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          style={{ padding: 10, fontSize: 16 }}
        >
          <option value="">Select Category (required)</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          style={{ padding: 10, fontSize: 16 }}
        >
          <option value="">Select Location (required)</option>
          {locationOptions.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          style={{ padding: 10, fontSize: 16 }}
        />
        <input type="file" onChange={handleFileChange} />
        {formData.image && <small>Selected file: {formData.image}</small>}
        <button
          type="submit"
          disabled={submitting}
          style={{ padding: 12, fontSize: 16, cursor: 'pointer' }}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

      <h2 style={{ marginTop: 40 }}>My Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets submitted.</p>
      ) : (
        <ul style={{ paddingLeft: 20 }}>
          {tickets.map((t) => (
            <li key={t.id}>
              <strong>{t.title}</strong> - {t.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { uploadImage } from '@/api/imageService';
import { createTicket, fetchTicketsByUser } from '@/api/maintenanceService';
import type {
  MaintenanceTicket,
  MaintenanceTicketDTO,
} from '@/type/maintenanceTicket';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const userTickets = await fetchTicketsByUser(TEMP_USER_ID);
        setTickets(userTickets);
      } catch (err) {
        console.error(err);
        setError('Failed to load user tickets');
      }
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) return setError('Title is required.');
    if (!formData.category) return setError('Category is required.');
    if (!formData.location) return setError('Location is required.');

    setSubmitting(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const ticket: MaintenanceTicketDTO = {
        title: formData.title,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        userId: TEMP_USER_ID,
        status: 'open',
        image: imageUrl,
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
      setImageFile(null);
      alert('Ticket submitted successfully');
    } catch (err) {
      console.error(err);
      setError('Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      setImageFile(file);
    } else {
      setImageFile(null);
      setError('Only PNG or JPEG images are allowed.');
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
        maxWidth: 600,
        margin: '0 auto',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 className="text-2xl font-bold mb-6">Submit Maintenance Ticket</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md"
      >
        <input
          placeholder="Title (required)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
        />
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 cursor-pointer"
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
          className="w-full border rounded-lg px-3 py-2 cursor-pointer"
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
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        {imageFile && (
          <small>
            Selected file: {imageFile.name} (
            {(imageFile.size / 1024).toFixed(1)} KB)
          </small>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

      <h2 className="text-xl font-semibold mt-10 mb-4">My Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets submitted.</p>
      ) : (
        <ul className="space-y-3">
          {tickets.map((t) => (
            <li
              key={t.id}
              className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center"
            >
              <p>
                <strong>{t.title}</strong> - {t.status}
              </p>
              <button
                onClick={() => handleEdit(t.id)}
                className="text-gray-800 font-bold cursor-pointer"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

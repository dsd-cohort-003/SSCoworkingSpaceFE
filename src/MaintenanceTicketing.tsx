import { useState, useEffect } from 'react';
import {
  maintenanceApi,
  type MaintenanceTicket,
} from './services/maintenanceApi';

interface TicketData {
  issueTitle: string;
  category: string;
  location: string;
  description: string;
  photo?: File;
}

const CATEGORIES = [
  'Electrical',
  'Plumbing',
  'Internet',
  'Cleaning',
  'HVAC',
  'Furniture',
  'Other',
];

const LOCATIONS = ['Suite 100', 'Suite 175', 'Suite 200'];

export default function TicketSubmission() {
  const [ticketData, setTicketData] = useState<TicketData>({
    issueTitle: '',
    category: '',
    location: '',
    description: '',
  });

  const [existingTickets, setExistingTickets] = useState<MaintenanceTicket[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing tickets on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const tickets = await maintenanceApi.getAllTickets();
        setExistingTickets(tickets);
      } catch (err) {
        setError(
          'Failed to load tickets. Please check if the backend is running.',
        );
        console.error('Error fetching tickets:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleInputChange = (field: keyof TicketData, value: string | File) => {
    setTicketData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange('photo', file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create ticket object for API (excluding photo for now)
      const newTicket = {
        issueTitle: ticketData.issueTitle,
        category: ticketData.category,
        location: ticketData.location,
        description: ticketData.description,
        // Note: Photo upload would need additional handling for file storage
      };

      const createdTicket = await maintenanceApi.createTicket(newTicket);

      // Add the new ticket to the existing tickets list
      setExistingTickets((prev) => [createdTicket, ...prev]);

      // Reset form
      setTicketData({
        issueTitle: '',
        category: '',
        location: '',
        description: '',
      });

      alert('Ticket submitted successfully!');
    } catch (err) {
      setError('Failed to submit ticket. Please try again.');
      console.error('Error creating ticket:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'green';
      case 'in_progress':
        return 'orange';
      case 'resolved':
        return 'gray';
      default:
        return 'black';
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'white',
        minHeight: '100vh',
      }}
    >
      {error && (
        <div
          style={{
            backgroundColor: '#fee',
            color: '#c00',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Left side - My Tickets */}
        <div
          style={{
            width: '300px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            height: 'fit-content',
          }}
        >
          <h2
            style={{
              marginBottom: '20px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
              borderBottom: '2px solid black',
              paddingBottom: '10px',
            }}
          >
            View My Tickets
          </h2>

          <div
            style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              borderBottom: '1px solid gray',
              paddingBottom: '5px',
            }}
          >
            <span>Title</span>
            <span>Status</span>
            <span>Created</span>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              Loading tickets...
            </div>
          ) : existingTickets.length === 0 ? (
            <div
              style={{ textAlign: 'center', padding: '20px', color: 'gray' }}
            >
              No tickets found
            </div>
          ) : (
            existingTickets.map((ticket) => (
              <div
                key={ticket.id}
                style={{
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                }}
              >
                <span
                  style={{
                    maxWidth: '80px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {ticket.issueTitle}
                </span>
                <span
                  style={{
                    color: getStatusColor(ticket.ticketProgress || 'open'),
                  }}
                >
                  {ticket.ticketProgress || 'Open'}
                </span>
                <span style={{ fontSize: '12px' }}>
                  {ticket.issueDate ? formatDate(ticket.issueDate) : 'N/A'}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Right side - Submit Ticket Form */}
        <div
          style={{
            flex: '1',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
          }}
        >
          <h1
            style={{
              marginBottom: '30px',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
              borderBottom: '3px solid blue',
              paddingBottom: '15px',
            }}
          >
            Submit a Ticket
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Issue Title */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                Issue Title
              </label>
              <input
                type="text"
                value={ticketData.issueTitle}
                onChange={(e) =>
                  handleInputChange('issueTitle', e.target.value)
                }
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            {/* Category */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                Category
              </label>
              <select
                value={ticketData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                Location
              </label>
              <select
                value={ticketData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
                required
              >
                <option value="">Select a location</option>
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                Description
              </label>
              <textarea
                value={ticketData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '16px',
                  minHeight: '100px',
                  resize: 'vertical',
                }}
                placeholder="Detailed description of the issue"
                required
              />
            </div>

            {/* Photo Upload */}
            <div style={{ marginBottom: '30px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                Photo (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

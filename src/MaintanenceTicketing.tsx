import { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ticket submitted:', ticketData);
    alert('Ticket submitted successfully!');
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'white',
        minHeight: '100vh',
      }}
    >
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

          <div
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Test</span>
            <span style={{ color: 'green' }}>Open</span>
            <span>7/12/25</span>
          </div>

          <div
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Test</span>
            <span style={{ color: 'orange' }}>In Progress</span>
            <span>7/12/25</span>
          </div>

          <div
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Test</span>
            <span style={{ color: 'gray' }}>Resolved</span>
            <span>7/12/25</span>
          </div>
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
                  padding: '10px',
                  backgroundColor: 'lightgray',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                }}
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
                  padding: '10px',
                  backgroundColor: 'lightgray',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
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
                  padding: '10px',
                  backgroundColor: 'lightgray',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
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
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  resize: 'none',
                }}
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
                  padding: '10px',
                  backgroundColor: 'lightgray',
                  borderRadius: '5px',
                  border: 'none',
                }}
              />
              {ticketData.photo && (
                <p
                  style={{ marginTop: '5px', fontSize: '12px', color: 'gray' }}
                >
                  Selected: {ticketData.photo.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: 'blue',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

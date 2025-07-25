export interface MaintenanceTicket {
  id?: number;
  issueTitle: string;
  issueDate?: string;
  userId?: number;
  ticketProgress?: string;
  category: string;
  location: string;
  description: string;
  assignees?: string;
  image?: string;
}

const API_BASE_URL = 'http://localhost:8080/api';

export const maintenanceApi = {
  // Get all maintenance tickets
  getAllTickets: async (): Promise<MaintenanceTicket[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/maintenance`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }
  },

  // Get single ticket by ID
  getTicketById: async (id: number): Promise<MaintenanceTicket> => {
    try {
      const response = await fetch(`${API_BASE_URL}/maintenance/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw error;
    }
  },

  // Create new maintenance ticket
  createTicket: async (
    ticket: Omit<MaintenanceTicket, 'id' | 'issueDate'>,
  ): Promise<MaintenanceTicket> => {
    try {
      const response = await fetch(`${API_BASE_URL}/maintenance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  },
};

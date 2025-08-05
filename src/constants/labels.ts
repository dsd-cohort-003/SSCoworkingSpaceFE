export const LABELS = {
  ACTIONS: {
    CONTINUE: 'Continue',
    BACK: 'Back',
    SKIP: 'Skip',
    CANCEL: 'Cancel',
    CONFIRM: 'Confirm',
    SAVE: 'Save',
    EDIT: 'Edit',
    DELETE: 'Delete',
    ADD: 'Add',
    REMOVE: 'Remove',
    SEARCH: 'Search',
    FILTER: 'Filter',
    CLEAR: 'Clear',
    RESET: 'Reset',
    SUBMIT: 'Submit',
    CLOSE: 'Close',
    OK: 'OK',
    YES: 'Yes',
    NO: 'No',
  },

  BOOKING: {
    STEPS: {
      CHOOSE_LOCATION: 'Choose Location',
      CHOOSE_DESK: 'Choose Desk',
      CHOOSE_RESOURCES: 'Choose Resources',
      CONFIRMATION: 'Confirmation',
    },
    TITLES: {
      SELECT_WORKSPACE: 'Select Your Workspace',
      AVAILABLE_RESOURCES: 'Available Resources',
      BOOKING_SUMMARY: 'Booking Summary',
      BOOKING_CONFIRMATION: 'Booking Confirmation',
      BOOKING_THANKS: 'Thank you for your reservation!',
    },
    DESCRIPTIONS: {
      SELECT_DATES: 'Select your preferred dates and workspace type',
      ADD_RESOURCES:
        'Add equipment and services to enhance your workspace experience',
      REVIEW_BOOKING: 'Review your booking details before confirming',
      THANKS_MESSAGE:
        "We will review your application and reply soon if it's approved.",
    },
    LABELS: {
      FROM_DATE: 'From',
      TO_DATE: 'To',
      WORKSPACE_TYPE: 'Workspace Type',
      DURATION: 'Duration',
      SUBTOTAL: 'Subtotal',
      TAX: 'Tax',
      TOTAL: 'Total',
      CART: 'Cart',
      QUANTITY: 'Quantity',
      PRICE: 'Price',
      AVAILABLE: 'Available',
      UNAVAILABLE: 'Unavailable',
      PER_DAY: 'per day',
      PER_HOUR: 'per hour',
      DAYS: 'days',
      HOURS: 'hours',
    },
    MESSAGES: {
      CART_EMPTY: 'Your cart is empty',
      NO_RESOURCES_SELECTED: 'No additional resources selected',
      BOOKING_CONFIRMED: 'Your booking has been confirmed!',
      SKIP_RESOURCES: 'Skip Resources',
    },
  },

  FORMS: {
    PLACEHOLDERS: {
      SEARCH: 'Search...',
      EMAIL: 'Enter your email',
      PASSWORD: 'Enter your password',
      NAME: 'Enter your name',
      PHONE: 'Enter your phone number',
    },
    VALIDATION: {
      REQUIRED: 'This field is required',
      INVALID_EMAIL: 'Please enter a valid email address',
      PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
      PASSWORDS_DONT_MATCH: 'Passwords do not match',
    },
  },

  STATUS: {
    LOADING: 'Loading...',
    SAVING: 'Saving...',
    SUCCESS: 'Success!',
    ERROR: 'An error occurred',
    NO_RESULTS: 'No results found',
    TRY_AGAIN: 'Please try again',
  },

  NAVIGATION: {
    HOME: 'Home',
    LOCATIONS: 'Locations',
    BOOKING: 'Book Now',
    ACCOUNT: 'Account',
    LOGOUT: 'Logout',
    LOGIN: 'Login',
    SIGNUP: 'Sign Up',
  },

  WORKSPACE: {
    TYPES: {
      HOT_DESK: 'Hot Desk',
      DEDICATED_DESK: 'Dedicated Desk',
      PRIVATE_OFFICE: 'Private Office',
      MEETING_ROOM: 'Meeting Room',
      CONFERENCE_ROOM: 'Conference Room',
    },
    FEATURES: {
      WIFI: 'High-speed WiFi',
      COFFEE: 'Complimentary coffee',
      PRINTING: 'Printing access',
      PHONE_BOOTH: 'Phone booth access',
      PARKING: 'Parking included',
      RECEPTION: '24/7 reception',
    },
  },

  RESOURCES: {
    CATEGORIES: {
      EQUIPMENT: 'Equipment',
      SERVICES: 'Services',
      AMENITIES: 'Amenities',
    },
    ITEMS: {
      MONITOR: 'External Monitor',
      KEYBOARD: 'Wireless Keyboard',
      MOUSE: 'Wireless Mouse',
      HEADPHONES: 'Noise-canceling Headphones',
      WEBCAM: 'HD Webcam',
      PHONE: 'IP Phone',
      WHITEBOARD: 'Portable Whiteboard',
      STORAGE: 'Personal Storage Locker',
    },
  },

  TIME: {
    DAYS_OF_WEEK: {
      MONDAY: 'Monday',
      TUESDAY: 'Tuesday',
      WEDNESDAY: 'Wednesday',
      THURSDAY: 'Thursday',
      FRIDAY: 'Friday',
      SATURDAY: 'Saturday',
      SUNDAY: 'Sunday',
    },
    MONTHS: {
      JANUARY: 'January',
      FEBRUARY: 'February',
      MARCH: 'March',
      APRIL: 'April',
      MAY: 'May',
      JUNE: 'June',
      JULY: 'July',
      AUGUST: 'August',
      SEPTEMBER: 'September',
      OCTOBER: 'October',
      NOVEMBER: 'November',
      DECEMBER: 'December',
    },
  },
} as const;

export type LabelPath = keyof typeof LABELS;
export type ActionLabel = keyof typeof LABELS.ACTIONS;
export type BookingLabel = keyof typeof LABELS.BOOKING;

// ============================================================
// TIME AND CALENDAR SETTINGS
// Business time/date preferences and calendar display options
// ============================================================

export interface TimeSettings {
  // Timezone (IANA format)
  timezone: string;
  // Time format: '12h' or '24h'
  timeFormat: '12h' | '24h';
  // First day of week: 0=Sunday, 1=Monday, etc.
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  // Date format
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
}

export interface CalendarSettings {
  // What determines appointment color on calendar
  appointmentColorSource: 'category' | 'provider' | 'status' | 'service';
  // Show processing/buffer time on calendar
  displayProcessingTime: boolean;
  // Show blocked time entries on calendar
  displayBlockedTime: boolean;
  // Default calendar view
  defaultView: 'day' | 'week' | 'month';
  // Working hours display
  workingHoursStart: string; // '09:00'
  workingHoursEnd: string; // '18:00'
  // Slot duration for calendar grid (minutes)
  slotDuration: 15 | 30 | 60;
  // Show weekends
  showWeekends: boolean;
  // Compact mode (less spacing)
  compactMode: boolean;
}

// Default Hello Gorgeous settings (matching Fresha config)
export const DEFAULT_TIME_SETTINGS: TimeSettings = {
  timezone: 'America/Chicago', // GMT -06:00 Chicago
  timeFormat: '12h',
  firstDayOfWeek: 1, // Monday
  dateFormat: 'MM/DD/YYYY',
};

export const DEFAULT_CALENDAR_SETTINGS: CalendarSettings = {
  appointmentColorSource: 'category',
  displayProcessingTime: false,
  displayBlockedTime: false,
  defaultView: 'day',
  workingHoursStart: '09:00',
  workingHoursEnd: '18:00',
  slotDuration: 15,
  showWeekends: true,
  compactMode: false,
};

// Timezone options for settings UI
export const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: '(GMT -05:00) New York', offset: -5 },
  { value: 'America/Chicago', label: '(GMT -06:00) Chicago', offset: -6 },
  { value: 'America/Denver', label: '(GMT -07:00) Denver', offset: -7 },
  { value: 'America/Los_Angeles', label: '(GMT -08:00) Los Angeles', offset: -8 },
  { value: 'America/Phoenix', label: '(GMT -07:00) Phoenix (No DST)', offset: -7 },
  { value: 'Pacific/Honolulu', label: '(GMT -10:00) Honolulu', offset: -10 },
  { value: 'America/Anchorage', label: '(GMT -09:00) Anchorage', offset: -9 },
];

// Day of week options
export const DAY_OF_WEEK_OPTIONS = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

// Format time based on settings
export function formatTime(
  date: Date | string,
  settings: TimeSettings = DEFAULT_TIME_SETTINGS
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: settings.timeFormat === '12h',
    timeZone: settings.timezone,
  };
  
  return d.toLocaleTimeString('en-US', options);
}

// Format date based on settings
export function formatDate(
  date: Date | string,
  settings: TimeSettings = DEFAULT_TIME_SETTINGS
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    timeZone: settings.timezone,
  };
  
  const day = d.toLocaleDateString('en-US', { ...options, day: '2-digit' });
  const month = d.toLocaleDateString('en-US', { ...options, month: '2-digit' });
  const year = d.toLocaleDateString('en-US', { ...options, year: 'numeric' });
  
  switch (settings.dateFormat) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'MM/DD/YYYY':
    default:
      return `${month}/${day}/${year}`;
  }
}

// Format date and time together
export function formatDateTime(
  date: Date | string,
  settings: TimeSettings = DEFAULT_TIME_SETTINGS
): string {
  return `${formatDate(date, settings)} ${formatTime(date, settings)}`;
}

// Get day name
export function getDayName(
  dayIndex: number,
  format: 'short' | 'long' = 'short'
): string {
  const days = {
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  };
  return days[format][dayIndex];
}

// Get ordered days of week based on first day setting
export function getOrderedDaysOfWeek(
  firstDay: number = DEFAULT_TIME_SETTINGS.firstDayOfWeek,
  format: 'short' | 'long' = 'short'
): string[] {
  const days = format === 'short' 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return [...days.slice(firstDay), ...days.slice(0, firstDay)];
}

// Convert time string to Date object in timezone
export function parseTimeInTimezone(
  timeString: string, // '09:00' or '9:00 AM'
  date: Date,
  timezone: string = DEFAULT_TIME_SETTINGS.timezone
): Date {
  // Parse the time string
  let hours: number;
  let minutes: number;
  
  if (timeString.includes('AM') || timeString.includes('PM')) {
    // 12-hour format
    const [time, period] = timeString.split(' ');
    const [h, m] = time.split(':').map(Number);
    hours = period === 'PM' && h !== 12 ? h + 12 : (period === 'AM' && h === 12 ? 0 : h);
    minutes = m;
  } else {
    // 24-hour format
    [hours, minutes] = timeString.split(':').map(Number);
  }
  
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

// Get appointment color based on settings
export function getAppointmentColor(
  appointment: {
    categoryColor?: string;
    providerColor?: string;
    statusColor?: string;
    serviceColor?: string;
  },
  colorSource: CalendarSettings['appointmentColorSource'] = DEFAULT_CALENDAR_SETTINGS.appointmentColorSource
): string {
  switch (colorSource) {
    case 'category':
      return appointment.categoryColor || '#EC4899';
    case 'provider':
      return appointment.providerColor || '#EC4899';
    case 'status':
      return appointment.statusColor || '#EC4899';
    case 'service':
      return appointment.serviceColor || '#EC4899';
    default:
      return '#EC4899'; // Default pink
  }
}

// Business hours for the location
export const BUSINESS_HOURS = {
  monday: { open: '09:00', close: '18:00', isOpen: true },
  tuesday: { open: '09:00', close: '18:00', isOpen: true },
  wednesday: { open: '09:00', close: '18:00', isOpen: true },
  thursday: { open: '09:00', close: '18:00', isOpen: true },
  friday: { open: '09:00', close: '17:00', isOpen: true },
  saturday: { open: '09:00', close: '14:00', isOpen: true },
  sunday: { open: '00:00', close: '00:00', isOpen: false },
};

// Check if a time is within business hours
export function isWithinBusinessHours(
  date: Date,
  hours: typeof BUSINESS_HOURS = BUSINESS_HOURS
): boolean {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
  const dayName = dayNames[date.getDay()];
  const dayHours = hours[dayName];
  
  if (!dayHours.isOpen) return false;
  
  const timeString = date.toTimeString().slice(0, 5); // 'HH:MM'
  return timeString >= dayHours.open && timeString < dayHours.close;
}

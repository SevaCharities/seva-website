export interface UserInterface {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  general_meeting: string;
  check_in_enabled: boolean;
}

export interface Activity {
  id: string;
  name: string;
}

export interface EventsProps {
  title: string;
  category: number;
  date: string[];
  description: string;
}
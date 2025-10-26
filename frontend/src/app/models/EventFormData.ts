export interface EventFormData {
  title: string;
  description: string;
  start: string;
  end: string | null;
  location: string;
  capacity: number | null;
  isPublic: boolean;
  tagNames: string[];
}

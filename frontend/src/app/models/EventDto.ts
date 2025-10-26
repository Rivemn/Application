import { TagDto } from './TagDto';

export interface EventDto {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date | null;
  location: string;
  capacity: number | null;
  isPublic: boolean;
  participantsCount: number;
  organizerId: string;
  organizerName: string;
  participantIds: string[];
  tags: TagDto[];
}

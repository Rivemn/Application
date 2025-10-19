import { Component } from '@angular/core';
interface Event {
  title: string;
  description: string;
  date: Date;
  location: string;
  participants: number;
  capacity: number;
}
@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {
  public events: Event[] = [
    {
      title: 'Tech Conference 2025',
      description:
        'Annual technology conference featuring the latest innovations in AI and machine learning.',
      date: new Date('2025-11-15T09:00:00'),
      location: 'Convention Center, San Francisco',
      participants: 0,
      capacity: 500,
    },
    {
      title: 'Community Networking Meetup',
      description: 'Connect with local professionals and expand your network.',
      date: new Date('2025-10-20T18:30:00'),
      location: 'Downtown Coffee Shop',
      participants: 0,
      capacity: 30,
    },
    {
      title: 'Design Workshop',
      description: 'Hands-on workshop covering modern UI/UX design principles.',
      date: new Date('2025-10-25T14:00:00'),
      location: 'Creative Space Studio',
      participants: 0,
      capacity: 20,
    },
  ];

  constructor() {}
}

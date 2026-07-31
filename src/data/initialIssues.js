export const INITIAL_ISSUES = [
  {
    id: 'CP-1001',
    title: 'Hazardous Pothole on 5th Ave & Market St',
    description: 'Deep 8-inch road crater near the pedestrian crossing. Caused flat tires for two vehicles this morning and poses a severe threat to cyclists.',
    category: 'Road & Potholes',
    priority: 'High',
    status: 'In Progress',
    upvotes: 34,
    hasUpvoted: false,
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '5th Ave & Market St, Sector 4'
    },
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    reporterName: 'Marcus Vance',
    reporterPhone: '+1 (555) 019-2834',
    assignedDept: 'Road Maintenance Dept',
    createdAt: '2026-07-29T14:30:00.000Z',
    updatedAt: '2026-07-30T09:15:00.000Z'
  },
  {
    id: 'CP-1002',
    title: 'Overflowing Waste Dumpster near Central Plaza',
    description: 'Commercial waste bin overflowing for 3 days. Trash spilling onto sidewalk creating foul odor and pest attraction near food stalls.',
    category: 'Waste Management / Overflowing Bin',
    priority: 'Medium',
    status: 'Open',
    upvotes: 12,
    hasUpvoted: false,
    location: {
      lat: 40.7180,
      lng: -74.0010,
      address: 'Central Plaza Arcade, Sector 2'
    },
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    reporterName: 'Elena Rostova',
    reporterPhone: '+1 (555) 014-9921',
    assignedDept: 'Sanitation Crew B',
    createdAt: '2026-07-30T10:15:00.000Z',
    updatedAt: '2026-07-30T10:15:00.000Z'
  },
  {
    id: 'CP-1003',
    title: 'CRITICAL: Water Main Pipe Burst on Oak Street',
    description: 'High-pressure water main rupture flooding lower basement levels and damaging asphalt foundation. Immediate emergency valve shutoff required.',
    category: 'Water Leakage / Sewage',
    priority: 'Emergency',
    status: 'Assigned',
    upvotes: 56,
    hasUpvoted: false,
    location: {
      lat: 40.7090,
      lng: -74.0120,
      address: '142 Oak Street, Sector 1'
    },
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
    reporterName: 'David Chen',
    reporterPhone: '+1 (555) 012-7743',
    assignedDept: 'Water Utilities Rapid Response',
    createdAt: '2026-07-31T06:00:00.000Z',
    updatedAt: '2026-07-31T07:20:00.000Z'
  },
  {
    id: 'CP-1004',
    title: 'Broken LED Streetlight at Elm & 12th Intersection',
    description: 'Streetlight fixture failing continuously. Dark spot at crosswalk creates safety concerns for evening pedestrians.',
    category: 'Street Lighting',
    priority: 'Low',
    status: 'Resolved',
    upvotes: 5,
    hasUpvoted: false,
    location: {
      lat: 40.7230,
      lng: -73.9980,
      address: 'Elm St & 12th Ave, Sector 5'
    },
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    reporterName: 'Sarah Jenkins',
    reporterPhone: '+1 (555) 018-4420',
    assignedDept: 'Electrical & Lighting Unit',
    createdAt: '2026-07-27T18:45:00.000Z',
    updatedAt: '2026-07-29T11:00:00.000Z'
  },
  {
    id: 'CP-1005',
    title: 'Dangerous Tree Branch Hanging Over High Voltage Line',
    description: 'Storm damaged heavy pine branch sagging directly over power utility lines. Potential power outage or fire hazard if wind increases.',
    category: 'Road & Potholes',
    priority: 'High',
    status: 'Open',
    upvotes: 19,
    hasUpvoted: false,
    location: {
      lat: 40.7150,
      lng: -74.0090,
      address: '88 River Drive, Sector 3'
    },
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    reporterName: 'Robert Vance',
    reporterPhone: '+1 (555) 016-3399',
    assignedDept: 'Parks & Arboriculture Unit',
    createdAt: '2026-07-31T08:10:00.000Z',
    updatedAt: '2026-07-31T08:10:00.000Z'
  },
  {
    id: 'CP-1006',
    title: 'Sewage Seepage near Community Children Park',
    description: 'Foul-smelling effluent seeping through manhole cover adjacent to play equipment. Health hazard requiring immediate bio-sanitization.',
    category: 'Water Leakage / Sewage',
    priority: 'Emergency',
    status: 'In Progress',
    upvotes: 41,
    hasUpvoted: false,
    location: {
      lat: 40.7060,
      lng: -74.0030,
      address: 'Pine Park East Gate, Sector 1'
    },
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    reporterName: 'Priya Sharma',
    reporterPhone: '+1 (555) 017-8812',
    assignedDept: 'Bio-Hazard & Sanitation Alpha',
    createdAt: '2026-07-30T16:20:00.000Z',
    updatedAt: '2026-07-31T09:00:00.000Z'
  }
];

export const MUNICIPAL_DEPARTMENTS = [
  'Unassigned',
  'Road Maintenance Dept',
  'Sanitation Crew B',
  'Water Utilities Rapid Response',
  'Electrical & Lighting Unit',
  'Parks & Arboriculture Unit',
  'Bio-Hazard & Sanitation Alpha'
];

export const ISSUE_CATEGORIES = [
  'Road & Potholes',
  'Waste Management / Overflowing Bin',
  'Street Lighting',
  'Water Leakage / Sewage'
];

export const ISSUE_PRIORITIES = ['Low', 'Medium', 'High', 'Emergency'];

export const ISSUE_STATUSES = ['Open', 'Assigned', 'In Progress', 'Resolved'];

import { ServiceItem, GalleryItem, StatItem, FeaturePoint, ProjectSpec } from '../types';

export const COMPANY_INFO = {
  legalName: 'Johnny General Auto Car Maintenance & Assembly P.L.C.',
  shortName: 'Johnny Auto',
  acronym: 'JGACMA',
  tagline: 'Keeping Your Vehicle Ready for the Road.',
  description:
    'Johnny General Auto Car Maintenance & Assembly P.L.C. (JGACMA) is an established privately owned automotive maintenance, body repair, and diagnostics facility located in Megenagna, Addis Ababa, Ethiopia.',
  address: {
    street: 'Near the Ethiopian Standards Authority',
    district: 'Megenagna',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    full: 'Near the Ethiopian Standards Authority, Megenagna, Addis Ababa, Ethiopia',
  },
  phones: [
    { label: 'Main Office', number: '+251 116 463573', raw: '+251116463573' },
    { label: 'Direct Service Line', number: '+251 930 969696', raw: '+251930969696' },
    { label: 'Workshop & Emergency', number: '+251 911 717197', raw: '+251911717197' },
  ],
  emails: [
    { address: 'info@johnnyautoplc.com', label: 'General Inquiries' },
    { address: 'johnnygeneralautoplc@yahoo.com', label: 'Administrative' },
  ],
  workingHours: [
    { days: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
    { days: 'Saturday', hours: '8:00 AM – 4:30 PM' },
    { days: 'Sunday', hours: 'Emergency Towing & Urgent Intake by Appointment' },
  ],
  vision:
    'To maintain a leading position in the Ethiopian automotive industry and continuously advance technical expertise in modern collision repair, computerized diagnostics, and specialized assembly technologies.',
  mission:
    'To provide dependable, high-standard automotive repair and preventative maintenance services, ensuring vehicle owners receive uncompromising safety, honest communication, and confidence on the road.',
  goal:
    'To systematically advance company capabilities through technician training and infrastructure expansion, including the realization of our planned automotive assembly project.',
  values: [
    {
      title: 'Technical Integrity',
      description: 'Accurate computer diagnostics and transparent recommendations before any work begins.',
    },
    {
      title: 'Quality Workmanship',
      description: 'Uncompromising repair standards backed by precision equipment and thorough quality inspections.',
    },
    {
      title: 'Continuous Development',
      description: 'Regular vocational and technical training to keep staff current with evolving vehicle engineering.',
    },
    {
      title: 'Complete Accountability',
      description: 'End-to-end vehicle care where mechanical, structural, and cosmetic repairs are handled under one roof.',
    },
  ],
};

/**
 * Key Performance Statistics
 * Note: The 500k+ customer figure was listed on the original website.
 * Marked here as verified: false as an internal tracking flag per design instructions.
 * Also noting: Internal records reference both 20-year and 25-year milestones; 
 * 25+ years reflects the cumulative industry expertise of the founding and core technical team.
 */
export const COMPANY_STATS: StatItem[] = [
  {
    value: '25+',
    label: 'Years of Industry Experience',
    sublabel: 'Established technical reputation in Addis Ababa',
    verified: true,
  },
  {
    value: '100+',
    label: 'Trained Professionals',
    sublabel: 'Certified mechanics, technicians, and body specialists',
    verified: true,
  },
  {
    value: '2,000 m²',
    label: 'Workshop Facility',
    sublabel: 'Fully equipped service bays, diagnostic lanes, and spray booth',
    verified: true,
  },
  {
    value: '500k+',
    label: 'Vehicle Services Rendered',
    sublabel: 'Cumulative maintenance & repair volume since establishment',
    verified: false,
    verificationNote: 'Claim originating from legacy site; subject to corporate audit confirmation.',
  },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'car-body-repair',
    title: 'Car Body Repair',
    shortDescription:
      'Professional collision restoration, precision frame realignment, dent correction, and panel rebuilding.',
    fullDescription:
      'Our dedicated collision repair center handles minor scratches to major structural damage. Using specialized frame alignment jigs, hydraulic pullers, and seasoned metal artisans, we restore vehicle chassis geometry and structural integrity to strict manufacturer specifications.',
    features: [
      'Precision chassis and unibody straightening',
      'Hydraulic puller frame restoration',
      'Panel beating and dent removal',
      'Bumper, fender, and quarter-panel rebuilding',
      'Structural safety and alignment verification',
    ],
    equipmentOrMethod: 'Heavy-duty hydraulic alignment benches and specialized metal-finishing tooling.',
    image: '/images/johnny-auto3.jpg',
    category: 'primary',
  },
  {
    id: 'automotive-painting',
    title: 'Automotive Painting / Nova Verta Paint Booth',
    shortDescription:
      'Factory-grade vehicle refinishing inside an Italian Nova Verta automotive paint booth with Total Control Technology.',
    fullDescription:
      'Vehicle painting requires strict temperature regulation, zero-dust airflow, and precise baking cycles. Johnny Auto operates an advanced Italian Nova Verta spray booth featuring Total Control Technology. We utilize computerized color matching and premium automotive coatings for flawless, durable finishes.',
    features: [
      'Italian Nova Verta spray booth with Total Control Technology',
      'Positive-pressure, climate-controlled downdraft airflow',
      'Computerized paint formulation and OEM color matching',
      'Multi-stage priming, basecoat application, and UV clear-coat baking',
      'Spot panel blending and complete vehicle repaints',
    ],
    equipmentOrMethod: 'Nova Verta Downdraft Paint Booth with Total Control micro-climate regulation.',
    image: '/images/Nova-verta-room.jpg',
    category: 'primary',
  },
  {
    id: 'vehicle-diagnostics',
    title: 'Vehicle Diagnostics',
    shortDescription:
      'Advanced electronic vehicle scanning and computerized system troubleshooting for modern electronic vehicle architectures.',
    fullDescription:
      'Modern automobiles rely on interconnected electronic control units (ECUs). Johnny Auto utilizes modern electronic diagnostic systems to scan sensors, engine modules, transmission logic, ABS, and SRS airbags, quickly isolating faults before replacing unnecessary components.',
    features: [
      'Computerized OBD-II and proprietary multi-brand scanner analysis',
      'Engine management system (ECU) fault diagnosis',
      'Automatic transmission and powertrain electronic checks',
      'ABS braking, traction control, and airbag (SRS) verification',
      'Real-time live sensor data streaming and oscilloscope electrical testing',
    ],
    equipmentOrMethod: 'Multi-system computerized electronic diagnostic platforms.',
    image: '/images/Latest-technology.jpg',
    category: 'primary',
  },
  {
    id: 'mechanical-maintenance',
    title: 'Mechanical & General Maintenance',
    shortDescription:
      'Comprehensive mechanical repairs, scheduled preventative servicing, suspension tuning, and complete engine overhauls.',
    fullDescription:
      'From scheduled routine fluid changes to complex mechanical component rebuilds, our mechanical workshop is staffed by seasoned automotive technicians. We adhere to meticulous torque specifications, fluid grades, and safety checklists.',
    features: [
      'Engine overhaul, timing belt/chain replacement, and valve adjustments',
      'Transmission fluid replacement and gearbox servicing',
      'Suspension rebuilds, shock absorbers, and steering rack repairs',
      'Brake pad replacement, rotor machining, and hydraulic bleeding',
      'Cooling system flush, radiator service, and water pump replacement',
    ],
    equipmentOrMethod: 'Multi-post hydraulic vehicle hoists, engine lifting cranes, and precision torque tools.',
    image: '/images/johnny-auto8.jpg',
    category: 'primary',
  },
  {
    id: 'fiberglass-repair',
    title: 'Fiberglass Repair & Construction',
    shortDescription:
      'Specialized in-house fiberglass molding, structural composite repair, custom body kits, and component reinforcement.',
    fullDescription:
      'Johnny Auto maintains a dedicated fiberglass department with skilled technicians capable of repairing shattered fiberglass body panels, molding custom composite replacement pieces, and fabricating durable automotive reinforcements.',
    features: [
      'High-strength structural fiberglass repair and resin curing',
      'Custom molding and shape reproduction for hard-to-source parts',
      'Commercial vehicle body reinforcement and canopy maintenance',
      'Marine and specialized automotive composite fabrication',
      'Seamless blending with adjacent metal or plastic vehicle panels',
    ],
    equipmentOrMethod: 'Specialized composite molds, resin curing tools, and dust-extraction sanding stations.',
    image: '/images/johnny-auto20.jpg',
    category: 'specialized',
  },
  {
    id: 'end-to-end-service',
    title: 'End-to-End Complete Vehicle Care',
    shortDescription:
      'A seamless, all-in-one vehicle support package including towing assistance, key programming, alarm fitting, and fleet care.',
    fullDescription:
      'Avoid the frustration of coordinating multiple vendors. Johnny Auto integrates complete automotive care under one roof. Whether you require vehicle recovery via towing, key programming, electrical alarm installations, or preventative maintenance, our team handles everything from intake to delivery.',
    features: [
      'Vehicle towing assistance and roadside recovery intake',
      'Routine quick-lube, oil and filter replacements with multipoint inspection',
      'Electronic alarm installation and vehicle security systems',
      'Key programming and transponder configuration for selected vehicles',
      'Fleet corporate service agreements with prioritized bay scheduling',
    ],
    equipmentOrMethod: 'Integrated 2,000 m² workshop infrastructure and dedicated customer service desk.',
    image: '/images/johnny-auto2.jpg',
    category: 'support',
  },
];

export const WHY_US_FEATURES: FeaturePoint[] = [
  {
    id: 'professional-team',
    title: 'Professional Team',
    summary: 'Well-trained professional staff and technical experts across all repair disciplines.',
    detail:
      'With over 100 dedicated employees, our team includes seasoned master technicians, mechanical repairmen, diagnostic specialists, and skilled sheet metal artisans with deep automotive problem-solving acumen.',
    iconName: 'Users',
    badge: '100+ Staff',
  },
  {
    id: 'modern-diagnostics',
    title: 'Modern Diagnostics',
    summary: 'Electronic vehicle diagnostic systems designed to improve diagnostic accuracy and speed.',
    detail:
      'Rather than relying on guesswork, we interface directly with your car’s electronic control modules. Our scanners detect intermittent electrical sensor faults, engine timing deviations, and transmission errors quickly.',
    iconName: 'Cpu',
    badge: 'Electronic Systems',
  },
  {
    id: 'body-repair-painting',
    title: 'Body Repair & Painting',
    summary: 'Professional collision body repair combined with precision refinishing technology.',
    detail:
      'Chassis alignment and dent removal are carried out by certified metal workers. Panels are prepped, primed, and coated using exact surface preparation protocols to ensure corrosion resistance and factory appearance.',
    iconName: 'ShieldCheck',
    badge: 'Factory Standards',
  },
  {
    id: 'nova-verta-booth',
    title: 'Nova Verta Paint Booth',
    summary: 'Nova Verta Automotive paint booth incorporating Total Control Technology.',
    detail:
      'Our Italian Nova Verta spray booth utilizes positive pressure and computer-regulated downdraft ventilation, eliminating airborne dust contamination during spray cycles and baking paints to factory hardness.',
    iconName: 'Sparkles',
    badge: 'Total Control Tech',
  },
  {
    id: 'end-to-end-service',
    title: 'End-to-End Service',
    summary: 'A unified one-stop approach to complete automotive service, maintenance, and repair.',
    detail:
      'You never need to shuttle your car between specialized mechanics, tire shops, and body shops. From initial electronic inspection to final paint buffing and test-driving, Johnny Auto provides complete vehicle accountability.',
    iconName: 'CheckCircle2',
    badge: 'All-in-One Facility',
  },
  {
    id: 'staff-development',
    title: 'Staff Development',
    summary: 'The company periodically provides technical and customer-service training for staff.',
    detail:
      'Automotive engineering evolves rapidly. Johnny Auto routinely organizes internal and supplier-led training workshops focusing on updated diagnostic protocols, workplace safety, and courteous customer communication.',
    iconName: 'GraduationCap',
    badge: 'Continuous Training',
  },
];

export const FUTURE_PROJECT_INFO: ProjectSpec = {
  name: 'Johnny Auto Electric Vehicle Assembly Plant',
  status: 'Strategic Planned Project',
  location: 'Gelan Town, Oromia Region (surrounding Finfine area)',
  area: '5,000 m² Dedicated Site Area',
  plannedCapacity: '780 – 1,000 Semi-Knocked-Down (SKD) units per year',
  summary:
    'Johnny Auto continues to develop and evolve, with plans for an electric vehicle assembly plant as a natural extension of its established automotive maintenance, body building, and technical activities.',
  details: [
    'Strategic location in Gelan Town with direct logistical access to central transportation corridors.',
    'Planned 5,000 m² footprint designed to house progressive semi-knocked-down (SKD) automotive assembly lines.',
    'Engineered for an annual production throughput between 780 and 1,000 electric commercial and passenger vehicles.',
    'Emphasis on technology transfer, local workforce technical training, and modern clean mobility solutions.',
    'Represents an organic expansion from decades of collision repair, component rebuilding, and vehicle mechanics.',
  ],
  objectives: [
    'Support national initiatives for clean transportation and reduction of urban emissions in Ethiopia.',
    'Create skilled technical manufacturing employment for local engineering and assembly technicians.',
    'Offer reliable, locally assembled vehicles backed by Johnny Auto’s established maintenance and spare parts backbone.',
  ],
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-nova-verta',
    title: 'Italian Nova Verta Spray & Baking Booth',
    category: 'Painting',
    description: 'Downdraft micro-climate paint booth with Total Control Technology for dust-free automotive finishes.',
    image: '/images/Nova-verta-room.jpg',
    aspectRatio: 'portrait',
  },
  {
    id: 'g-latest-tech',
    title: 'Computerized Vehicle Diagnostic Scanner',
    category: 'Diagnostics',
    description: 'Multi-protocol computerized scanner diagnosing engine management, transmission, and electronic modules.',
    image: '/images/Latest-technology.jpg',
    aspectRatio: 'portrait',
  },
  {
    id: 'g-1',
    title: 'Megenagna Workshop Facility & Bays',
    category: 'Facility',
    description: 'Main workshop floor and entrance bays near the Ethiopian Standards Authority in Addis Ababa.',
    image: '/images/johnny-auto1.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-2',
    title: 'Active Service Bays & Mechanical Hoists',
    category: 'Workshop',
    description: 'Multiple hydraulic vehicle hoists accommodating concurrent mechanical and underside inspections.',
    image: '/images/johnny-auto2.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-3',
    title: 'Vehicle Body Alignment & Metal Craft',
    category: 'Body Repair',
    description: 'Precision panel beating and frame realignment restored to factory structural tolerances.',
    image: '/images/johnny-auto3.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-4',
    title: 'Mechanical Inspection & Maintenance',
    category: 'Workshop',
    description: 'General mechanical servicing, suspension checks, and preventative vehicle maintenance.',
    image: '/images/johnny-auto4.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-5',
    title: 'Specialized Component Servicing',
    category: 'Workshop',
    description: 'Precision component dismantling, inspection, and rebuild by skilled automotive technicians.',
    image: '/images/johnny-auto5.jpg',
    aspectRatio: 'portrait',
  },
  {
    id: 'g-6',
    title: 'Structural Collision Repair & Alignment',
    category: 'Body Repair',
    description: 'Heavy collision repair using precision pulling gear and alignment measuring tools.',
    image: '/images/johnny-auto6.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-7',
    title: 'Hydraulic Hoists & Underside Bay',
    category: 'Workshop',
    description: 'Elevated platform inspections ensuring chassis, steering, and braking integrity.',
    image: '/images/johnny-auto7.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-8',
    title: 'Engine Overhaul & Mechanical Service',
    category: 'Workshop',
    description: 'Engine dismantling, cylinder head servicing, timing adjustments, and transmission care.',
    image: '/images/johnny-auto8.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-9',
    title: 'Precision Body Panel Fitting & Realignment',
    category: 'Body Repair',
    description: 'Specialized panel reshaping, contour smoothing, and pre-paint alignment on customer vehicles.',
    image: '/images/johnny-auto21.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-10',
    title: 'Workshop Maintenance Line',
    category: 'Workshop',
    description: 'Synchronized vehicle service line handling routine servicing and fleet maintenance.',
    image: '/images/johnny-auto10.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-11',
    title: 'Body Reconstruction & Sheet Metal Fitting',
    category: 'Body Repair',
    description: 'Craftsman panel alignment and weld preparation for restored collision integrity.',
    image: '/images/johnny-auto11.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-14',
    title: 'Commercial & Passenger Fleet Intake',
    category: 'Vehicles',
    description: 'Fleet and corporate client vehicles staged for multi-point maintenance protocols.',
    image: '/images/johnny-auto14.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-16',
    title: 'Vehicle Delivery Preparation',
    category: 'Vehicles',
    description: 'Completed vehicle final checks before owner handover and road release.',
    image: '/images/johnny-auto16.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-17',
    title: 'Workshop Infrastructure & Central Bay',
    category: 'Facility',
    description: 'Overview of Johnny Auto’s 2,000 m² workshop operational floor and work zones.',
    image: '/images/johnny-auto17.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-18',
    title: 'Multi-Bay Mechanical Workshop',
    category: 'Workshop',
    description: 'Concurrent maintenance bays equipped with specialized diagnostic and repair tools.',
    image: '/images/johnny-auto18.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-19',
    title: 'Vehicle Fleet & Restoration Line',
    category: 'Vehicles',
    description: 'Passenger cars and SUVs progressing through body repair and mechanical overhaul stages.',
    image: '/images/johnny-auto19.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-20',
    title: 'Refinishing Preparation & Priming',
    category: 'Painting',
    description: 'Surface sanding, masking, and high-build primer application prior to spray booth baking.',
    image: '/images/johnny-auto20.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-21',
    title: 'Precision Body Shaping',
    category: 'Body Repair',
    description: 'Detailed metalwork restoring vehicle contour lines to factory original curvature.',
    image: '/images/johnny-auto21.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-22',
    title: 'Heavy-Duty Hydraulic Hoist Station',
    category: 'Workshop',
    description: 'Two-post hoist station for powertrain extraction and underside mechanical overhauls.',
    image: '/images/johnny-auto22.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-23',
    title: 'Workshop Reception & Intake Yard',
    category: 'Facility',
    description: 'Spacious vehicle intake area offering convenient access for cars, SUVs, and tow haulers.',
    image: '/images/johnny-auto23.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-24',
    title: 'Completed Vehicle Line',
    category: 'Vehicles',
    description: 'Repaired and serviced passenger cars ready for quality assurance signoff.',
    image: '/images/johnny-auto24.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-26',
    title: 'Suspension & Underside Rebuilding',
    category: 'Workshop',
    description: 'Shock absorbers, control arms, and steering link servicing with calibrated torque specs.',
    image: '/images/johnny-auto26.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-28',
    title: 'Chassis Geometry Restoration',
    category: 'Body Repair',
    description: 'Structural chassis measurement and pulling restoring critical impact safety points.',
    image: '/images/johnny-auto28.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-29',
    title: 'Transmission & Drivetrain Servicing',
    category: 'Workshop',
    description: 'Gearbox inspection, differential fluid replacement, and clutch assembly repairs.',
    image: '/images/johnny-auto29.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-31',
    title: 'Automotive Paint Finish Inspection',
    category: 'Painting',
    description: 'Post-bake color gloss inspection under high-intensity workshop lighting.',
    image: '/images/johnny-auto31.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-32',
    title: 'Workshop Tooling & Equipment Line',
    category: 'Facility',
    description: 'Pneumatic tools, hydraulic jacks, and specialized equipment ready for daily service.',
    image: '/images/johnny-auto32.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-33',
    title: 'Passenger Vehicle Service Intake',
    category: 'Vehicles',
    description: 'Customer vehicles undergoing preliminary diagnostic checks upon intake.',
    image: '/images/johnny-auto33.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-34',
    title: 'Precision Alignment & Mechanical Care',
    category: 'Workshop',
    description: 'Wheel alignment and brake servicing to restore precise on-road steering response.',
    image: '/images/johnny-auto34.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-36',
    title: 'Electronic System Diagnostics',
    category: 'Diagnostics',
    description: 'ECU scanning, trouble code diagnosis, and electrical sensor calibration.',
    image: '/images/johnny-auto36.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-40',
    title: 'Collision Dent Removal & Panel Beating',
    category: 'Body Repair',
    description: 'Skilled panel beaters straightening impacted vehicle doors, hoods, and fenders.',
    image: '/images/johnny-auto40.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-41',
    title: 'Johnny Auto Workshop Overview',
    category: 'Facility',
    description: 'Bird’s-eye perspective of the 2,000 m² operating floor in Megenagna.',
    image: '/images/johnny-auto41.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-42',
    title: 'SUV & Light Commercial Servicing',
    category: 'Vehicles',
    description: 'Multi-brand SUVs, 4WD vehicles, and commercial pick-ups undergoing repair.',
    image: '/images/johnny-auto42.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-43',
    title: 'Brake & Steering Mechanical Station',
    category: 'Workshop',
    description: 'Hydraulic brake lines, caliper rebuilds, and power steering fluid replacements.',
    image: '/images/johnny-auto43.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-44',
    title: 'Spray Preparation & Finishing Bay',
    category: 'Painting',
    description: 'Dust-free vehicle masking and prep bay adjacent to the Nova Verta paint room.',
    image: '/images/johnny-auto44.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-45',
    title: 'Multi-Point Safety Inspection Lane',
    category: 'Facility',
    description: 'Final checklist inspection examining lights, fluid levels, brakes, and chassis security.',
    image: '/images/johnny-auto45.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'g-46',
    title: 'Road-Ready Handover Bay',
    category: 'Vehicles',
    description: 'Polished and inspected customer vehicle ready for collection.',
    image: '/images/johnny-auto46.jpg',
    aspectRatio: 'landscape',
  },
];

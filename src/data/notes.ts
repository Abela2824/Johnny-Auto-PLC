/**
 * Workshop Notes: practical advice for Addis Ababa drivers. These are first
 * drafts for the workshop manager to review; nothing here claims a specific
 * Johnny Auto price, time or guarantee. Amharic versions are still to be
 * translated.
 */
export interface NoteSection {
  h: string;
  p: string[];
}

export interface Note {
  slug: string;
  title: string;
  titleAm?: string;
  summary: string;
  season: string;
  readMinutes: number;
  body: NoteSection[];
}

export const NOTES: Note[] = [
  {
    slug: 'kiremt-ready',
    title: 'Getting your car ready for kiremt',
    titleAm: 'መኪናዎን ለክረምት ማዘጋጀት',
    summary: 'Wipers, tyres, brakes and the drains most people forget before the rains.',
    season: 'June – September',
    readMinutes: 4,
    body: [
      {
        h: 'Wiper blades and washer fluid',
        p: [
          'Eight months of dry-season sun hardens wiper rubber. The first heavy rain is when you find out: streaks, judder, and a clear patch exactly where you are not looking. Lift each blade and run a finger along the edge. If it feels rough or cracked, replace it before the rains, not during them. Check the rear wiper too; it is the one that is always forgotten.',
          'Fill the washer bottle with clean water and a small amount of washer fluid or a drop of dish soap. Mud sprayed up by minibuses dries on the glass in minutes, and a dry washer bottle turns one splash into a blind windscreen.',
        ],
      },
      {
        h: 'Tyre tread on wet cobbles',
        p: [
          'Cobblestone streets that feel fine in the dry season become slick as soap in rain, and the painted lines on the ring road are worse. Tread is what pushes water out from under the tyre. The legal minimum is 1.6 mm, but for Addis rain we recommend at least 3 mm; below that a tyre starts to float on standing water instead of gripping through it.',
          'Check the pressure monthly with the tyres cold. Under-inflated tyres aquaplane sooner and wear on the edges. Do not forget the spare: a flat spare in a kiremt downpour is a long afternoon.',
        ],
      },
      {
        h: 'Brake check after the dry season',
        p: [
          'Dust is an abrasive. A dry season of it wears pads faster than most owners expect, and the first sign is often a grinding or squeal when the brakes are wet. Have the pads and discs measured before the rains.',
          'Brake fluid absorbs moisture from the air over time, and wet fluid boils more easily on long downhill runs such as the descent into the city from Entoto. If the fluid has not been changed in two years, change it.',
        ],
      },
      {
        h: 'Door and sunroof drains',
        p: [
          'Every car has drain channels: at the bottom of each door, under the windscreen scuttle, and around a sunroof. Dust and eucalyptus leaves block them over the dry months. When the rain comes, water that should run out collects inside instead. The signs are a musty smell, damp carpets, fogged windows and, in the worst cases, electrical faults in the modules that live under the seats.',
          'Clearing the drains takes a few minutes with compressed air or a length of flexible cable. It is the cheapest job on this list and the one that prevents the most expensive damage.',
        ],
      },
      {
        h: 'What to do after driving through flood water',
        p: [
          'If the engine stalls in water, do not try to restart it. Water does not compress, and a restart can bend connecting rods in a second. Have the car towed and the engine checked.',
          'If you made it through, apply the brakes gently a few times on the other side to dry them. Later, check the engine oil on the dipstick: a milky colour means water has got in. Have the underside and the wheel bearings inspected within a few days, and keep an eye out for warning lights over the following week, because water in a connector can take time to show.',
        ],
      },
    ],
  },
  {
    slug: 'dust-and-filters',
    title: 'Dust, air filters and Addis roads',
    summary: 'Why a filter that lasts 15,000 km elsewhere lasts 6,000 km here.',
    season: 'Bega (dry season)',
    readMinutes: 3,
    body: [
      {
        h: 'How dust gets past a clogged filter',
        p: [
          'An engine air filter is a paper wall. Dust lands on it, air goes through it. As the paper fills, less air gets through, the engine computer compensates with more fuel, and you pay for it twice: in fuel and in lost power.',
          'The real damage starts when a filter is overdue or badly seated. A torn pleat or a housing that does not close properly lets dust straight into the cylinders, where it grinds against piston rings and bore walls. That wear never reverses.',
          'Addis sits at about 2,350 metres, so the air is already thin and the engine already gets less oxygen than it was designed for. A clogged filter hurts more here than it would at sea level.',
        ],
      },
      {
        h: 'Engine filter, cabin filter',
        p: [
          'Most cars have two. The engine filter protects the engine. The cabin filter cleans the air that comes through the vents. When the cabin filter is full, the air conditioning blows weakly, the car smells of dust when you switch the fan on, and the windscreen fogs more slowly in the rain because less air is moving. It is cheap and takes minutes to change.',
        ],
      },
      {
        h: 'Intervals for unpaved commutes',
        p: [
          'The handbook interval of 15,000 to 20,000 km assumes paved roads and clean air. If part of your daily drive is gravel, a construction detour, or the dust cloud behind an Isuzu on the ring road, treat it as severe service. Inspect the engine filter every 5,000 km and expect to replace it somewhere between 6,000 and 10,000 km. Hold it up to the light: if you cannot see light through the pleats, it is finished.',
        ],
      },
      {
        h: 'Signs your filter is done',
        p: [
          'Slower pick-up when you pull out, fuel consumption creeping up, black smoke or a rich smell from the exhaust on a diesel, and a check-engine light with an air-flow or mixture code. On the cabin side: weak airflow and that first blast of dust when the fan starts. Any of these is worth a five-minute look before it becomes a diagnosis.',
        ],
      },
    ],
  },
  {
    slug: 'paint-booth-explained',
    title: 'What a paint booth actually does to your car',
    summary: 'Downdraft air, baking cycles and why a garage-door respray never lasts.',
    season: 'Any time',
    readMinutes: 4,
    body: [
      {
        h: 'Why dust is the enemy',
        p: [
          'Wet paint is a magnet. A speck of dust that lands on it becomes a bump that is sealed in forever; an insect becomes a crater. A respray done in an open yard, or in a garage with the door up, is painted in the same air that carries Addis dust, and the result is a finish you can feel with your fingertips.',
          'A booth is a sealed, filtered room. In a downdraft booth, clean air enters through the ceiling, flows down over the car and leaves through grilles in the floor, carrying overspray and anything airborne with it. The pressure inside is kept slightly higher than outside, so dust cannot drift in when a door opens. The Nova Verta booth at Johnny Auto works this way.',
        ],
      },
      {
        h: 'What “baked” means',
        p: [
          'Modern clear coat cures by chemical reaction, and the reaction needs heat. After spraying, the booth switches to a bake cycle and holds the car at a controlled temperature, typically around 60 °C, for the time the paint maker specifies. The clear coat hardens fully in under an hour instead of staying soft for days.',
          'That hardness is what you are paying for. A baked finish resists stone chips, bird droppings and the brushes at the car wash. An air-dried one stays slightly soft, marks easily and dulls within a year.',
        ],
      },
      {
        h: 'Colour matching',
        p: [
          'Every car carries a paint code on a plate in the door jamb or under the bonnet. The code is the starting point, not the answer: the same code often has several factory variants, and every car fades a little in the sun. The painter mixes the formula, sprays a test card, and compares it against the actual panel in daylight. Where a repair meets an untouched panel, the new colour is blended across the edge so the eye cannot find the join.',
        ],
      },
      {
        h: 'How long a booth finish should last',
        p: [
          'Prepared, sprayed and baked properly, a repair should last as long as the factory paint around it. Treat it gently for the first month: no polish or wax while the paint finishes curing, hand wash rather than pressure wash, and keep it out of the harshest midday sun if you can. After that, it is simply paint.',
        ],
      },
    ],
  },
  {
    slug: 'warning-lights',
    title: 'Reading your dashboard warning lights',
    summary: 'Which lights mean stop now, and which mean book a scan this week.',
    season: 'Any time',
    readMinutes: 4,
    body: [
      {
        h: 'Red means stop, amber means soon',
        p: [
          'Car makers agree on one thing: colour. A red light means something that can damage the car or hurt you within minutes: oil pressure, engine temperature, brake system, charging. Pull over somewhere safe, switch off, and call before you drive on.',
          'Amber is a warning, not an emergency: check engine, ABS, traction control, tyre pressure, low fuel, a bulb out. The car will drive, but it is telling you that one of its systems is not fully working. Book a scan within the week, and do not get used to the light being on.',
        ],
      },
      {
        h: 'Check-engine light myths',
        p: [
          'It is not always the fuel cap. It does not mean the car is about to stop. And it does not go away on its own because “the car is fine now”: the fault code stays stored until it is read and cleared, and the same fault usually comes back.',
          'One exception matters. A check-engine light that flashes means the engine is misfiring badly enough to dump unburnt fuel into the exhaust. That destroys the catalytic converter quickly and expensively. A flashing light is a stop-now light.',
        ],
      },
      {
        h: 'ABS and airbag lights after a repair',
        p: [
          'After a collision repair these two lights are common, and they are not cosmetic. An airbag light means the system has disabled itself: in the next crash the bag may not fire. An ABS light means the car will still brake, but the wheels can lock. Both usually point to a sensor, a connector or a module that was disturbed during the repair and needs to be checked and re-coded with a scanner. Removing the bulb is not a repair.',
        ],
      },
      {
        h: 'What a diagnostic scan shows',
        p: [
          'A scanner reads the fault codes stored in every control unit, along with a snapshot of what the sensors were reading when the fault happened. It also shows live data: what the engine, gearbox and brakes are measuring right now. That is how a technician tells the difference between a sensor that is lying and a part that is really failing, and why the right order is always find the fault first, replace the part second.',
        ],
      },
    ],
  },
  {
    slug: 'fibreglass-bumper',
    title: 'Why fibreglass is the right fix for a broken bumper',
    summary: 'Repair or replace, and when a composite repair is as strong as the original.',
    season: 'Any time',
    readMinutes: 3,
    body: [
      {
        h: 'What your bumper is made of',
        p: [
          'The painted part you see is a cover. Behind it sits a reinforcement bar that does the real work in a crash. Most modern covers are a flexible plastic called polypropylene. Older vehicles, many body kits, canopies, minibus panels and boats use fibreglass: glass mat set in resin, light, stiff and very repairable.',
        ],
      },
      {
        h: 'When to repair',
        p: [
          'Cracks, splits and broken mounting tabs on a plastic cover can be plastic-welded and reinforced from behind. A cracked fibreglass panel is ground back along the crack, layered with new mat and resin, and sanded to shape; done properly, the repaired area is as strong as the surrounding panel. Repair makes sense when the shape is intact, the damage is local, and a genuine replacement is expensive or weeks away, which in Addis is most of the time.',
        ],
      },
      {
        h: 'When to replace',
        p: [
          'Replace when the cover is crushed rather than cracked, when the mounting points are destroyed, or when the reinforcement bar behind it is bent. A deformed bar is a safety part and is never straightened. Replace also when a genuine cover is cheap and available, because then the labour of a repair no longer pays.',
        ],
      },
      {
        h: 'Colour matching after repair',
        p: [
          'A repaired bumper goes through the same paint process as a steel panel, with one difference: plastic parts get a flexible additive in the primer and clear coat so the paint bends with the bumper instead of cracking. The colour is blended into the adjacent panels so the repair disappears.',
        ],
      },
    ],
  },
  {
    slug: 'ev-in-ethiopia',
    title: 'Electric cars in Ethiopia: what owners should know',
    summary: 'Charging, servicing and what changes when the engine is a battery.',
    season: 'Any time',
    readMinutes: 5,
    body: [
      {
        h: 'Why there are suddenly so many',
        p: [
          'Since 2024 Ethiopia has restricted the import of petrol and diesel passenger cars, and electricity from the grid is far cheaper per kilometre than imported fuel. The result is visible on every Addis road: electric cars went from a curiosity to a common sight in a couple of years, and most of their owners are the first in their family to run one.',
        ],
      },
      {
        h: 'Charging at home in Addis',
        p: [
          'Most charging happens at home overnight. A standard wall socket works but is slow and was never designed to run at full load for eight hours; a dedicated wall box on its own circuit, installed by an electrician, is safer and faster. Ask for surge protection: voltage swings and power cuts are part of life here, and the charger electronics are not cheap.',
          'Public chargers exist and are growing, but plan your week around home charging and treat public points as a backup. Cold is not the problem in Addis; altitude and long climbs are. Expect noticeably less range on the road up to Entoto or Sululta than on the flat.',
        ],
      },
      {
        h: 'What an EV service involves',
        p: [
          'No oil, no spark plugs, no exhaust, no clutch. What remains: brake fluid (it still ages), the cabin filter, coolant for the battery and motor, tyres that wear faster because the car is heavier and quicker off the line, and software updates. There is still a small 12-volt battery, and it fails just like the one in a petrol car. The high-voltage system is inspected by technicians trained to work on it, with the pack isolated first.',
        ],
      },
      {
        h: 'Body repair on EVs',
        p: [
          'Body and paint work on an electric car follows the same craft with extra rules. The high-voltage system is disconnected before any cutting, welding or panel work. The battery pack sits under the floor, so after any underside impact, a kerb strike or a deep pothole, the pack casing and its mounts are inspected. In the paint booth, the bake temperature is kept within the limits the battery maker sets. None of this is difficult; it is procedure, and it has to be followed every time.',
        ],
      },
      {
        h: 'Where Johnny Auto is heading',
        p: [
          'The company has spent decades rebuilding vehicles: body, electrical and finishing. Those are the same skills that assemble semi-knocked-down electric vehicles, and the planned plant in Gelan is the next step on that line. [EV servicing offered today at Megenagna: to confirm with the workshop.]',
        ],
      },
    ],
  },
];

import { Service, FAQ, Testimonial, ProjectGalleryItem } from './types';
import { IMAGES } from './assets';

export const SERVICES: Service[] = [
  {
    id: 'res-demo',
    title: 'Residential Building Demolition',
    description: 'Controlled demolition of independent houses, villas, and apartments up to multi-story buildings with minimum vibration, noise, and complete neighbor safety checks.',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&h=400&q=80',
    minCostEstimate: '₹120 / Sq.Ft',
    features: ['Neighbor wall safety sheets', 'Sound-reduction barriers', 'Manual dismantling for tight corners', 'Vibration monitoring']
  },
  {
    id: 'comm-demo',
    title: 'Commercial Building Demolition',
    description: 'Expert clearance of shopping complexes, multi-story office towers, and hotels in high-traffic commercial hubs using heavy high-reach breaking machinery and safety screens.',
    iconName: 'Building2',
    image: IMAGES.commercial,
    minCostEstimate: '₹140 / Sq.Ft',
    features: ['Long-reach hydraulic breakers', 'Controlled material descent', 'Pre-demolition structural venting', 'Complete hazard assessment']
  },
  {
    id: 'house-demo',
    title: 'Old House Demolition',
    description: 'Specialized demolition of seasoned ancestral homes, weathered load-bearing structures, and old masonry brick houses to prepare land for your modern dream home.',
    iconName: 'Wrench',
    image: 'https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?auto=format&fit=crop&w=600&h=400&q=80',
    minCostEstimate: '₹110 / Sq.Ft',
    features: ['Scrap credit adjustment (Rebar/Wood)', 'Hand-dismantling of shared walls', 'Water spray dust suppressors', 'Utility line capping assistance']
  },
  {
    id: 'factory-demo',
    title: 'Factory & Industrial Demolition',
    description: 'Complete dismantlement of heavy steel-truss manufacturing warehouses, boiler plants, and large chimneys with precise steel slicing and scrap salvage.',
    iconName: 'Factory',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&h=400&q=80',
    minCostEstimate: 'Custom Proposal',
    features: ['Heavy shear attachments', 'Metal scrap sorting & buying', 'Hazardous material protocols', 'Rigorous machinery mobilization']
  },
  {
    id: 'interior-demo',
    title: 'Controlled Interior Demolition',
    description: 'Controlled non-structural strip-out of drywall, partitions, ceilings, plaster, and tiles in offices and retail centers without disturbing key load-bearing columns.',
    iconName: 'Maximize2',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=600&h=400&q=80',
    minCostEstimate: '₹45 / Sq.Ft',
    features: ['Night-shift operations available', 'Slab core-cutting & opening', 'Minimally-invasive hand tools', 'Air-scrubbers for indoor dust']
  },
  {
    id: 'structural',
    title: 'Structural Dismantling',
    description: 'Highly engineered cutting and removal of overhead water tanks, bridge structures, columns, and concrete beams using diamond wire saws and wall-sawing units.',
    iconName: 'Scissors',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&h=400&q=80',
    minCostEstimate: 'Calculated on Site',
    features: ['Diamond wire-sawing precision', 'Zero impact to adjacent pillars', 'Crane assistance for heavy logs', 'Engineering safety review']
  },
  {
    id: 'concrete-breaking',
    title: 'Concrete Breaking Services',
    description: 'Heavy breaking and removal of hard reinforced cement concrete (RCC) foundations, commercial pillars, retaining structures, and pathways with hydraulic breakers.',
    iconName: 'Hammer',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&h=400&q=80',
    minCostEstimate: '₹150 / Cubic Ft',
    features: ['High-torque hydraulic jackhammers', 'Heavy stone busters', 'Pneumatic breaker networks', 'Rebar separation & sorting']
  },
  {
    id: 'site-clearing',
    title: 'Site Clearing & Grubbing',
    description: 'Comprehensive clearing of weeds, tree trunk uprooting, thick organic root removal, and mechanical soil grading to provide a leveled building canvas.',
    iconName: 'Trees',
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=600&h=400&q=80',
    minCostEstimate: '₹15 / Sq.Ft',
    features: ['Root-uprooting grapple claws', 'JCB grader leveling', 'Weed clearing and pesticide prep', 'Sloped soil adjustments']
  },
  {
    id: 'debris-removal',
    title: 'Debris Removal & Disposal',
    description: 'Fast, systematic clearing, loading, and carting of debris using owned 10-wheel tippers & dumpers. Debris is routed to government-approved dumping yards.',
    iconName: 'Truck',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&h=400&q=80',
    minCostEstimate: '₹3,500 / Tipper Load',
    features: ['Continuous daily soil carting', 'Official dumping certificates', '90% Recyclable concrete routing', 'Immediate sweeping of perimeter roads']
  },
  {
    id: 'excavation',
    title: 'Excavation & Footing Digging',
    description: 'Accurate excavation for double-basement columns, building footings, drainage trenches, and rainwater tanks with certified machinery and GPS layout alignment.',
    iconName: 'Shovel',
    image: 'https://images.unsplash.com/photo-1579847250482-15f187a0774c?auto=format&fit=crop&w=600&h=400&q=80',
    minCostEstimate: '₹12 / CFT',
    features: ['Hitachi & JCB track excavator rigs', 'Trench trenching precision', 'Underground cable line precautions', 'Excavated soil moving options']
  }
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Site Inspection',
    description: 'Our senior engineer visits your location in Bangalore to assess structural thickness, neighbor distance, and utility connections.'
  },
  {
    step: 2,
    title: 'Project Planning',
    description: 'We outline the demolition sequence, select appropriate machinery (excavator/shear), design safety netting, and calculate metal scrap value credit.'
  },
  {
    step: 3,
    title: 'Safety Assessment',
    description: 'We erect high-density safety sheets (15ft+ tall), structural support props, secure utility lines (electrical/water/sewer), and coordinate neighbor approvals.'
  },
  {
    step: 4,
    title: 'Demolition Execution',
    description: 'Using high-tech machinery, we commence demolition from top to bottom. Dust suppressants (constant fine water mist) are deployed.'
  },
  {
    step: 5,
    title: 'Debris Removal',
    description: 'We separate ferrous and non-ferrous metals instantly, sort concrete stones, and load them into professional tipping trucks.'
  },
  {
    step: 6,
    title: 'Site Clearance & Leveling',
    description: 'We carry out final surface leveling with grading JCB models, clean the surrounding roads, and hand over a plot ready for new foundations.'
  }
];

export const BY_CHOOSE_ITEMS = [
  {
    title: 'Experienced Demolition Experts',
    description: 'Over 15+ years of active service executing projects in extremely congested localities of Bangalore with 100% safety record.'
  },
  {
    title: 'Latest Excavators & Equipment',
    description: 'We own or operate highly maintained hydraulic breakers, concrete cutters, concrete crash shears, and specialized long-reach boom arms.'
  },
  {
    title: 'Safety First Approach',
    description: 'Strict adherence to global demolition guidelines, full PPE for lab workers, heavy-duty tarpaulins, and neighboring property insurance protection.'
  },
  {
    title: 'Fast Project Completion',
    description: 'Our dedicated labor force of 50+ members combined with powerful mechanical power makes us finish residential demolitions in 4-7 days.'
  },
  {
    title: 'Affordable & Transparent Pricing',
    description: 'Honest itemized quotation. Plus, we buy back internal iron rebar, structural wood beams, and window frames, heavily discounting your final bill!'
  },
  {
    title: 'Licensed & Insured Professionals',
    description: 'Possessing government-registered license for demolition and complete accidental liability cover, keeping you free of any legal stress.'
  },
  {
    title: 'Environmentally Responsible Disposal',
    description: 'Up to 90% of old bricks and concrete is routed to local grinding crushers to make road bases or gravel, ensuring very visual landfill respect.'
  },
  {
    title: 'Free Site Assessment & Quote',
    description: 'Our Bangalore team provides complete engineering structural analysis and cost estimate within 24 hours of scheduling. Completely free.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Vikram Gowda',
    role: 'Managing Partner, Gowda & Sons Builders',
    projectType: 'Commercial Complex Demolition',
    location: 'Whitefield',
    quote: 'Master Building Demolition dismantled a G+4 commercial complex on a high-traffic Whitefield corridor next to a live metro zone. Outstanding teamwork! Their high-reach excavators brought down the masonry safely with negligible dust and zero debris spillage.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Dr. Anitha Reddy',
    role: 'Retiree, ancestral homeowner',
    projectType: 'Old House Demolition',
    location: 'Jayanagar',
    quote: 'I was very anxious about demolishing my ancestral duplex because the neighbor’s wall was practically touching ours. Master Building’s team carefully hand-dismantled the shared roof and walls. They also gave us very high value for our old teak wood frames and adjusted it against the service cost!',
    rating: 5
  },
  {
    id: 't3',
    name: 'Suresh Kumar',
    role: 'Operations Head, Shanti Polymers Factory',
    projectType: 'Industrial Shed & Boiler Dismantling',
    location: 'Electronic City',
    quote: 'We hired Master Building Demolition for clearing our retired warehouse. Their metal shears shredded the steel trusses with surgical speed. They arranged prompt tipper logistics and cleared 25,000 sq ft land in just 5 days. Truly professional contractors!',
    rating: 5
  }
];

export const PORTFOLIO_PROJECTS: ProjectGalleryItem[] = [
  {
    id: 'proj-1',
    title: 'Ancestral Duplex Villa Demolition',
    location: 'Jayanagar 4th Block, Bangalore',
    type: 'Old Residential Building',
    beforeImg: 'before_demolition', // maps to generated key
    duringImg: 'during_demolition', // maps to generated key
    afterImg: 'after_demolition', // maps to generated key
    description: 'A 50-year-old load-bearing brick masonry duplex situated between close residential units. Safely dismantled without any damage to common foundation walls.',
    completedYear: '2025'
  },
  {
    id: 'proj-2',
    title: 'Commercial Multi-story Retail Site',
    location: 'Whitefield, Bangalore',
    type: 'Reinforced Concrete G+3 Complex',
    beforeImg: 'before_demolition',
    duringImg: 'during_demolition',
    afterImg: 'after_demolition',
    description: 'Demolished concrete slab with high-reach heavy breakers. Heavy use of water cannons to minimize dust travel to close adjacent offices.',
    completedYear: '2026'
  },
  {
    id: 'proj-3',
    title: 'Industrial Manufacturing Shed Clearance',
    location: 'Electronic City Phase 1, Bangalore',
    type: 'Heavy Steel-Truss Warehouse',
    beforeImg: 'before_demolition',
    duringImg: 'during_demolition',
    afterImg: 'after_demolition',
    description: 'High-speed metal shearing and concrete base foundations demolition. Over 45 tons of rebar and mild steel recycled safely with credits passed to factory owner.',
    completedYear: '2025'
  }
];

export const SERVICE_LOCATIONS = [
  { name: 'Indiranagar', description: 'Central Bangalore East - Fast 2hr inspection' },
  { name: 'Whitefield', description: 'Bangalore East IT Hub - Heavy equipment available' },
  { name: 'Jayanagar', description: 'South business/residential - Specialized hand-dismantling' },
  { name: 'Electronic City', description: 'South IT Park - Factory/warehouse specialists' },
  { name: 'Hebbal', description: 'North connectivity - High-reach machinery ready' },
  { name: 'Yelahanka', description: 'Far North hub - Heavy excavator logistics' },
  { name: 'KR Puram', description: 'East region - Fast debris removal' },
  { name: 'Marathahalli', description: 'Outer ring road corridor - Complete site leveling' },
  { name: 'HSR Layout', description: 'Southeast tech suburb - soundproofing panels' },
  { name: 'Koramangala', description: 'Elite South hub - Strict quiet demolition' },
  { name: 'Rajajinagar', description: 'West residential zone - Neighbor safety specialists' },
  { name: 'Banashankari', description: 'South West zone - House rebuilding clearing' },
  { name: 'JP Nagar', description: 'South premium sector - Concrete breaking core' },
  { name: 'RR Nagar', description: 'West hub - Fast JCB & loader mobilization' },
  { name: 'All Bangalore Locations', description: 'We serve all 240+ wards of Bruhat Bengaluru Mahanagara Palike (BBMP)!' }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What is the cost of building demolition in Bangalore?',
    answer: 'The cost varies between ₹100 to ₹160 per square foot for standard residential or commercial structures. However, Master Building provides a "REBAR & SCRAP ADJUSTMENT". The value of iron rod rebar, copper pipes, wooden doors, and window frames recovered from your property can be deducted from the cost. In many cases, if the scrap value is high, you might get the demolition done for FREE, or we might EVEN PAY YOU!',
    category: 'cost'
  },
  {
    id: 'faq-2',
    question: 'How long does it take to demolish an independent building?',
    answer: 'A standard old house (G+1 or G+2) takes about 4 to 7 days for complete demolition, sorting, debris removal, and leveling. Large commercial structures or factories might take 2 to 3 weeks depending on the complexity, height, and proximity to adjacent buildings.',
    category: 'process'
  },
  {
    id: 'faq-3',
    question: 'Do you remove debris and what do you do with it?',
    answer: 'Yes, we handle complete waste management. We own a dedicated fleet of 10-wheel tipper trucks. Debris is carted out daily. We route 90% of concrete and brick rubble to recycling stations in Bangalore, where they are crushed into aggregates used for laying new road beds, promoting eco-friendly disposal.',
    category: 'general'
  },
  {
    id: 'faq-4',
    question: 'Is BBMP permission or government approval required for demolition?',
    answer: 'Yes, Bruhat Bengaluru Mahanagara Palike (BBMP) requires a standard demolition permit or structural safety certificate before starting structure demolition. Our expert team assists in arranging structural stability reports, surveying neighbor safety clearances, and guiding you through the BBMP building license compliance.',
    category: 'safety'
  },
  {
    id: 'faq-5',
    question: 'Do you provide excavation and footing digging services?',
    answer: 'Absolutely. We do not just clear your site; we also prepare it for your new building. Master Building offers full-spectrum foundation excavation, footing digging, basement excavation, and soil compaction services using our robust JCB and Hitachi machines aligned with your architect’s blueprints.',
    category: 'general'
  },
  {
    id: 'faq-6',
    question: 'Are you available across entire Bangalore and outer ring roads?',
    answer: 'Yes, Master Building Demolition has operational hubs strategically located in East (Whitefield), South (Jayanagar/Banashankari), North (Hebbal/Yelahanka), and West (RR Nagar). We serve the entire BBMP jurisdiction, surrounding layouts, and industrial corridors around Nelamangala, Hosur road, and Devanahalli.',
    category: 'general'
  }
];

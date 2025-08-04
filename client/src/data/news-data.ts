import { NewsEvent } from "@shared/schema";

export const sampleNewsData: NewsEvent[] = [
  {
    id: 1,
    title: "China Conducts Large-Scale Military Drills Near Taiwan",
    source: "Reuters",
    published_date: "2025-08-03",
    content: "China conducted large-scale military drills around Taiwan's airspace and waters in response to recent diplomatic visits. The exercises involved over 100 aircraft and multiple naval vessels, marking the largest show of force in the Taiwan Strait this year. Regional tensions have escalated following high-level diplomatic meetings between Taiwan and its international partners.",
    location: { country: "Taiwan", city: "Taipei", latitude: 25.0330, longitude: 121.5654 },
    category: "conflict",
    entities: { 
      countries: ["China", "Taiwan", "United States"], 
      people: ["Xi Jinping", "William Lai"],
      organizations: ["PLA", "Taiwan Defense Ministry"]
    },
    ai_summary: "China conducted military drills near Taiwan following diplomatic tensions. U.S. calls for de-escalation while regional allies monitor situation closely.",
    tags: ["Military", "Asia-Pacific", "Geopolitics"],
    sentiment: "Negative",
    sentiment_score: 0.92,
    geopolitical_impact: 9.2,
    conflict_escalation_probability: 0.75,
    economic_impact: 8.1,
    educational_context: {
      learning_objectives: [
        "Understand cross-strait relations",
        "Analyze regional security dynamics",
        "Evaluate international responses to conflicts"
      ],
      related_topics: ["One China Policy", "Regional Security", "International Law"]
    },
    trend_analysis: "Escalating pattern over past 6 months",
    related_events: [2, 11],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 2,
    title: "UN Climate Summit Reaches Historic Agreement in Geneva",
    source: "BBC",
    published_date: "2025-08-01",
    content: "World leaders at the UN Climate Summit in Geneva reached a groundbreaking agreement on carbon reduction targets...",
    location: { country: "Switzerland", city: "Geneva", latitude: 46.2044, longitude: 6.1432 },
    category: "diplomacy",
    entities: { 
      countries: ["Switzerland", "France", "India", "Brazil", "Germany"], 
      organizations: ["United Nations", "IPCC"],
      people: ["António Guterres"]
    },
    ai_summary: "Historic climate agreement reached with 195 countries committing to accelerated carbon reduction. Binding targets set for 2030.",
    tags: ["Climate", "Diplomacy", "Environment"],
    sentiment: "Positive",
    sentiment_score: 0.87,
    geopolitical_impact: 8.9,
    conflict_escalation_probability: 0.1,
    economic_impact: 7.8,
    educational_context: {
      learning_objectives: [
        "Understand multilateral diplomacy",
        "Analyze climate policy frameworks",
        "Evaluate global cooperation mechanisms"
      ],
      related_topics: ["Paris Agreement", "Global Governance", "Environmental Policy"]
    },
    trend_analysis: "Positive momentum building since COP28",
    related_events: [8, 15],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 3,
    title: "Devastating 7.4 Earthquake Strikes Northern Japan",
    source: "NHK World",
    published_date: "2025-01-01",
    content: "A powerful 7.4 magnitude earthquake struck northern Japan, causing widespread damage and triggering tsunami warnings...",
    location: { country: "Japan", city: "Sendai", latitude: 38.2682, longitude: 140.8694 },
    category: "disaster",
    entities: { 
      countries: ["Japan"], 
      organizations: ["Japan Meteorological Agency", "Japanese Red Cross"],
      people: ["Fumio Kishida"]
    },
    ai_summary: "Major earthquake hits northern Japan with tsunami warnings issued. International aid mobilizing as damage assessment continues.",
    tags: ["Natural Disaster", "Emergency Response", "Asia"],
    sentiment: "Negative",
    sentiment_score: 0.94,
    geopolitical_impact: 6.8,
    conflict_escalation_probability: 0.05,
    economic_impact: 8.9,
    educational_context: {
      learning_objectives: [
        "Understand natural disaster preparedness",
        "Analyze emergency response systems",
        "Evaluate international humanitarian aid"
      ],
      related_topics: ["Pacific Ring of Fire", "Disaster Management", "International Aid"]
    },
    trend_analysis: "Increased seismic activity in region",
    related_events: [9, 16],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 4,
    title: "Germany Launches Revolutionary Hydrogen Rail Network",
    source: "Deutsche Welle",
    published_date: "2024-12-30",
    content: "Germany inaugurated the world's first nationwide hydrogen-powered passenger rail network, marking a major step in green transportation...",
    location: { country: "Germany", city: "Berlin", latitude: 52.5200, longitude: 13.4050 },
    category: "innovation",
    entities: { 
      countries: ["Germany"], 
      organizations: ["Deutsche Bahn", "Siemens"],
      people: ["Olaf Scholz"]
    },
    ai_summary: "Germany launches world's first hydrogen rail network, setting global precedent for sustainable transportation innovation.",
    tags: ["Green Technology", "Transportation", "Innovation"],
    sentiment: "Positive",
    sentiment_score: 0.91,
    geopolitical_impact: 7.2,
    conflict_escalation_probability: 0.02,
    economic_impact: 8.4,
    educational_context: {
      learning_objectives: [
        "Understand renewable energy applications",
        "Analyze sustainable development goals",
        "Evaluate technological innovation impact"
      ],
      related_topics: ["Energy Transition", "Green Technology", "Sustainable Development"]
    },
    trend_analysis: "Growing investment in hydrogen infrastructure",
    related_events: [12, 18],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 5,
    title: "Catastrophic Flooding Displaces Millions in Bangladesh",
    source: "Al Jazeera",
    published_date: "2024-12-29",
    content: "Record monsoon rains have caused devastating floods across Bangladesh, displacing over 4 million people...",
    location: { country: "Bangladesh", city: "Dhaka", latitude: 23.8103, longitude: 90.4125 },
    category: "disaster",
    entities: { 
      countries: ["Bangladesh", "India"], 
      organizations: ["UNICEF", "Red Crescent"],
      people: ["Sheikh Hasina"]
    },
    ai_summary: "Severe flooding in Bangladesh displaces millions. Climate change blamed as international humanitarian response mobilizes.",
    tags: ["Climate Change", "Humanitarian Crisis", "South Asia"],
    sentiment: "Negative",
    sentiment_score: 0.89,
    geopolitical_impact: 7.1,
    conflict_escalation_probability: 0.25,
    economic_impact: 8.7,
    educational_context: {
      learning_objectives: [
        "Understand climate vulnerability",
        "Analyze humanitarian response coordination",
        "Evaluate disaster resilience strategies"
      ],
      related_topics: ["Climate Adaptation", "Disaster Risk Reduction", "Migration"]
    },
    trend_analysis: "Increasing frequency of extreme weather events",
    related_events: [3, 15],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 6,
    title: "NASA Artemis Mission Successfully Establishes Lunar Base Alpha",
    source: "NASA",
    published_date: "2024-12-28",
    content: "NASA's Artemis program reached a historic milestone with the successful establishment of a permanent lunar research station...",
    location: { country: "United States", city: "Houston", latitude: 29.7604, longitude: -95.3698 },
    category: "innovation",
    entities: { 
      countries: ["United States", "Canada", "Japan"], 
      organizations: ["NASA", "SpaceX", "ESA"],
      people: ["Bill Nelson"]
    },
    ai_summary: "NASA establishes first permanent lunar base, marking new era in space exploration and international cooperation.",
    tags: ["Space Exploration", "Technology", "International Cooperation"],
    sentiment: "Positive",
    sentiment_score: 0.95,
    geopolitical_impact: 8.7,
    conflict_escalation_probability: 0.01,
    economic_impact: 9.1,
    educational_context: {
      learning_objectives: [
        "Understand space exploration milestones",
        "Analyze international space cooperation",
        "Evaluate technological advancement impacts"
      ],
      related_topics: ["Space Race", "International Treaties", "Scientific Collaboration"]
    },
    trend_analysis: "Accelerating space exploration activities",
    related_events: [19, 20],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 7,
    title: "Major Measles Outbreak Spreads Across Central Africa",
    source: "WHO",
    published_date: "2024-12-27",
    content: "The World Health Organization declared a public health emergency as measles outbreaks spread across five Central African nations...",
    location: { country: "Democratic Republic of Congo", city: "Kinshasa", latitude: -4.4419, longitude: 15.2663 },
    category: "health",
    entities: { 
      countries: ["DR Congo", "Chad", "Central African Republic"], 
      organizations: ["WHO", "Médecins Sans Frontières"],
      people: ["Tedros Adhanom"]
    },
    ai_summary: "WHO declares health emergency over measles outbreak in Central Africa. Vaccination campaigns urgently needed across region.",
    tags: ["Public Health", "Disease Outbreak", "Africa"],
    sentiment: "Negative",
    sentiment_score: 0.86,
    geopolitical_impact: 6.9,
    conflict_escalation_probability: 0.15,
    economic_impact: 7.2,
    educational_context: {
      learning_objectives: [
        "Understand global health security",
        "Analyze disease prevention strategies",
        "Evaluate international health cooperation"
      ],
      related_topics: ["Global Health", "Vaccine Equity", "Healthcare Systems"]
    },
    trend_analysis: "Declining vaccination rates in conflict zones",
    related_events: [13, 17],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 8,
    title: "UK-EU Sign Comprehensive Post-Brexit Trade Enhancement Deal",
    source: "Financial Times",
    published_date: "2024-12-26",
    content: "The United Kingdom and European Union signed a landmark trade agreement enhancing economic cooperation post-Brexit...",
    location: { country: "United Kingdom", city: "London", latitude: 51.5074, longitude: -0.1278 },
    category: "diplomacy",
    entities: { 
      countries: ["United Kingdom", "European Union", "France", "Germany"], 
      organizations: ["European Commission", "UK Parliament"],
      people: ["Keir Starmer", "Ursula von der Leyen"]
    },
    ai_summary: "Historic UK-EU trade deal strengthens post-Brexit relations, boosting economic cooperation and regulatory alignment.",
    tags: ["Trade", "Brexit", "European Relations"],
    sentiment: "Positive",
    sentiment_score: 0.84,
    geopolitical_impact: 8.3,
    conflict_escalation_probability: 0.05,
    economic_impact: 9.2,
    educational_context: {
      learning_objectives: [
        "Understand Brexit consequences",
        "Analyze trade agreement structures",
        "Evaluate European integration processes"
      ],
      related_topics: ["European Integration", "Trade Policy", "Brexit Impact"]
    },
    trend_analysis: "Improving UK-EU relations trend",
    related_events: [2, 14],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 9,
    title: "Massive Wildfires Ravage British Columbia",
    source: "CBC News",
    published_date: "2024-12-25",
    content: "Unprecedented wildfires continue to burn across British Columbia, forcing mass evacuations and creating air quality emergencies...",
    location: { country: "Canada", city: "Vancouver", latitude: 49.2827, longitude: -123.1207 },
    category: "disaster",
    entities: { 
      countries: ["Canada", "United States"], 
      organizations: ["BC Wildfire Service", "Canadian Forces"],
      people: ["Justin Trudeau"]
    },
    ai_summary: "Record wildfires in BC force thousands to evacuate. Climate change intensifies fire season across western North America.",
    tags: ["Wildfire", "Climate Change", "Emergency Response"],
    sentiment: "Negative",
    sentiment_score: 0.88,
    geopolitical_impact: 6.4,
    conflict_escalation_probability: 0.08,
    economic_impact: 8.3,
    educational_context: {
      learning_objectives: [
        "Understand wildfire management",
        "Analyze climate change impacts",
        "Evaluate emergency response coordination"
      ],
      related_topics: ["Forest Management", "Climate Adaptation", "Emergency Planning"]
    },
    trend_analysis: "Intensifying wildfire seasons globally",
    related_events: [3, 5, 15],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 10,
    title: "India Launches National Digital Education Revolution",
    source: "Times of India",
    published_date: "2024-12-24",
    content: "India unveiled the world's largest digital education platform, providing free access to quality education for 300 million students...",
    location: { country: "India", city: "New Delhi", latitude: 28.6139, longitude: 77.2090 },
    category: "innovation",
    entities: { 
      countries: ["India"], 
      organizations: ["Ministry of Education", "ISRO"],
      people: ["Narendra Modi"]
    },
    ai_summary: "India launches massive digital education platform reaching 300 million students, revolutionizing educational access.",
    tags: ["Digital Education", "Innovation", "Social Development"],
    sentiment: "Positive",
    sentiment_score: 0.93,
    geopolitical_impact: 7.8,
    conflict_escalation_probability: 0.02,
    economic_impact: 8.6,
    educational_context: {
      learning_objectives: [
        "Understand digital transformation in education",
        "Analyze scalable technology solutions",
        "Evaluate social impact of innovation"
      ],
      related_topics: ["Digital Divide", "Educational Equity", "Technology Access"]
    },
    trend_analysis: "Accelerating digital education adoption globally",
    related_events: [4, 6],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 11,
    title: "US-Saudi Arabia Strategic Partnership Summit in Riyadh",
    source: "Washington Post",
    published_date: "2024-12-23",
    content: "High-level diplomatic talks between the United States and Saudi Arabia focused on regional stability and energy cooperation...",
    location: { country: "Saudi Arabia", city: "Riyadh", latitude: 24.7136, longitude: 46.6753 },
    category: "diplomacy",
    entities: { 
      countries: ["United States", "Saudi Arabia", "Iran"], 
      organizations: ["OPEC", "State Department"],
      people: ["Antony Blinken", "Mohammed bin Salman"]
    },
    ai_summary: "US-Saudi summit addresses regional security concerns and energy partnership, seeking Middle East stability.",
    tags: ["Middle East", "Energy Security", "Strategic Partnership"],
    sentiment: "Neutral",
    sentiment_score: 0.52,
    geopolitical_impact: 8.1,
    conflict_escalation_probability: 0.35,
    economic_impact: 8.8,
    educational_context: {
      learning_objectives: [
        "Understand Middle East geopolitics",
        "Analyze energy diplomacy",
        "Evaluate strategic partnerships"
      ],
      related_topics: ["Energy Security", "Regional Stability", "Diplomatic Relations"]
    },
    trend_analysis: "Evolving US-Middle East relationships",
    related_events: [1, 14],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 12,
    title: "Russia Unveils Advanced AI-Powered Defense System",
    source: "RT",
    published_date: "2024-12-22",
    content: "Russia demonstrated its new artificial intelligence-driven missile defense system, claiming significant technological advancement...",
    location: { country: "Russia", city: "Moscow", latitude: 55.7558, longitude: 37.6173 },
    category: "innovation",
    entities: { 
      countries: ["Russia", "China", "United States"], 
      organizations: ["Russian Defense Ministry", "Roscosmos"],
      people: ["Vladimir Putin"]
    },
    ai_summary: "Russia showcases AI defense technology, raising questions about global military balance and arms race acceleration.",
    tags: ["Military Technology", "Artificial Intelligence", "Defense"],
    sentiment: "Neutral",
    sentiment_score: 0.48,
    geopolitical_impact: 8.9,
    conflict_escalation_probability: 0.45,
    economic_impact: 7.9,
    educational_context: {
      learning_objectives: [
        "Understand military technology evolution",
        "Analyze arms race dynamics",
        "Evaluate AI in warfare implications"
      ],
      related_topics: ["Military Innovation", "Arms Control", "Technology Ethics"]
    },
    trend_analysis: "Increasing AI militarization globally",
    related_events: [1, 6],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 13,
    title: "Argentina's Economic Crisis Deepens as Inflation Hits Record High",
    source: "Bloomberg",
    published_date: "2024-12-21",
    content: "Argentina's inflation rate reached 180% annually, triggering widespread protests and economic uncertainty...",
    location: { country: "Argentina", city: "Buenos Aires", latitude: -34.6037, longitude: -58.3816 },
    category: "economy",
    entities: { 
      countries: ["Argentina", "Brazil", "Chile"], 
      organizations: ["IMF", "Central Bank of Argentina"],
      people: ["Javier Milei"]
    },
    ai_summary: "Argentina faces severe economic crisis with record inflation, prompting IMF intervention discussions and regional concern.",
    tags: ["Economic Crisis", "Inflation", "Latin America"],
    sentiment: "Negative",
    sentiment_score: 0.91,
    geopolitical_impact: 7.3,
    conflict_escalation_probability: 0.28,
    economic_impact: 9.4,
    educational_context: {
      learning_objectives: [
        "Understand inflation dynamics",
        "Analyze economic crisis management",
        "Evaluate international financial cooperation"
      ],
      related_topics: ["Monetary Policy", "Economic Stabilization", "Regional Economics"]
    },
    trend_analysis: "Deteriorating economic conditions in Latin America",
    related_events: [8, 11],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 14,
    title: "France Hosts International Tech4Peace Conference",
    source: "Le Monde",
    published_date: "2024-12-20",
    content: "Paris hosted a groundbreaking conference bringing together global leaders to discuss technology's role in promoting peace...",
    location: { country: "France", city: "Paris", latitude: 48.8566, longitude: 2.3522 },
    category: "innovation",
    entities: { 
      countries: ["France", "Germany", "Kenya", "Singapore"], 
      organizations: ["UNESCO", "European Commission"],
      people: ["Emmanuel Macron"]
    },
    ai_summary: "Paris conference explores technology solutions for global peace, featuring innovative approaches to conflict prevention.",
    tags: ["Peace Technology", "Innovation", "International Cooperation"],
    sentiment: "Positive",
    sentiment_score: 0.89,
    geopolitical_impact: 7.6,
    conflict_escalation_probability: 0.05,
    economic_impact: 6.8,
    educational_context: {
      learning_objectives: [
        "Understand technology for peace applications",
        "Analyze conflict prevention strategies",
        "Evaluate innovation in diplomacy"
      ],
      related_topics: ["Peace Studies", "Technology Ethics", "Preventive Diplomacy"]
    },
    trend_analysis: "Growing focus on technology for social good",
    related_events: [2, 6, 10],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 15,
    title: "Sudan Reaches Ceasefire Agreement After UN Mediation",
    source: "UN News",
    published_date: "2024-12-19",
    content: "Warring factions in Sudan agreed to a comprehensive ceasefire following intensive UN-mediated peace negotiations...",
    location: { country: "Sudan", city: "Khartoum", latitude: 15.5007, longitude: 32.5599 },
    category: "conflict",
    entities: { 
      countries: ["Sudan", "Egypt", "Chad"], 
      organizations: ["United Nations", "African Union"],
      people: ["António Guterres"]
    },
    ai_summary: "Sudan ceasefire agreement offers hope for peace after months of conflict. International community pledges reconstruction support.",
    tags: ["Peace Agreement", "Conflict Resolution", "Africa"],
    sentiment: "Positive",
    sentiment_score: 0.78,
    geopolitical_impact: 8.2,
    conflict_escalation_probability: 0.25,
    economic_impact: 7.9,
    educational_context: {
      learning_objectives: [
        "Understand peace negotiation processes",
        "Analyze international mediation",
        "Evaluate post-conflict reconstruction"
      ],
      related_topics: ["Conflict Resolution", "Peacekeeping", "Post-Conflict Recovery"]
    },
    trend_analysis: "Cautious optimism for regional stability",
    related_events: [1, 7],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 16,
    title: "Australia Launches World's Largest Coral Reef Restoration Project",
    source: "ABC News Australia",
    published_date: "2024-12-18",
    content: "Australia initiated an unprecedented $2 billion coral reef restoration program targeting the Great Barrier Reef...",
    location: { country: "Australia", city: "Cairns", latitude: -16.9186, longitude: 145.7781 },
    category: "climate",
    entities: { 
      countries: ["Australia"], 
      organizations: ["Great Barrier Reef Foundation", "CSIRO"],
      people: ["Anthony Albanese"]
    },
    ai_summary: "Australia launches massive coral restoration project, combining cutting-edge marine science with climate adaptation strategies.",
    tags: ["Marine Conservation", "Climate Adaptation", "Environmental Science"],
    sentiment: "Positive",
    sentiment_score: 0.92,
    geopolitical_impact: 6.7,
    conflict_escalation_probability: 0.02,
    economic_impact: 7.4,
    educational_context: {
      learning_objectives: [
        "Understand marine ecosystem restoration",
        "Analyze climate adaptation strategies",
        "Evaluate environmental conservation efforts"
      ],
      related_topics: ["Marine Biology", "Climate Science", "Conservation Technology"]
    },
    trend_analysis: "Increasing investment in ecosystem restoration",
    related_events: [2, 5, 9],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 17,
    title: "Nigeria Launches Continental Free Trade Hub in Lagos",
    source: "African Business",
    published_date: "2024-12-17",
    content: "Nigeria opened Africa's largest free trade zone, aiming to boost intra-African commerce under the AfCFTA agreement...",
    location: { country: "Nigeria", city: "Lagos", latitude: 6.5244, longitude: 3.3792 },
    category: "economy",
    entities: { 
      countries: ["Nigeria", "Ghana", "Kenya", "South Africa"], 
      organizations: ["AfCFTA Secretariat", "African Development Bank"],
      people: ["Bola Tinubu"]
    },
    ai_summary: "Nigeria's mega trade hub launches, potentially transforming African commerce and regional economic integration.",
    tags: ["African Trade", "Economic Integration", "Free Trade"],
    sentiment: "Positive",
    sentiment_score: 0.85,
    geopolitical_impact: 7.9,
    conflict_escalation_probability: 0.08,
    economic_impact: 8.7,
    educational_context: {
      learning_objectives: [
        "Understand regional economic integration",
        "Analyze free trade zone impacts",
        "Evaluate African economic development"
      ],
      related_topics: ["Regional Trade", "Economic Development", "African Integration"]
    },
    trend_analysis: "Growing African economic integration",
    related_events: [8, 13],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 18,
    title: "Israel-Palestine Peace Talks Resume in Oslo",
    source: "Jerusalem Post",
    published_date: "2024-12-16",
    content: "Israeli and Palestinian representatives returned to peace negotiations in Oslo, mediated by Norway and the EU...",
    location: { country: "Norway", city: "Oslo", latitude: 59.9139, longitude: 10.7522 },
    category: "diplomacy",
    entities: { 
      countries: ["Israel", "Palestine", "Norway", "European Union"], 
      organizations: ["EU", "Arab League"],
      people: ["Benjamin Netanyahu", "Mahmoud Abbas"]
    },
    ai_summary: "Long-stalled peace talks resume in Oslo with international backing, offering renewed hope for Middle East resolution.",
    tags: ["Peace Process", "Middle East", "Mediation"],
    sentiment: "Positive",
    sentiment_score: 0.73,
    geopolitical_impact: 9.1,
    conflict_escalation_probability: 0.40,
    economic_impact: 8.2,
    educational_context: {
      learning_objectives: [
        "Understand Middle East peace process",
        "Analyze international mediation roles",
        "Evaluate conflict resolution mechanisms"
      ],
      related_topics: ["Peace Negotiations", "Middle East History", "International Law"]
    },
    trend_analysis: "Tentative progress in regional diplomacy",
    related_events: [1, 11, 15],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 19,
    title: "China Announces Mars Colony Preparation Mission",
    source: "Xinhua",
    published_date: "2024-12-15",
    content: "China revealed plans for its most ambitious space mission, preparing for eventual human settlement on Mars...",
    location: { country: "China", city: "Beijing", latitude: 39.9042, longitude: 116.4074 },
    category: "innovation",
    entities: { 
      countries: ["China", "United States", "Russia"], 
      organizations: ["CNSA", "Chinese Academy of Sciences"],
      people: ["Xi Jinping"]
    },
    ai_summary: "China unveils Mars colonization program, intensifying international space race and technological competition.",
    tags: ["Space Exploration", "Mars Mission", "Technology Competition"],
    sentiment: "Positive",
    sentiment_score: 0.81,
    geopolitical_impact: 8.6,
    conflict_escalation_probability: 0.15,
    economic_impact: 8.9,
    educational_context: {
      learning_objectives: [
        "Understand space exploration competition",
        "Analyze technological advancement impacts",
        "Evaluate international space cooperation"
      ],
      related_topics: ["Space Race", "Planetary Science", "International Competition"]
    },
    trend_analysis: "Intensifying space exploration rivalry",
    related_events: [6, 12],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 20,
    title: "Brazil Hosts Amazon Conservation Summit with Indigenous Leaders",
    source: "Reuters Brazil",
    published_date: "2024-12-14",
    content: "Brazil convened an unprecedented Amazon conservation summit featuring indigenous leaders and international experts...",
    location: { country: "Brazil", city: "Manaus", latitude: -3.1190, longitude: -60.0217 },
    category: "climate",
    entities: { 
      countries: ["Brazil", "Peru", "Colombia", "Ecuador"], 
      organizations: ["Amazon Cooperation Treaty Organization", "UNEP"],
      people: ["Luiz Inácio Lula da Silva"]
    },
    ai_summary: "Brazil leads Amazon conservation efforts with indigenous partnership, setting new model for environmental protection.",
    tags: ["Amazon Conservation", "Indigenous Rights", "Environmental Protection"],
    sentiment: "Positive",
    sentiment_score: 0.88,
    geopolitical_impact: 7.8,
    conflict_escalation_probability: 0.05,
    economic_impact: 7.6,
    educational_context: {
      learning_objectives: [
        "Understand rainforest conservation",
        "Analyze indigenous knowledge systems",
        "Evaluate environmental cooperation"
      ],
      related_topics: ["Biodiversity", "Indigenous Rights", "Climate Policy"]
    },
    trend_analysis: "Growing recognition of indigenous conservation roles",
    related_events: [2, 16],
    study_guide: null,
    created_at: new Date()
  }
];

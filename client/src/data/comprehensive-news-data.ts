import { NewsEvent } from "@shared/schema";

export const comprehensiveNewsData: NewsEvent[] = [
  {
    id: 1,
    title: "Tensions Escalate Between China and Taiwan After Military Drills",
    source: "Reuters",
    published_date: "2025-08-03",
    content: "China conducted large-scale military drills around Taiwan's airspace and waters, involving over 150 aircraft and 30 naval vessels in the largest display of force this year. The exercises simulated blockade scenarios and amphibious assault training, raising concerns among regional allies about potential invasion preparations.",
    location: { country: "Taiwan", city: "Taipei", latitude: 25.0330, longitude: 121.5654 },
    category: "conflict",
    entities: { 
      countries: ["China", "Taiwan", "United States", "Japan"], 
      people: ["Xi Jinping", "William Lai", "Antony Blinken"],
      organizations: ["PLA", "Taiwan Defense Ministry", "QUAD Alliance"]
    },
    ai_summary: "China's unprecedented military exercises near Taiwan signal heightened cross-strait tensions. The drills demonstrate Beijing's capability for rapid mobilization while testing regional alliance responses and international resolve.",
    tags: ["Military", "Asia-Pacific", "Geopolitics", "Strategic Competition"],
    sentiment: "Negative",
    sentiment_score: 0.92,
    geopolitical_impact: 9.5,
    conflict_escalation_probability: 0.78,
    economic_impact: 8.7,
    educational_context: {
      learning_objectives: [
        "Analyze cross-strait relations and One China Policy implications",
        "Evaluate regional security architecture in Asia-Pacific",
        "Understand military deterrence strategies and alliance dynamics"
      ],
      related_topics: ["Taiwan Strait Crisis", "Regional Security", "Great Power Competition", "Military Strategy"]
    },
    trend_analysis: "Escalating pattern with 40% increase in military activities over 6 months, indicating strategic shift toward more assertive posture",
    related_events: [2, 11, 19],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 2,
    title: "UN Hosts Global Summit on Climate Action in Geneva",
    source: "BBC",
    published_date: "2025-08-01",
    content: "World leaders gathered in Geneva for a critical climate summit, securing commitments for $300 billion in climate financing and establishing new carbon reduction targets. The summit addressed adaptation strategies for vulnerable nations and breakthrough agreements on renewable energy transition timelines.",
    location: { country: "Switzerland", city: "Geneva", latitude: 46.2044, longitude: 6.1432 },
    category: "diplomacy",
    entities: { 
      countries: ["Switzerland", "India", "Brazil", "France", "Germany", "Maldives"], 
      organizations: ["United Nations", "IPCC", "Green Climate Fund"],
      people: ["António Guterres", "Narendra Modi", "Emmanuel Macron"]
    },
    ai_summary: "Historic climate agreement achieved with unprecedented financial commitments and binding emission targets. The summit demonstrates renewed multilateral cooperation on existential global challenges.",
    tags: ["Climate", "Diplomacy", "Environment", "Multilateralism"],
    sentiment: "Positive",
    sentiment_score: 0.87,
    geopolitical_impact: 8.9,
    conflict_escalation_probability: 0.05,
    economic_impact: 9.2,
    educational_context: {
      learning_objectives: [
        "Examine multilateral climate governance mechanisms",
        "Analyze climate finance and technology transfer frameworks",
        "Evaluate small island state vulnerability and adaptation strategies"
      ],
      related_topics: ["Paris Agreement", "Climate Justice", "Global Governance", "Sustainable Development"]
    },
    trend_analysis: "Positive momentum building with increased climate ambition post-COP28, showing 65% improvement in international cooperation",
    related_events: [8, 15, 18],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 3,
    title: "Deadly Earthquake Hits Northern Japan",
    source: "NHK World",
    published_date: "2025-07-28",
    content: "A devastating 7.4 magnitude earthquake struck northern Japan, causing widespread destruction and triggering tsunami warnings across the Pacific Rim. The disaster has resulted in over 200 casualties and displaced thousands, highlighting Japan's ongoing seismic vulnerabilities despite advanced preparedness systems.",
    location: { country: "Japan", city: "Sendai", latitude: 38.2682, longitude: 140.8694 },
    category: "disaster",
    entities: { 
      countries: ["Japan", "South Korea", "Philippines"], 
      organizations: ["Japan Meteorological Agency", "Japanese Red Cross", "Pacific Tsunami Warning Center"],
      people: ["Fumio Kishida", "Emperor Naruhito"]
    },
    ai_summary: "Major earthquake demonstrates Japan's disaster preparedness capabilities while revealing ongoing vulnerabilities. International humanitarian coordination showcases regional cooperation in crisis response.",
    tags: ["Natural Disaster", "Emergency Response", "Asia", "Tsunami"],
    sentiment: "Negative",
    sentiment_score: 0.94,
    geopolitical_impact: 6.8,
    conflict_escalation_probability: 0.02,
    economic_impact: 8.5,
    educational_context: {
      learning_objectives: [
        "Understand seismic activity patterns in the Pacific Ring of Fire",
        "Analyze disaster preparedness and early warning systems",
        "Evaluate international humanitarian response coordination"
      ],
      related_topics: ["Plate Tectonics", "Disaster Risk Reduction", "Emergency Management", "Regional Cooperation"]
    },
    trend_analysis: "Increased seismic activity correlates with broader Pacific Rim geological instability patterns over past decade",
    related_events: [9, 16, 20],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 4,
    title: "Germany Launches Revolutionary Hydrogen Rail Network",
    source: "Deutsche Welle",
    published_date: "2025-07-25",
    content: "Germany inaugurated the world's first nationwide hydrogen-powered passenger rail network, connecting 500 stations across the country. The €15 billion infrastructure project represents a major breakthrough in sustainable transportation, eliminating 2.8 million tons of CO2 emissions annually while creating 50,000 green jobs.",
    location: { country: "Germany", city: "Berlin", latitude: 52.5200, longitude: 13.4050 },
    category: "innovation",
    entities: { 
      countries: ["Germany", "Netherlands", "Denmark"], 
      organizations: ["Deutsche Bahn", "Siemens", "European Green Deal"],
      people: ["Olaf Scholz", "Ursula von der Leyen"]
    },
    ai_summary: "Germany's hydrogen rail revolution sets global precedent for decarbonized transportation systems. The initiative demonstrates large-scale green technology deployment and creates blueprint for sustainable mobility transformation.",
    tags: ["Green Technology", "Transportation", "Innovation", "Sustainability"],
    sentiment: "Positive",
    sentiment_score: 0.93,
    geopolitical_impact: 7.8,
    conflict_escalation_probability: 0.01,
    economic_impact: 8.9,
    educational_context: {
      learning_objectives: [
        "Examine renewable energy applications in transportation infrastructure",
        "Analyze economic transformation through green technology adoption",
        "Evaluate policy frameworks for sustainable development goals"
      ],
      related_topics: ["Energy Transition", "Green Technology", "Industrial Policy", "Climate Action"]
    },
    trend_analysis: "Accelerating hydrogen economy development with 200% increase in infrastructure investments across Europe",
    related_events: [10, 12, 17],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 5,
    title: "Severe Flooding Affects Millions in Bangladesh",
    source: "Al Jazeera",
    published_date: "2025-08-02",
    content: "Record monsoon rains have caused catastrophic flooding across Bangladesh, displacing over 6 million people and submerging one-third of the country. The climate-induced disaster has destroyed 1.2 million homes and threatens food security for 45 million people, highlighting Bangladesh's extreme climate vulnerability.",
    location: { country: "Bangladesh", city: "Dhaka", latitude: 23.8103, longitude: 90.4125 },
    category: "disaster",
    entities: { 
      countries: ["Bangladesh", "India", "Myanmar"], 
      organizations: ["UNICEF", "World Food Programme", "Red Crescent"],
      people: ["Sheikh Hasina", "Antonio Guterres"]
    },
    ai_summary: "Bangladesh flooding crisis exemplifies climate change impacts on vulnerable populations. The disaster reveals urgent need for climate adaptation financing and regional cooperation on transboundary water management.",
    tags: ["Climate Change", "Humanitarian Crisis", "South Asia", "Flooding"],
    sentiment: "Negative",
    sentiment_score: 0.91,
    geopolitical_impact: 7.4,
    conflict_escalation_probability: 0.28,
    economic_impact: 8.6,
    educational_context: {
      learning_objectives: [
        "Analyze climate vulnerability and adaptation strategies in deltaic regions",
        "Examine humanitarian response coordination mechanisms",
        "Understand transboundary water governance challenges"
      ],
      related_topics: ["Climate Adaptation", "Human Security", "Water Diplomacy", "Development Resilience"]
    },
    trend_analysis: "Intensifying extreme weather events with 85% increase in flood frequency over past two decades",
    related_events: [3, 15, 18],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 6,
    title: "NASA Announces Successful Moon Water Extraction Test",
    source: "NASA",
    published_date: "2025-07-30",
    content: "NASA's Artemis program achieved a historic milestone by successfully extracting and purifying 1,000 liters of water from lunar ice deposits. The breakthrough technology enables sustainable lunar habitation and serves as a stepping stone for Mars exploration, representing humanity's greatest space achievement since Apollo.",
    location: { country: "United States", city: "Cape Canaveral", latitude: 28.3922, longitude: -80.6077 },
    category: "innovation",
    entities: { 
      countries: ["United States", "Canada", "Japan", "Italy"], 
      organizations: ["NASA", "SpaceX", "ESA", "CSA"],
      people: ["Bill Nelson", "Elon Musk", "Samantha Cristoforetti"]
    },
    ai_summary: "Lunar water extraction breakthrough revolutionizes space exploration capabilities. The achievement establishes foundation for permanent lunar presence and interplanetary exploration while advancing international space cooperation.",
    tags: ["Space Exploration", "Technology", "International Cooperation", "Scientific Discovery"],
    sentiment: "Positive",
    sentiment_score: 0.96,
    geopolitical_impact: 8.7,
    conflict_escalation_probability: 0.01,
    economic_impact: 9.4,
    educational_context: {
      learning_objectives: [
        "Understand space resource utilization and in-situ resource utilization",
        "Analyze international space law and cooperation frameworks",
        "Examine technological innovation in extreme environments"
      ],
      related_topics: ["Space Technology", "International Treaties", "Scientific Collaboration", "Resource Economics"]
    },
    trend_analysis: "Accelerating space commercialization with 300% increase in lunar mission planning globally",
    related_events: [19, 20, 12],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 7,
    title: "Measles Outbreak Declared in Central Africa",
    source: "WHO",
    published_date: "2025-08-04",
    content: "The World Health Organization declared a public health emergency as measles outbreaks spread across five Central African nations, affecting over 150,000 people with a mortality rate of 6%. Vaccination campaigns face challenges from conflict zones, logistics constraints, and vaccine hesitancy, threatening regional health security.",
    location: { country: "Democratic Republic of Congo", city: "Kinshasa", latitude: -4.4419, longitude: 15.2663 },
    category: "health",
    entities: { 
      countries: ["DR Congo", "Chad", "Central African Republic", "Cameroon"], 
      organizations: ["WHO", "Médecins Sans Frontières", "GAVI", "UNICEF"],
      people: ["Tedros Adhanom", "Matshidiso Moeti"]
    },
    ai_summary: "Central Africa measles outbreak highlights critical gaps in health system resilience and vaccination coverage. The crisis demands coordinated international response and long-term health infrastructure investment.",
    tags: ["Public Health", "Disease Outbreak", "Africa", "Vaccination"],
    sentiment: "Negative",
    sentiment_score: 0.88,
    geopolitical_impact: 6.9,
    conflict_escalation_probability: 0.18,
    economic_impact: 7.1,
    educational_context: {
      learning_objectives: [
        "Examine global health security and disease surveillance systems",
        "Analyze vaccine equity and distribution challenges",
        "Understand health system strengthening in conflict-affected regions"
      ],
      related_topics: ["Global Health", "Vaccine Diplomacy", "Health Security", "Humanitarian Access"]
    },
    trend_analysis: "Declining vaccination rates in conflict zones with 35% decrease in routine immunization coverage",
    related_events: [13, 14, 16],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 8,
    title: "UK and EU Sign New Trade Agreement",
    source: "Financial Times",
    published_date: "2025-07-31",
    content: "The United Kingdom and European Union finalized a comprehensive trade enhancement agreement, reducing barriers on £650 billion in annual trade. The deal includes mutual recognition of professional qualifications, streamlined customs procedures, and enhanced cooperation on financial services, marking a new chapter in post-Brexit relations.",
    location: { country: "United Kingdom", city: "London", latitude: 51.5074, longitude: -0.1278 },
    category: "diplomacy",
    entities: { 
      countries: ["United Kingdom", "France", "Germany", "Ireland"], 
      organizations: ["European Commission", "UK Parliament", "City of London"],
      people: ["Keir Starmer", "Ursula von der Leyen", "Emmanuel Macron"]
    },
    ai_summary: "UK-EU trade agreement represents pragmatic reset in post-Brexit relationship. The deal balances sovereignty concerns with economic integration, creating model for third-country EU partnerships.",
    tags: ["Trade", "Brexit", "European Relations", "Economic Integration"],
    sentiment: "Positive",
    sentiment_score: 0.84,
    geopolitical_impact: 8.1,
    conflict_escalation_probability: 0.03,
    economic_impact: 9.1,
    educational_context: {
      learning_objectives: [
        "Analyze post-Brexit relationship evolution and trade policy",
        "Examine regional integration versus national sovereignty tensions",
        "Evaluate economic diplomacy and negotiation strategies"
      ],
      related_topics: ["European Integration", "Trade Policy", "Brexit Impact", "Economic Sovereignty"]
    },
    trend_analysis: "Improving UK-EU relations with 45% increase in cooperative initiatives since 2024 election",
    related_events: [2, 14, 17],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 9,
    title: "Wildfires Rage Across Western Canada",
    source: "CBC News",
    published_date: "2025-08-01",
    content: "Unprecedented wildfires continue burning across British Columbia and Alberta, destroying 2.8 million hectares and forcing 85,000 people to evacuate. The fires have released 180 million tons of CO2, creating air quality emergencies across North America and highlighting accelerating climate change impacts.",
    location: { country: "Canada", city: "Vancouver", latitude: 49.2827, longitude: -123.1207 },
    category: "disaster",
    entities: { 
      countries: ["Canada", "United States"], 
      organizations: ["BC Wildfire Service", "Canadian Forces", "FEMA"],
      people: ["Justin Trudeau", "David Eby"]
    },
    ai_summary: "Canadian wildfire crisis demonstrates climate change acceleration in boreal regions. The disaster requires enhanced international firefighting cooperation and long-term forest management adaptation strategies.",
    tags: ["Wildfire", "Climate Change", "Emergency Response", "Environmental Crisis"],
    sentiment: "Negative",
    sentiment_score: 0.89,
    geopolitical_impact: 6.2,
    conflict_escalation_probability: 0.06,
    economic_impact: 8.4,
    educational_context: {
      learning_objectives: [
        "Understand wildfire behavior and climate change interactions",
        "Analyze emergency management and cross-border cooperation",
        "Examine forest management and ecosystem adaptation strategies"
      ],
      related_topics: ["Climate Adaptation", "Forest Management", "Emergency Coordination", "Ecosystem Services"]
    },
    trend_analysis: "Exponential increase in wildfire intensity with 250% more extreme fire weather days annually",
    related_events: [3, 5, 15],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 10,
    title: "India Launches Digital Education Initiative for Rural Schools",
    source: "Times of India",
    published_date: "2025-07-29",
    content: "India unveiled the world's largest digital education platform, providing free access to quality education for 300 million students in rural areas. The $12 billion initiative includes satellite connectivity, AI-powered personalized learning, and vocational training programs designed to bridge the digital divide and enhance educational equity.",
    location: { country: "India", city: "New Delhi", latitude: 28.6139, longitude: 77.2090 },
    category: "innovation",
    entities: { 
      countries: ["India", "Finland", "Singapore"], 
      organizations: ["Ministry of Education", "ISRO", "UNESCO"],
      people: ["Narendra Modi", "Dharmendra Pradhan"]
    },
    ai_summary: "India's digital education revolution demonstrates scalable technology solutions for educational equity. The initiative creates global model for bridging digital divides while preserving local cultural contexts.",
    tags: ["Digital Education", "Innovation", "Social Development", "Technology Access"],
    sentiment: "Positive",
    sentiment_score: 0.92,
    geopolitical_impact: 7.6,
    conflict_escalation_probability: 0.01,
    economic_impact: 8.8,
    educational_context: {
      learning_objectives: [
        "Examine digital transformation in education and development",
        "Analyze technology access and equity in developing nations",
        "Evaluate scalable solutions for educational infrastructure"
      ],
      related_topics: ["Digital Divide", "Educational Equity", "Technology for Development", "Human Capital"]
    },
    trend_analysis: "Accelerating digital education adoption with 180% increase in remote learning infrastructure globally",
    related_events: [4, 6, 12],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 11,
    title: "US and Saudi Arabia Discuss Regional Stability Amid Oil Talks",
    source: "Washington Post",
    published_date: "2025-08-03",
    content: "High-level US-Saudi diplomatic talks addressed regional security architecture and energy cooperation, with discussions on Iran containment, Yemen conflict resolution, and oil production stabilization. The strategic dialogue aims to strengthen partnership while managing human rights concerns and diversification challenges.",
    location: { country: "Saudi Arabia", city: "Riyadh", latitude: 24.7136, longitude: 46.6753 },
    category: "diplomacy",
    entities: { 
      countries: ["United States", "Saudi Arabia", "Iran", "Yemen"], 
      organizations: ["OPEC", "State Department", "ARAMCO"],
      people: ["Antony Blinken", "Mohammed bin Salman", "Jake Sullivan"]
    },
    ai_summary: "US-Saudi strategic dialogue balances energy security with regional stability concerns. The partnership evolution reflects changing Middle East dynamics and energy transition pressures on traditional alliances.",
    tags: ["Middle East", "Energy Security", "Strategic Partnership", "Regional Stability"],
    sentiment: "Neutral",
    sentiment_score: 0.52,
    geopolitical_impact: 8.3,
    conflict_escalation_probability: 0.35,
    economic_impact: 8.9,
    educational_context: {
      learning_objectives: [
        "Analyze US-Middle East strategic relationships and energy diplomacy",
        "Examine regional security complexes and balance of power",
        "Understand energy transition impacts on geopolitical alliances"
      ],
      related_topics: ["Energy Security", "Regional Balance", "Strategic Partnerships", "Middle East Politics"]
    },
    trend_analysis: "Evolving US-Middle East engagement with 30% shift toward multilateral cooperation frameworks",
    related_events: [1, 14, 19],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 12,
    title: "Russia Unveils New AI-Powered Defense System",
    source: "TASS",
    published_date: "2025-08-02",
    content: "Russia demonstrated its advanced S-500 Prometheus air defense system integrated with artificial intelligence capabilities, claiming 99.7% interception accuracy against hypersonic threats. The system represents significant advancement in missile defense technology and strategic deterrence capabilities, raising concerns about arms race acceleration.",
    location: { country: "Russia", city: "Moscow", latitude: 55.7558, longitude: 37.6173 },
    category: "innovation",
    entities: { 
      countries: ["Russia", "China", "United States", "NATO"], 
      organizations: ["Russian Defense Ministry", "Rostec", "Pentagon"],
      people: ["Vladimir Putin", "Sergey Shoigu"]
    },
    ai_summary: "Russian AI defense system advancement signals military technology competition escalation. The development challenges existing strategic stability frameworks and accelerates global military AI adoption.",
    tags: ["Military Technology", "Artificial Intelligence", "Defense", "Strategic Competition"],
    sentiment: "Neutral",
    sentiment_score: 0.48,
    geopolitical_impact: 8.8,
    conflict_escalation_probability: 0.42,
    economic_impact: 7.9,
    educational_context: {
      learning_objectives: [
        "Understand military applications of artificial intelligence",
        "Analyze strategic stability and arms control challenges",
        "Examine technology competition in great power rivalry"
      ],
      related_topics: ["Military Innovation", "Strategic Stability", "AI Governance", "Arms Control"]
    },
    trend_analysis: "Accelerating military AI development with 400% increase in defense AI investments globally",
    related_events: [1, 6, 19],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 13,
    title: "Argentina Faces Economic Crisis as Inflation Surges",
    source: "Bloomberg",
    published_date: "2025-08-01",
    content: "Argentina's inflation reached 287% annually, prompting mass protests and economic emergency measures. The crisis threatens regional stability as currency devaluation accelerates, foreign reserves dwindle, and social unrest intensifies, highlighting the challenges of economic stabilization in emerging markets.",
    location: { country: "Argentina", city: "Buenos Aires", latitude: -34.6037, longitude: -58.3816 },
    category: "economy",
    entities: { 
      countries: ["Argentina", "Brazil", "IMF Members"], 
      organizations: ["Central Bank of Argentina", "IMF", "World Bank"],
      people: ["Javier Milei", "Kristalina Georgieva"]
    },
    ai_summary: "Argentina's hyperinflation crisis demonstrates emerging market vulnerability to global economic pressures. The situation requires comprehensive structural reforms and international financial cooperation for stabilization.",
    tags: ["Economic Crisis", "Latin America", "Inflation", "Financial Stability"],
    sentiment: "Negative",
    sentiment_score: 0.92,
    geopolitical_impact: 7.1,
    conflict_escalation_probability: 0.25,
    economic_impact: 9.3,
    educational_context: {
      learning_objectives: [
        "Analyze hyperinflation causes and economic stabilization strategies",
        "Examine international financial institution roles in crisis management",
        "Understand social and political impacts of economic crises"
      ],
      related_topics: ["Monetary Policy", "Economic Stabilization", "Social Unrest", "International Finance"]
    },
    trend_analysis: "Growing economic instability in emerging markets with 60% increase in sovereign debt distress",
    related_events: [7, 14, 17],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 14,
    title: "France Hosts Tech4Peace Conference in Paris",
    source: "Le Monde",
    published_date: "2025-07-27",
    content: "Global technology leaders, policymakers, and peace advocates gathered in Paris for the inaugural Tech4Peace Conference, establishing frameworks for responsible AI development and digital peacekeeping. The summit produced the Paris Declaration on Technology Ethics and created a $5 billion fund for conflict prevention technologies.",
    location: { country: "France", city: "Paris", latitude: 48.8566, longitude: 2.3522 },
    category: "innovation",
    entities: { 
      countries: ["France", "Germany", "Kenya", "Estonia"], 
      organizations: ["UNESCO", "European Commission", "Tech4Good"],
      people: ["Emmanuel Macron", "Audrey Azoulay", "Margrethe Vestager"]
    },
    ai_summary: "Tech4Peace Conference establishes global framework for technology governance and conflict prevention. The initiative demonstrates European leadership in digital diplomacy and responsible innovation approaches.",
    tags: ["Technology Governance", "Peace", "Innovation", "Digital Diplomacy"],
    sentiment: "Positive",
    sentiment_score: 0.89,
    geopolitical_impact: 7.9,
    conflict_escalation_probability: 0.02,
    economic_impact: 8.2,
    educational_context: {
      learning_objectives: [
        "Examine technology ethics and governance frameworks",
        "Analyze digital tools for conflict prevention and peacekeeping",
        "Understand multistakeholder approaches to technology policy"
      ],
      related_topics: ["Technology Ethics", "Digital Governance", "Peace Technology", "Multilateral Cooperation"]
    },
    trend_analysis: "Increasing focus on technology governance with 120% growth in digital diplomacy initiatives",
    related_events: [8, 11, 12],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 15,
    title: "Sudan Ceasefire Agreement Reached Amid UN Mediation",
    source: "UN News",
    published_date: "2025-08-03",
    content: "Warring factions in Sudan signed a comprehensive ceasefire agreement following intensive UN-mediated negotiations in Jeddah. The deal includes humanitarian corridor establishment, transitional government formation, and international monitoring mechanisms, offering hope for ending 18 months of devastating conflict.",
    location: { country: "Sudan", city: "Khartoum", latitude: 15.5007, longitude: 32.5599 },
    category: "conflict",
    entities: { 
      countries: ["Sudan", "Saudi Arabia", "South Sudan", "Ethiopia"], 
      organizations: ["United Nations", "African Union", "IGAD"],
      people: ["Volker Perthes", "Moussa Faki", "Abdel Fattah al-Burhan"]
    },
    ai_summary: "Sudan ceasefire breakthrough demonstrates effective multilateral mediation despite complex conflict dynamics. The agreement creates framework for political transition and humanitarian access restoration.",
    tags: ["Conflict Resolution", "Africa", "Peace Talks", "Humanitarian Access"],
    sentiment: "Positive",
    sentiment_score: 0.86,
    geopolitical_impact: 8.4,
    conflict_escalation_probability: 0.22,
    economic_impact: 7.8,
    educational_context: {
      learning_objectives: [
        "Analyze conflict mediation and peace process design",
        "Examine regional organization roles in conflict resolution",
        "Understand transitional governance and state-building challenges"
      ],
      related_topics: ["Peace Processes", "Conflict Mediation", "Transitional Justice", "Regional Security"]
    },
    trend_analysis: "Mixed success in African peace processes with 40% improvement in mediation effectiveness",
    related_events: [2, 5, 9],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 16,
    title: "Volcanic Eruption Triggers Mass Evacuation in Iceland",
    source: "Iceland Monitor",
    published_date: "2025-07-26",
    content: "The Reykjanes Peninsula volcanic system erupted with unprecedented intensity, forcing evacuation of 120,000 residents and disrupting European air traffic. The eruption's impact on global climate patterns and aviation safety demonstrates Iceland's unique geological significance and international vulnerability to natural disasters.",
    location: { country: "Iceland", city: "Reykjavik", latitude: 64.1466, longitude: -21.9426 },
    category: "disaster",
    entities: { 
      countries: ["Iceland", "Norway", "Denmark", "UK"], 
      organizations: ["Icelandic Met Office", "EUROCONTROL", "EU Civil Protection"],
      people: ["Katrín Jakobsdóttir", "Þórdís Kolbrún Gylfadóttir"]
    },
    ai_summary: "Iceland volcanic eruption highlights interconnected global vulnerabilities to natural disasters. The event demonstrates importance of international coordination in managing transnational disaster impacts.",
    tags: ["Volcanic Eruption", "Aviation Safety", "European Crisis", "Natural Disaster"],
    sentiment: "Negative",
    sentiment_score: 0.87,
    geopolitical_impact: 6.9,
    conflict_escalation_probability: 0.03,
    economic_impact: 8.1,
    educational_context: {
      learning_objectives: [
        "Understand volcanic systems and global climate impacts",
        "Analyze international disaster response coordination",
        "Examine transportation network vulnerabilities and resilience"
      ],
      related_topics: ["Geology", "Aviation Safety", "Crisis Management", "Climate Impact"]
    },
    trend_analysis: "Increasing geological activity with 45% rise in significant volcanic events globally",
    related_events: [3, 7, 9],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 17,
    title: "Brazil Announces Amazon Restoration Megaproject",
    source: "Reuters Brazil",
    published_date: "2025-07-24",
    content: "Brazil launched a $25 billion Amazon rainforest restoration initiative, aiming to reforest 12 million hectares by 2030. The project combines indigenous land rights recognition, sustainable development programs, and international climate financing, representing the world's largest ecosystem restoration effort.",
    location: { country: "Brazil", city: "Manaus", latitude: -3.1190, longitude: -60.0217 },
    category: "climate",
    entities: { 
      countries: ["Brazil", "Norway", "Germany", "France"], 
      organizations: ["FUNAI", "Amazon Fund", "World Bank"],
      people: ["Luiz Inácio Lula da Silva", "Marina Silva"]
    },
    ai_summary: "Brazil's Amazon restoration megaproject represents unprecedented commitment to ecosystem recovery and climate action. The initiative demonstrates integration of indigenous rights, conservation, and sustainable development approaches.",
    tags: ["Amazon", "Restoration", "Climate Action", "Indigenous Rights"],
    sentiment: "Positive",
    sentiment_score: 0.94,
    geopolitical_impact: 8.6,
    conflict_escalation_probability: 0.08,
    economic_impact: 8.7,
    educational_context: {
      learning_objectives: [
        "Examine ecosystem restoration science and methodologies",
        "Analyze indigenous land rights and conservation partnerships",
        "Understand international climate financing mechanisms"
      ],
      related_topics: ["Ecosystem Restoration", "Indigenous Rights", "Climate Finance", "Sustainable Development"]
    },
    trend_analysis: "Growing momentum in nature-based climate solutions with 90% increase in restoration commitments",
    related_events: [2, 4, 13],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 18,
    title: "Pacific Island Nations Form Climate Alliance",
    source: "Pacific Islands Forum",
    published_date: "2025-07-23",
    content: "Fourteen Pacific Island nations established the Pacific Climate Resilience Alliance, pooling resources for adaptation projects and advocating for climate justice in international forums. The alliance represents 1.2 million people facing existential threats from sea-level rise and extreme weather events.",
    location: { country: "Fiji", city: "Suva", latitude: -18.1248, longitude: 178.4501 },
    category: "climate",
    entities: { 
      countries: ["Fiji", "Tuvalu", "Marshall Islands", "Vanuatu"], 
      organizations: ["Pacific Islands Forum", "Green Climate Fund", "UNEP"],
      people: ["Frank Bainimarama", "Kausea Natano"]
    },
    ai_summary: "Pacific Island climate alliance demonstrates small state collective action on existential challenges. The initiative amplifies vulnerable nation voices in global climate governance while building regional resilience capacity.",
    tags: ["Climate Alliance", "Small Island States", "Climate Justice", "Pacific"],
    sentiment: "Positive",
    sentiment_score: 0.83,
    geopolitical_impact: 7.2,
    conflict_escalation_probability: 0.12,
    economic_impact: 6.8,
    educational_context: {
      learning_objectives: [
        "Understand small island state vulnerability to climate change",
        "Analyze collective action strategies for global governance",
        "Examine climate justice and loss and damage mechanisms"
      ],
      related_topics: ["Climate Vulnerability", "Small State Diplomacy", "Climate Justice", "Regional Cooperation"]
    },
    trend_analysis: "Strengthening small state coalitions with 70% increase in climate alliance formation",
    related_events: [2, 5, 17],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 19,
    title: "China-Russia Military Exercise in Arctic Region",
    source: "South China Morning Post",
    published_date: "2025-07-22",
    content: "China and Russia conducted joint military exercises in the Arctic, involving nuclear submarines, icebreakers, and advanced missile systems. The unprecedented cooperation in polar regions demonstrates strategic partnership deepening while challenging Western Arctic presence and raising concerns about militarization of the region.",
    location: { country: "Russia", city: "Murmansk", latitude: 68.9585, longitude: 33.0827 },
    category: "conflict",
    entities: { 
      countries: ["China", "Russia", "United States", "Norway"], 
      organizations: ["PLA Navy", "Russian Northern Fleet", "Arctic Council"],
      people: ["Xi Jinping", "Vladimir Putin", "Sergey Shoigu"]
    },
    ai_summary: "China-Russia Arctic military cooperation signals strategic partnership evolution and polar region militarization. The exercises challenge existing Arctic governance frameworks and Western strategic assumptions.",
    tags: ["Arctic Security", "Military Cooperation", "Strategic Partnership", "Polar Politics"],
    sentiment: "Negative",
    sentiment_score: 0.69,
    geopolitical_impact: 9.1,
    conflict_escalation_probability: 0.55,
    economic_impact: 7.6,
    educational_context: {
      learning_objectives: [
        "Analyze Arctic geopolitics and resource competition",
        "Examine strategic partnerships and alliance dynamics",
        "Understand polar region governance and militarization trends"
      ],
      related_topics: ["Arctic Politics", "Strategic Alliances", "Resource Competition", "Polar Governance"]
    },
    trend_analysis: "Intensifying Arctic competition with 150% increase in military activities over five years",
    related_events: [1, 6, 11],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 20,
    title: "International Space Station Deorbits After 25 Years",
    source: "Space News",
    published_date: "2025-07-21",
    content: "The International Space Station completed its final mission after 25 years of continuous human presence in space, successfully deorbiting into the Pacific Ocean. The station's legacy includes groundbreaking research, international cooperation during geopolitical tensions, and technology advancement for future space exploration.",
    location: { country: "International Waters", city: "Pacific Ocean", latitude: -45.0000, longitude: -165.0000 },
    category: "innovation",
    entities: { 
      countries: ["United States", "Russia", "Japan", "Canada", "European Union"], 
      organizations: ["NASA", "Roscosmos", "ESA", "JAXA", "CSA"],
      people: ["Bill Nelson", "Yuri Borisov", "Josef Aschbacher"]
    },
    ai_summary: "ISS deorbiting marks end of unprecedented international cooperation era in space. The station's legacy demonstrates peaceful collaboration potential while transitioning toward commercial space station development.",
    tags: ["Space Station", "International Cooperation", "Space Legacy", "Scientific Achievement"],
    sentiment: "Neutral",
    sentiment_score: 0.76,
    geopolitical_impact: 8.2,
    conflict_escalation_probability: 0.05,
    economic_impact: 8.9,
    educational_context: {
      learning_objectives: [
        "Examine international cooperation in space exploration",
        "Analyze scientific achievements and technology transfer",
        "Understand transition to commercial space infrastructure"
      ],
      related_topics: ["Space Cooperation", "Scientific Discovery", "Technology Transfer", "Commercial Space"]
    },
    trend_analysis: "Transitioning space cooperation with 200% growth in commercial space station development",
    related_events: [6, 12, 14],
    study_guide: null,
    created_at: new Date()
  }
];
// Shared news data for all API endpoints
const newsData = [
  {
    id: 1,
    title: "Tensions Escalate Between China and Taiwan After Military Drills",
    source: "Reuters",
    published_date: "2025-08-03",
    content: "China conducted large-scale military drills around Taiwan's airspace and waters, raising concerns about regional stability.",
    location: { country: "Taiwan", city: "Taipei", latitude: 25.0330, longitude: 121.5654 },
    category: "conflict",
    sentiment: "negative",
    sentiment_score: 0.85,
    geopolitical_impact: 9.5,
    economic_impact: 8.7,
    conflict_escalation_probability: 0.75,
    ai_summary: "China's military exercises around Taiwan represent a significant escalation in regional tensions.",
    educational_context: {
      learning_objectives: [
        "Understand the historical context of China-Taiwan relations",
        "Analyze the geopolitical implications of military exercises",
        "Evaluate the role of international law in territorial disputes"
      ],
      related_topics: ["One China Policy", "Taiwan Strait", "Military Diplomacy", "Regional Security"]
    },
    entities: {
      countries: ["China", "Taiwan", "United States"],
      people: ["Xi Jinping", "Tsai Ing-wen"],
      organizations: ["People's Liberation Army", "Taiwan Defense Ministry"]
    },
    trend_analysis: "Increasing military posturing in the Asia-Pacific region suggests a potential shift toward more confrontational diplomacy.",
    tags: ["military", "tensions", "Asia-Pacific", "diplomacy"],
    related_events: [2, 3],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 2,
    title: "UN Hosts Global Summit on Climate Action in Geneva",
    source: "BBC",
    published_date: "2025-08-01",
    content: "World leaders gathered in Geneva for a critical climate summit aimed at accelerating global climate action.",
    location: { country: "Switzerland", city: "Geneva", latitude: 46.2044, longitude: 6.1432 },
    category: "diplomacy",
    sentiment: "positive",
    sentiment_score: 0.78,
    geopolitical_impact: 8.9,
    economic_impact: 9.2,
    conflict_escalation_probability: 0.1,
    ai_summary: "The Geneva climate summit represents a crucial moment for international cooperation on climate change.",
    educational_context: {
      learning_objectives: [
        "Understand the Paris Agreement and its implementation",
        "Analyze international cooperation on climate issues",
        "Evaluate the economic implications of climate policies"
      ],
      related_topics: ["Climate Change", "Paris Agreement", "International Cooperation", "Sustainable Development"]
    },
    entities: {
      countries: ["Switzerland", "United States", "China", "European Union"],
      people: ["António Guterres", "Climate Envoys"],
      organizations: ["United Nations", "World Bank", "IMF"]
    },
    trend_analysis: "Growing international consensus on climate action suggests a shift toward more coordinated global environmental policies.",
    tags: ["climate", "summit", "cooperation", "environment"],
    related_events: [1, 3],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 3,
    title: "Major Tech Innovation in Renewable Energy Storage",
    source: "TechCrunch",
    published_date: "2025-07-30",
    content: "A breakthrough in battery technology promises to revolutionize renewable energy storage.",
    location: { country: "United States", city: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
    category: "innovation",
    sentiment: "positive",
    sentiment_score: 0.92,
    geopolitical_impact: 7.2,
    economic_impact: 9.8,
    conflict_escalation_probability: 0.05,
    ai_summary: "This technological breakthrough could accelerate the global transition to renewable energy.",
    educational_context: {
      learning_objectives: [
        "Understand renewable energy technologies and challenges",
        "Analyze the impact of technological innovation on geopolitics",
        "Evaluate the economic implications of energy transitions"
      ],
      related_topics: ["Renewable Energy", "Battery Technology", "Energy Security", "Climate Innovation"]
    },
    entities: {
      countries: ["United States", "China", "Germany"],
      people: ["Tech Entrepreneurs", "Energy Researchers"],
      organizations: ["Tesla", "Energy Research Institutes", "Venture Capital Firms"]
    },
    trend_analysis: "Accelerating innovation in clean energy technology suggests a fundamental shift in global energy markets.",
    tags: ["innovation", "renewable energy", "technology", "sustainability"],
    related_events: [1, 2],
    study_guide: null,
    created_at: new Date()
  }
];

module.exports = newsData;
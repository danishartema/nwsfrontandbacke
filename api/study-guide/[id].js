export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { id } = req.query;
    const eventId = Number(id);
    
    // Mock event data
    const mockEvent = {
      id: 1,
      title: "Tensions Escalate Between China and Taiwan",
      ai_summary: "China's military exercises around Taiwan represent a significant escalation in regional tensions.",
      educational_context: {
        learning_objectives: [
          "Understand the historical context of China-Taiwan relations",
          "Analyze the geopolitical implications of military exercises",
          "Evaluate the role of international law in territorial disputes"
        ],
        related_topics: ["One China Policy", "Taiwan Strait", "Military Diplomacy", "Regional Security"]
      }
    };
    
    if (eventId !== mockEvent.id) {
      return res.status(404).json({ error: "Event not found" });
    }
    
    const studyGuide = {
      eventId: mockEvent.id,
      title: mockEvent.title,
      summary: mockEvent.ai_summary,
      learningObjectives: mockEvent.educational_context.learning_objectives,
      relatedTopics: mockEvent.educational_context.related_topics,
      keyQuestions: [
        "What are the historical roots of this event?",
        "How does this event impact global relations?",
        "What are the potential future implications?"
      ],
      resources: [
        "UN Reports",
        "Academic Papers",
        "Expert Analysis"
      ]
    };
    
    return res.status(200).json(studyGuide);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
};
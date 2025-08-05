const newsData = require('../newsData');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { id } = req.query;
    const eventId = Number(id);
    const event = newsData.find(e => e.id === eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });
    const studyGuide = {
      eventId: event.id,
      title: event.title,
      summary: event.ai_summary,
      learningObjectives: event.educational_context.learning_objectives,
      relatedTopics: event.educational_context.related_topics,
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
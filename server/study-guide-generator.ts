import { NewsEvent, StudyGuide } from '../shared/schema.js';

interface StudyGuideOptions {
  examFocus: 'css' | 'issb' | 'sat' | 'general' | 'all';
  difficultyLevel: 'basic' | 'intermediate' | 'advanced';
  includeQuiz: boolean;
}

export class StudyGuideGenerator {
  
  async generateStudyGuide(event: NewsEvent, options: StudyGuideOptions = {
    examFocus: 'all',
    difficultyLevel: 'intermediate',
    includeQuiz: true
  }): Promise<StudyGuide> {
    
    // Generate comprehensive study guide based on the news event
    const studyGuide: StudyGuide = {
      summary: this.generateSummary(event),
      keywords: this.extractKeywords(event),
      key_figures_data: this.generateKeyFiguresData(event),
      discussion_questions: this.generateDiscussionQuestions(event, options.examFocus),
      quiz_questions: options.includeQuiz ? this.generateQuizQuestions(event, options.difficultyLevel) : [],
      vocabulary: this.generateVocabulary(event),
      css_linkage: this.generateCSSLinkage(event),
      css_preparation_guide: this.generateCSSPreparationGuide(event),
      exam_relevance: this.determineExamRelevance(event)
    };

    return studyGuide;
  }

  private generateSummary(event: NewsEvent): string {
    // Create a concise, educational summary
    const locationContext = `${event.location.city}, ${event.location.country}`;
    const impactLevel = event.geopolitical_impact >= 8 ? 'significant' : event.geopolitical_impact >= 6 ? 'moderate' : 'limited';
    
    return `${event.ai_summary} This ${event.category} event in ${locationContext} has ${impactLevel} geopolitical implications with a ${event.sentiment.toLowerCase()} outlook. The situation involves key stakeholders including ${event.entities.countries.slice(0, 3).join(', ')} and demonstrates important patterns in contemporary international relations.`;
  }

  private extractKeywords(event: NewsEvent): string[] {
    const keywords = new Set<string>();
    
    // Add category-specific keywords
    keywords.add(event.category);
    
    // Add entity-based keywords
    event.entities.countries.forEach(country => keywords.add(country));
    if (event.entities.organizations) {
      event.entities.organizations.forEach(org => keywords.add(org));
    }
    
    // Add topic-based keywords
    event.educational_context.related_topics.forEach(topic => keywords.add(topic));
    
    // Add sentiment and analysis keywords
    keywords.add('geopolitics');
    keywords.add('international relations');
    
    if (event.category === 'conflict') {
      keywords.add('security');
      keywords.add('military strategy');
    } else if (event.category === 'diplomacy') {
      keywords.add('bilateral relations');
      keywords.add('multilateral cooperation');
    } else if (event.category === 'economy') {
      keywords.add('economic policy');
      keywords.add('trade relations');
    }
    
    return Array.from(keywords).slice(0, 8);
  }

  private generateKeyFiguresData(event: NewsEvent): string {
    let data = '';
    
    // Countries involved
    if (event.entities.countries.length > 0) {
      data += `Countries involved: ${event.entities.countries.join(', ')}. `;
    }
    
    // Key people
    if (event.entities.people && event.entities.people.length > 0) {
      data += `Key figures: ${event.entities.people.join(', ')}. `;
    }
    
    // Organizations
    if (event.entities.organizations && event.entities.organizations.length > 0) {
      data += `Organizations: ${event.entities.organizations.join(', ')}. `;
    }
    
    // Impact metrics
    data += `Geopolitical Impact Score: ${event.geopolitical_impact}/10. `;
    data += `Conflict Escalation Risk: ${Math.round(event.conflict_escalation_probability * 100)}%. `;
    data += `Economic Impact: ${event.economic_impact}/10.`;
    
    return data.trim();
  }

  private generateDiscussionQuestions(event: NewsEvent, examFocus: string): string[] {
    const questions: string[] = [];
    
    // General analysis questions
    questions.push(`What are the primary causes and contributing factors behind this ${event.category} situation?`);
    questions.push(`How might this event affect regional stability and international relations?`);
    
    // Category-specific questions
    if (event.category === 'conflict') {
      questions.push('What diplomatic solutions could help de-escalate this situation?');
      questions.push('How do international law and treaties apply to this conflict?');
    } else if (event.category === 'diplomacy') {
      questions.push('What are the potential long-term benefits and risks of this diplomatic initiative?');
      questions.push('How does this diplomatic engagement align with broader foreign policy objectives?');
    } else if (event.category === 'economy') {
      questions.push('What are the economic implications for both domestic and international stakeholders?');
      questions.push('How might this economic development influence global trade patterns?');
    }
    
    // Exam-specific questions
    if (examFocus === 'css' || examFocus === 'all') {
      questions.push('How does this event relate to Pakistan\'s foreign policy interests and strategic objectives?');
      questions.push('What lessons can be drawn for policy-making and governance?');
    }
    
    if (examFocus === 'issb' || examFocus === 'all') {
      questions.push('What strategic intelligence and security considerations arise from this situation?');
      questions.push('How should military and security forces adapt to these developments?');
    }
    
    return questions.slice(0, 6);
  }

  private generateQuizQuestions(event: NewsEvent, difficulty: string): StudyGuide['quiz_questions'] {
    const questions: StudyGuide['quiz_questions'] = [];
    
    // Basic knowledge question
    questions.push({
      question: `Which country is primarily featured in this ${event.category} event?`,
      type: 'multiple_choice',
      options: [
        event.location.country,
        'United States',
        'United Kingdom',
        'Germany'
      ].sort(() => Math.random() - 0.5),
      correct_answer: event.location.country,
      explanation: `The event took place in ${event.location.city}, ${event.location.country}.`
    });
    
    // True/False question
    const highImpact = event.geopolitical_impact >= 7;
    questions.push({
      question: `This event has a high geopolitical impact (score above 7.0).`,
      type: 'true_false',
      options: ['True', 'False'],
      correct_answer: highImpact ? 'True' : 'False',
      explanation: `The geopolitical impact score is ${event.geopolitical_impact}/10, which is ${highImpact ? 'above' : 'below'} the 7.0 threshold.`
    });
    
    // Category knowledge
    questions.push({
      question: `What category best describes this news event?`,
      type: 'multiple_choice',
      options: ['conflict', 'diplomacy', 'economy', 'innovation'].includes(event.category) 
        ? ['conflict', 'diplomacy', 'economy', 'innovation']
        : [event.category, 'conflict', 'diplomacy', 'economy'],
      correct_answer: event.category,
      explanation: `This is a ${event.category} event based on its primary characteristics and implications.`
    });

    // Regional analysis question
    const region = this.getRegionFromCountry(event.location.country);
    questions.push({
      question: `What is the primary region affected by this ${event.category} event?`,
      type: 'multiple_choice',
      options: [region, 'North America', 'Western Europe', 'Southeast Asia'].filter((item, index, arr) => arr.indexOf(item) === index).slice(0, 4),
      correct_answer: region,
      explanation: `${event.location.country} is located in ${region}, making this the primary affected region.`
    });

    // Sentiment analysis question
    questions.push({
      question: `What is the overall sentiment of this ${event.category} event?`,
      type: 'multiple_choice',
      options: ['Positive', 'Negative', 'Neutral'].includes(event.sentiment) ? 
        [event.sentiment, 'Positive', 'Negative', 'Neutral'].filter((item, index, arr) => arr.indexOf(item) === index).slice(0, 3) :
        ['Negative', 'Positive', 'Neutral'],
      correct_answer: event.sentiment,
      explanation: `The AI analysis determined this event has a ${event.sentiment.toLowerCase()} sentiment based on its implications and consequences.`
    });

    // Economic impact question
    const economicImpact = event.economic_impact >= 7 ? 'High' : event.economic_impact >= 5 ? 'Medium' : 'Low';
    questions.push({
      question: 'What is the economic impact level of this event?',
      type: 'multiple_choice',
      options: ['High', 'Medium', 'Low', 'Negligible'],
      correct_answer: economicImpact,
      explanation: `With an economic impact score of ${event.economic_impact}/10, this event has a ${economicImpact.toLowerCase()} economic impact.`
    });

    // Organizations question if available
    if (event.entities.organizations && event.entities.organizations.length > 0) {
      const mainOrg = event.entities.organizations[0];
      questions.push({
        question: `Which international organization is mentioned in relation to this ${event.category} event?`,
        type: 'multiple_choice',
        options: [mainOrg, 'NATO', 'European Union', 'ASEAN'].filter((item, index, arr) => arr.indexOf(item) === index).slice(0, 4),
        correct_answer: mainOrg,
        explanation: `${mainOrg} is specifically mentioned as being involved in or relevant to this event.`
      });
    }

    // CSS-specific question
    const cssSubject = this.getCSSSubjects(event.category)[0];
    questions.push({
      question: 'For CSS Current Affairs preparation, this event would be most relevant under which subject area?',
      type: 'multiple_choice',
      options: this.getCSSSubjects(event.category),
      correct_answer: cssSubject,
      explanation: `As a ${event.category} event, this would primarily fall under ${cssSubject} in CSS Current Affairs preparation.`
    });

    // Pakistan relevance question
    const pakistanRelevant = event.entities.countries.includes('Pakistan') || 
                           event.location.country === 'Pakistan' ||
                           event.entities.countries.some(country => ['India', 'China', 'Afghanistan', 'Iran'].includes(country));
    questions.push({
      question: 'Is this event particularly relevant for Pakistan\'s foreign policy considerations?',
      type: 'true_false',
      options: ['True', 'False'],
      correct_answer: pakistanRelevant ? 'True' : 'False',
      explanation: pakistanRelevant ? 
        'This event involves countries or regions that are strategically important for Pakistan\'s foreign policy.' :
        'While globally significant, this event has limited direct implications for Pakistan\'s immediate foreign policy concerns.'
    });

    // Countries involved question
    if (event.entities.countries.length > 1) {
      const otherCountries = event.entities.countries.filter(c => c !== event.location.country);
      if (otherCountries.length > 0) {
        questions.push({
          question: `Which other country is significantly involved in this ${event.category} event?`,
          type: 'multiple_choice',
          options: [otherCountries[0], 'Brazil', 'Canada', 'Australia'].filter((item, index, arr) => arr.indexOf(item) === index).slice(0, 4),
          correct_answer: otherCountries[0],
          explanation: `${otherCountries[0]} is mentioned as one of the key countries involved in this event.`
        });
      }
    }
    
    if (difficulty === 'advanced') {
      // Complex analysis question
      questions.push({
        question: `What is the approximate conflict escalation probability for this situation?`,
        type: 'multiple_choice',
        options: [
          `${Math.round(event.conflict_escalation_probability * 100)}%`,
          '25%',
          '50%',
          '90%'
        ].sort(() => Math.random() - 0.5),
        correct_answer: `${Math.round(event.conflict_escalation_probability * 100)}%`,
        explanation: `The AI analysis indicates a ${Math.round(event.conflict_escalation_probability * 100)}% probability of conflict escalation based on current factors.`
      });

      // Advanced policy question
      const policyOption = this.getPakistanPolicyOptions(event.category)[0];
      questions.push({
        question: `What would be the most appropriate policy response for Pakistan regarding this ${event.category} event?`,
        type: 'multiple_choice',
        options: this.getPakistanPolicyOptions(event.category),
        correct_answer: policyOption,
        explanation: `Given Pakistan's strategic interests and the nature of this ${event.category} event, ${policyOption.toLowerCase()} would be the most suitable approach.`
      });
    }
    
    return questions;
  }

  private generateVocabulary(event: NewsEvent): StudyGuide['vocabulary'] {
    const vocabulary: StudyGuide['vocabulary'] = [];
    
    // Category-specific terms
    if (event.category === 'conflict') {
      vocabulary.push(
        { term: 'Geopolitics', definition: 'Politics influenced by geography, especially in international relations and military strategy.' },
        { term: 'Escalation', definition: 'The process of increasing intensity or scope of a conflict or crisis.' },
        { term: 'De-escalation', definition: 'Actions taken to reduce tension and prevent conflict from intensifying.' }
      );
    } else if (event.category === 'diplomacy') {
      vocabulary.push(
        { term: 'Bilateral Relations', definition: 'Political, economic, or cultural relations between two countries.' },
        { term: 'Multilateral Cooperation', definition: 'Collaboration involving multiple countries or international organizations.' },
        { term: 'Foreign Policy', definition: 'A government\'s strategy in dealing with other nations.' }
      );
    } else if (event.category === 'economy') {
      vocabulary.push(
        { term: 'Economic Sanctions', definition: 'Restrictions placed on trade and financial transactions for political reasons.' },
        { term: 'Trade Relations', definition: 'Commercial and economic exchanges between countries.' },
        { term: 'Economic Integration', definition: 'The process of reducing barriers to trade and investment between economies.' }
      );
    }
    
    // Add general IR terms
    vocabulary.push(
      { term: 'International Relations', definition: 'The study of relationships between countries, including politics, economics, and security.' },
      { term: 'Regional Stability', definition: 'The maintenance of peace and predictable relations within a geographic region.' }
    );
    
    return vocabulary.slice(0, 5);
  }

  private generateCSSLinkage(event: NewsEvent): string[] {
    const linkages: string[] = [];
    
    // Always relevant subjects
    linkages.push('Current Affairs');
    linkages.push('International Relations');
    
    // Category-specific linkages
    if (event.category === 'conflict' || event.category === 'diplomacy') {
      linkages.push('Foreign Policy');
      linkages.push('Strategic Studies');
    }
    
    if (event.category === 'economy') {
      linkages.push('Economics');
      linkages.push('Public Administration');
    }
    
    if (event.category === 'politics') {
      linkages.push('Political Science');
      linkages.push('Governance and Public Policy');
    }
    
    // Pakistan-specific subjects if relevant
    if (event.entities.countries.includes('Pakistan') || 
        event.location.country === 'Pakistan' ||
        event.entities.countries.some(country => ['India', 'China', 'Afghanistan', 'Iran'].includes(country))) {
      linkages.push('Pakistan Affairs');
      linkages.push('Regional Studies');
    }
    
    return [...new Set(linkages)];
  }

  private generateCSSPreparationGuide(event: NewsEvent): StudyGuide['css_preparation_guide'] {
    const currentAffairsTopics: string[] = [];
    const keyPreparationAreas: string[] = [];
    const recommendedFocus: string[] = [];
    const studyApproach: string[] = [];
    
    // Category-specific preparation
    if (event.category === 'conflict') {
      currentAffairsTopics.push('Regional Security Issues', 'Military Affairs', 'Border Disputes', 'Defense Policy');
      keyPreparationAreas.push('International Law & Conflicts', 'Pakistan\'s Defense Strategy', 'Regional Geopolitics');
      recommendedFocus.push('Study causes and consequences of conflicts', 'Analyze Pakistan\'s security challenges', 'Understand conflict resolution mechanisms');
      studyApproach.push('Create timeline of similar conflicts', 'Study historical precedents', 'Analyze Pakistan\'s role in regional peace');
    } else if (event.category === 'diplomacy') {
      currentAffairsTopics.push('Bilateral Relations', 'International Treaties', 'Diplomatic Initiatives', 'Foreign Policy');
      keyPreparationAreas.push('Pakistan\'s Foreign Policy', 'International Organizations', 'Diplomatic History');
      recommendedFocus.push('Study major diplomatic achievements', 'Understand treaty mechanisms', 'Analyze Pakistan\'s foreign relations');
      studyApproach.push('Review recent diplomatic developments', 'Study successful negotiations', 'Understand multilateral diplomacy');
    } else if (event.category === 'economy') {
      currentAffairsTopics.push('Economic Policies', 'Trade Relations', 'Financial Markets', 'Development Issues');
      keyPreparationAreas.push('Pakistan\'s Economic Challenges', 'International Trade', 'Development Economics');
      recommendedFocus.push('Study economic indicators', 'Understand trade dynamics', 'Analyze development strategies');
      studyApproach.push('Review economic data and trends', 'Study successful economic models', 'Analyze policy implementations');
    } else if (event.category === 'politics') {
      currentAffairsTopics.push('Governance Issues', 'Political Developments', 'Electoral Politics', 'Policy Reforms');
      keyPreparationAreas.push('Political Science', 'Public Administration', 'Governance Systems');
      recommendedFocus.push('Study political systems', 'Understand governance challenges', 'Analyze policy effectiveness');
      studyApproach.push('Follow political developments', 'Study comparative politics', 'Analyze institutional reforms');
    } else if (event.category === 'health') {
      currentAffairsTopics.push('Public Health Policy', 'Healthcare Systems', 'Health Security', 'Medical Diplomacy');
      keyPreparationAreas.push('Health Policy', 'Social Issues', 'Development Studies');
      recommendedFocus.push('Study health system challenges', 'Understand policy responses', 'Analyze international cooperation');
      studyApproach.push('Review health indicators', 'Study successful interventions', 'Analyze policy frameworks');
    }
    
    // Add general CSS current affairs topics
    currentAffairsTopics.push('Contemporary Global Issues', 'Pakistan\'s Position in World Affairs');
    keyPreparationAreas.push('Essay Writing Skills', 'Current Affairs Analysis', 'Critical Thinking');
    recommendedFocus.push('Practice analytical writing', 'Develop balanced perspectives', 'Connect events to broader themes');
    studyApproach.push('Read multiple sources daily', 'Practice essay outlines', 'Develop argumentation skills');
    
    // Determine exam pattern relevance
    const examPatternRelevance = this.determineExamPatternRelevance(event);
    
    return {
      current_affairs_topics: [...new Set(currentAffairsTopics)].slice(0, 6),
      key_preparation_areas: [...new Set(keyPreparationAreas)].slice(0, 5),
      recommended_focus: [...new Set(recommendedFocus)].slice(0, 4),
      exam_pattern_relevance: examPatternRelevance,
      study_approach: [...new Set(studyApproach)].slice(0, 4)
    };
  }
  
  private determineExamPatternRelevance(event: NewsEvent): string {
    const impact = event.geopolitical_impact;
    const category = event.category;
    
    if (impact >= 8) {
      return `High Priority: This ${category} event is highly relevant for CSS Current Affairs paper. Expect potential essay questions on regional implications and Pakistan's policy response. Practice writing 2000-word analytical essays on this topic.`;
    } else if (impact >= 6) {
      return `Medium Priority: This ${category} event is moderately relevant for CSS preparation. Good for general awareness and could appear in MCQs or short questions. Include in daily current affairs notes.`;
    } else {
      return `Low Priority: This ${category} event provides useful background knowledge for CSS Current Affairs. Helpful for developing broader understanding of international relations and regional dynamics.`;
    }
  }

  private getRegionFromCountry(country: string): string {
    const regions: Record<string, string> = {
      'China': 'East Asia',
      'Taiwan': 'East Asia',
      'Japan': 'East Asia',
      'India': 'South Asia',
      'Pakistan': 'South Asia',
      'Afghanistan': 'South Asia',
      'Iran': 'Middle East',
      'Iraq': 'Middle East',
      'Syria': 'Middle East',
      'Turkey': 'Middle East',
      'Russia': 'Eastern Europe',
      'Ukraine': 'Eastern Europe',
      'Germany': 'Western Europe',
      'France': 'Western Europe',
      'United Kingdom': 'Western Europe',
      'United States': 'North America',
      'Canada': 'North America',
      'Brazil': 'South America',
      'Nigeria': 'West Africa',
      'Kenya': 'East Africa',
      'Democratic Republic of Congo': 'Central Africa',
      'South Africa': 'Southern Africa'
    };
    return regions[country] || 'Other Regions';
  }

  private getCSSSubjects(category: string): string[] {
    const subjects: Record<string, string[]> = {
      'conflict': ['International Relations', 'Strategic Studies', 'Current Affairs', 'Pakistan Affairs'],
      'diplomacy': ['International Relations', 'Foreign Policy', 'Current Affairs', 'Political Science'],
      'economy': ['Economics', 'Current Affairs', 'Public Administration', 'International Trade'],
      'politics': ['Political Science', 'Current Affairs', 'Public Administration', 'Governance'],
      'health': ['Current Affairs', 'Social Issues', 'Public Administration', 'Development Studies'],
      'climate': ['Current Affairs', 'Environmental Studies', 'Geography', 'International Relations'],
      'innovation': ['Current Affairs', 'Science & Technology', 'Economics', 'Development Studies']
    };
    return subjects[category] || ['Current Affairs', 'International Relations', 'Political Science', 'Economics'];
  }

  private getPakistanPolicyOptions(category: string): string[] {
    const options: Record<string, string[]> = {
      'conflict': ['Diplomatic mediation', 'Military intervention', 'Economic sanctions', 'International arbitration'],
      'diplomacy': ['Active engagement', 'Neutral stance', 'Conditional support', 'Opposition'],
      'economy': ['Trade partnership', 'Investment attraction', 'Market protection', 'Economic cooperation'],
      'politics': ['Democratic support', 'Stability focus', 'Non-interference', 'Bilateral engagement'],
      'health': ['International cooperation', 'Capacity building', 'Resource sharing', 'Policy coordination'],
      'climate': ['Climate diplomacy', 'Adaptation measures', 'International funding', 'Regional cooperation'],
      'innovation': ['Technology transfer', 'Educational exchange', 'Research collaboration', 'Infrastructure development']
    };
    return options[category] || ['Diplomatic engagement', 'Cautious monitoring', 'Bilateral dialogue', 'International cooperation'];
  }

  private determineExamRelevance(event: NewsEvent): StudyGuide['exam_relevance'] {
    return {
      css: true, // All current affairs events are relevant for CSS
      issb: event.category === 'conflict' || event.category === 'innovation' || 
            event.entities.countries.includes('Pakistan'),
      sat: event.category === 'innovation' || event.category === 'climate' ||
           event.geopolitical_impact >= 8,
      general_current_affairs: true // All events are relevant for general current affairs
    };
  }
}

export const studyGuideGenerator = new StudyGuideGenerator();
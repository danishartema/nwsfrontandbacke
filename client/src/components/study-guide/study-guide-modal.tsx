import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap, BookOpen, Brain, HelpCircle, CheckCircle, FileText, Target } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { type StudyGuide } from '@shared/schema';

interface StudyGuideModalProps {
  eventId: number;
  eventTitle: string;
  children: React.ReactNode;
}

export function StudyGuideModal({ eventId, eventTitle, children }: StudyGuideModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: studyGuide, isLoading } = useQuery({
    queryKey: ['/api/study-guide', eventId],
    enabled: isOpen,
  });

  const generateMutation = useMutation({
    mutationFn: () => apiRequest(`/api/study-guide/${eventId}`, 'POST', {
      examFocus: 'all',
      difficultyLevel: 'intermediate',
      includeQuiz: true
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/study-guide', eventId] });
    }
  });

  const handleGenerateStudyGuide = () => {
    generateMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            Study Guide
          </DialogTitle>
          <DialogDescription>
            AI-generated educational content for: {eventTitle}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : studyGuide ? (
            <StudyGuideContent studyGuide={studyGuide} />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <BookOpen className="h-12 w-12 text-gray-400" />
              <p className="text-gray-600">No study guide available yet</p>
              <Button 
                onClick={handleGenerateStudyGuide}
                disabled={generateMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {generateMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Study Guide
                  </>
                )}
              </Button>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function StudyGuideContent({ studyGuide }: { studyGuide: StudyGuide | any }) {
  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{studyGuide.summary}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="exam-prep">Exam Prep</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {studyGuide.keywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Figures and Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Figures & Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{studyGuide.key_figures_data}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-green-600" />
                Discussion Questions
              </CardTitle>
              <CardDescription>
                Critical thinking questions to deepen your understanding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyGuide.discussion_questions.map((question: string, index: number) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <p className="font-medium text-gray-800">
                      {index + 1}. {question}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                Quiz Questions
              </CardTitle>
              <CardDescription>
                Test your knowledge with these practice questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyGuide.quiz_questions.map((quiz: any, index: number) => (
                  <QuizQuestion key={index} quiz={quiz} index={index} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vocabulary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-600" />
                Vocabulary
              </CardTitle>
              <CardDescription>
                Important terms and their definitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyGuide.vocabulary.map((vocab: any, index: number) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-800">{vocab.term}</h4>
                    <p className="text-gray-600">{vocab.definition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exam-prep" className="space-y-4">
          {/* CSS Linkage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-red-600" />
                CSS Subject Linkage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {studyGuide.css_linkage.map((subject: string, index: number) => (
                  <Badge key={index} variant="outline" className="border-red-500 text-red-700">
                    {subject}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exam Relevance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exam Relevance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <ExamRelevanceItem
                  exam="CSS"
                  relevant={studyGuide.exam_relevance.css}
                  color="red"
                />
                <ExamRelevanceItem
                  exam="ISSB"
                  relevant={studyGuide.exam_relevance.issb}
                  color="blue"
                />
                <ExamRelevanceItem
                  exam="SAT"
                  relevant={studyGuide.exam_relevance.sat}
                  color="green"
                />
                <ExamRelevanceItem
                  exam="Current Affairs"
                  relevant={studyGuide.exam_relevance.general_current_affairs}
                  color="purple"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function QuizQuestion({ quiz, index }: { quiz: any, index: number }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <p className="font-medium text-gray-800">
          {index + 1}. {quiz.question}
        </p>
        <Badge variant="outline" className="ml-2">
          {quiz.type.replace('_', ' ')}
        </Badge>
      </div>
      
      {quiz.options && (
        <div className="space-y-2">
          {quiz.options.map((option: string, optIndex: number) => (
            <div key={optIndex} className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm">
                {String.fromCharCode(65 + optIndex)}
              </div>
              <span className="text-gray-700">{option}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </Button>
        
        {showAnswer && (
          <div className="bg-green-50 border border-green-200 rounded p-3 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">
                Correct Answer: {quiz.correct_answer}
              </span>
            </div>
            <p className="text-green-700 text-sm">{quiz.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ExamRelevanceItem({ exam, relevant, color }: { exam: string, relevant: boolean, color: string }) {
  const colorClasses = {
    red: 'bg-red-100 text-red-800 border-red-300',
    blue: 'bg-blue-100 text-blue-800 border-blue-300',
    green: 'bg-green-100 text-green-800 border-green-300',
    purple: 'bg-purple-100 text-purple-800 border-purple-300',
  };

  return (
    <div className={`p-3 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between">
        <span className="font-medium">{exam}</span>
        <div className="flex items-center gap-1">
          {relevant ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <div className="h-4 w-4 rounded-full border-2 border-gray-400"></div>
          )}
          <span className="text-sm">{relevant ? 'Relevant' : 'Not Relevant'}</span>
        </div>
      </div>
    </div>
  );
}
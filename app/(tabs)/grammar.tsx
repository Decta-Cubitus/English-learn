import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle, Circle as XCircle, RotateCcw, ArrowRight } from 'lucide-react-native';

interface GrammarQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export default function GrammarScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const grammarQuestions: GrammarQuestion[] = [
    {
      id: 1,
      question: "I have lived here _____ 2010.",
      options: ["since", "for", "from", "during"],
      correctAnswer: 0,
      explanation: "We use 'since' with a specific point in time (2010). 'For' is used with periods of time.",
      topic: "Present Perfect Tense"
    },
    {
      id: 2,
      question: "If I _____ rich, I would travel the world.",
      options: ["am", "was", "were", "will be"],
      correctAnswer: 2,
      explanation: "In hypothetical conditional sentences, we use 'were' for all persons with 'if I were'.",
      topic: "Conditional Sentences"
    },
    {
      id: 3,
      question: "She made me _____ for two hours.",
      options: ["to wait", "waiting", "wait", "waited"],
      correctAnswer: 2,
      explanation: "After 'make someone', we use the base form of the verb (infinitive without 'to').",
      topic: "Causative Verbs"
    },
    {
      id: 4,
      question: "The book _____ by millions of people.",
      options: ["has read", "has been read", "was reading", "is reading"],
      correctAnswer: 1,
      explanation: "We use present perfect passive 'has been read' to show an action completed by an unspecified agent.",
      topic: "Passive Voice"
    }
  ];

  const currentQuestion = grammarQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < grammarQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Grammar Practice</Text>
          <Text style={styles.headerSubtitle}>{currentQuestion.topic}</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Score: {score}/{grammarQuestions.length}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {grammarQuestions.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestionIndex + 1) / grammarQuestions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              let buttonStyle = [styles.optionButton];
              let textStyle = [styles.optionText];
              let IconComponent = null;

              if (showResult) {
                if (index === currentQuestion.correctAnswer) {
                  buttonStyle.push(styles.correctOption);
                  textStyle.push(styles.correctOptionText);
                  IconComponent = CheckCircle;
                } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                  buttonStyle.push(styles.incorrectOption);
                  textStyle.push(styles.incorrectOptionText);
                  IconComponent = XCircle;
                }
              } else if (selectedAnswer === index) {
                buttonStyle.push(styles.selectedOption);
                textStyle.push(styles.selectedOptionText);
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={buttonStyle}
                  onPress={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <Text style={textStyle}>{option}</Text>
                  {IconComponent && <IconComponent size={20} color={textStyle[1]?.color || '#6B7280'} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {showResult && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>Explanation</Text>
              <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            </View>
          )}
        </View>

        {showResult && (
          <View style={styles.buttonContainer}>
            {currentQuestionIndex < grammarQuestions.length - 1 ? (
              <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                <Text style={styles.nextButtonText}>Next Question</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </TouchableOpacity>
            ) : (
              <View style={styles.completionContainer}>
                <Text style={styles.completionTitle}>Quiz Complete!</Text>
                <Text style={styles.finalScore}>
                  Final Score: {score}/{grammarQuestions.length}
                </Text>
                <TouchableOpacity style={styles.restartButton} onPress={resetQuiz}>
                  <RotateCcw size={20} color="#FFFFFF" />
                  <Text style={styles.restartButtonText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#D1FAE5',
    marginTop: 4,
  },
  scoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedOption: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  correctOption: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  incorrectOption: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  correctOptionText: {
    color: '#10B981',
    fontWeight: '600',
  },
  incorrectOptionText: {
    color: '#EF4444',
    fontWeight: '600',
  },
  explanationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 16,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  completionContainer: {
    alignItems: 'center',
    padding: 24,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  finalScore: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 24,
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
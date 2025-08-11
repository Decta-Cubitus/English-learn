import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, BookOpen, Target, CircleCheck as CheckCircle2 } from 'lucide-react-native';

interface ReadingExercise {
  id: number;
  title: string;
  passage: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  readingTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default function ReadingScreen() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);

  const readingExercises: ReadingExercise[] = [
    {
      id: 1,
      title: "The Benefits of Reading",
      passage: "Reading is one of the most beneficial activities for personal development. It expands our vocabulary, improves our writing skills, and enhances our ability to think critically. When we read regularly, our brains become more active and engaged.\n\nStudies have shown that people who read frequently have better memory and concentration. Reading also reduces stress levels and can even help prevent cognitive decline as we age. Whether it's fiction or non-fiction, every book we read contributes to our knowledge and understanding of the world.\n\nMoreover, reading helps us develop empathy by allowing us to experience different perspectives and cultures through stories. It's a window into other people's experiences and thoughts, making us more understanding and compassionate individuals.",
      questions: [
        {
          question: "According to the passage, what is one benefit of reading regularly?",
          options: ["Better sleep", "Improved memory", "Increased height", "Better vision"],
          correctAnswer: 1
        },
        {
          question: "How does reading help with empathy?",
          options: [
            "By making us laugh more",
            "By teaching us new languages", 
            "By showing us different perspectives",
            "By improving our eyesight"
          ],
          correctAnswer: 2
        },
        {
          question: "What type of books contribute to our knowledge?",
          options: ["Only fiction books", "Only non-fiction books", "Both fiction and non-fiction", "Neither fiction nor non-fiction"],
          correctAnswer: 2
        }
      ],
      readingTime: "3 min",
      difficulty: "intermediate"
    }
  ];

  const exercise = readingExercises[currentExercise];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const startQuestions = () => {
    setShowQuestions(true);
    setSelectedAnswers(new Array(exercise.questions.length).fill(null));
  };

  const nextQuestion = () => {
    if (currentQuestion < exercise.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === exercise.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const resetExercise = () => {
    setShowQuestions(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / exercise.questions.length) * 100);
    
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#8B5CF6', '#A855F7']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Results</Text>
        </LinearGradient>
        
        <View style={styles.resultsContainer}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>{percentage}%</Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>
          
          <Text style={styles.resultText}>
            You got {score} out of {exercise.questions.length} questions correct!
          </Text>
          
          <TouchableOpacity style={styles.tryAgainButton} onPress={resetExercise}>
            <Text style={styles.tryAgainButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (showQuestions) {
    const question = exercise.questions[currentQuestion];
    
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#F59E0B', '#D97706']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Comprehension</Text>
          <Text style={styles.headerSubtitle}>
            Question {currentQuestion + 1} of {exercise.questions.length}
          </Text>
        </LinearGradient>

        <ScrollView style={styles.content}>
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{question.question}</Text>
            
            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswers[currentQuestion] === index && styles.selectedOption
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedAnswers[currentQuestion] === index && styles.selectedOptionText
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedAnswers[currentQuestion] !== null && (
              <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                <Text style={styles.nextButtonText}>
                  {currentQuestion < exercise.questions.length - 1 ? 'Next Question' : 'Show Results'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EF4444', '#DC2626']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Reading Practice</Text>
        <Text style={styles.headerSubtitle}>Improve your comprehension</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <View>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <View style={styles.exerciseMeta}>
                <View style={styles.metaItem}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.metaText}>{exercise.readingTime} read</Text>
                </View>
                <View style={styles.metaItem}>
                  <Target size={16} color={getDifficultyColor(exercise.difficulty)} />
                  <Text style={[styles.metaText, { color: getDifficultyColor(exercise.difficulty) }]}>
                    {exercise.difficulty}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.passageText}>{exercise.passage}</Text>
          
          <TouchableOpacity style={styles.startButton} onPress={startQuestions}>
            <BookOpen size={20} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Start Questions</Text>
          </TouchableOpacity>
        </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  exerciseHeader: {
    marginBottom: 20,
  },
  exerciseTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  passageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 24,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
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
  optionText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedOptionText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#F59E0B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  scorePercentage: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#374151',
    marginBottom: 32,
  },
  tryAgainButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  tryAgainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
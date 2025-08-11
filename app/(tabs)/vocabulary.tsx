import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RotateCcw, Volume2, Star, ArrowRight } from 'lucide-react-native';

interface VocabularyWord {
  id: number;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export default function VocabularyScreen() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const vocabularyWords: VocabularyWord[] = [
    {
      id: 1,
      word: 'Serendipity',
      pronunciation: '/ˌserənˈdipədē/',
      meaning: 'The occurrence and development of events by chance in a happy or beneficial way',
      example: 'Meeting my best friend was pure serendipity.',
      difficulty: 'advanced',
      category: 'Abstract Concepts'
    },
    {
      id: 2,
      word: 'Resilient',
      pronunciation: '/rəˈzilyənt/',
      meaning: 'Able to withstand or recover quickly from difficult conditions',
      example: 'She remained resilient despite facing many challenges.',
      difficulty: 'intermediate',
      category: 'Character Traits'
    },
    {
      id: 3,
      word: 'Abundant',
      pronunciation: '/əˈbəndənt/',
      meaning: 'Existing or available in large quantities; plentiful',
      example: 'The garden had abundant flowers this spring.',
      difficulty: 'beginner',
      category: 'Descriptive'
    },
    {
      id: 4,
      word: 'Eloquent',
      pronunciation: '/ˈeləkwənt/',
      meaning: 'Fluent or persuasive in speaking or writing',
      example: 'His eloquent speech moved the entire audience.',
      difficulty: 'intermediate',
      category: 'Communication'
    }
  ];

  const currentWord = vocabularyWords[currentWordIndex];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % vocabularyWords.length);
    setShowMeaning(false);
  };

  const flipCard = () => {
    setShowMeaning(!showMeaning);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2563EB', '#3B82F6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Vocabulary</Text>
        <Text style={styles.headerSubtitle}>
          {currentWordIndex + 1} of {vocabularyWords.length}
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentWordIndex + 1) / vocabularyWords.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.flashcard}
          onPress={flipCard}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={showMeaning ? ['#8B5CF6', '#A855F7'] : ['#FFFFFF', '#F8FAFC']}
            style={styles.cardGradient}
          >
            {!showMeaning ? (
              <View style={styles.cardFront}>
                <View style={styles.categoryBadge}>
                  <Text style={[styles.difficultyText, { color: getDifficultyColor(currentWord.difficulty) }]}>
                    {currentWord.difficulty}
                  </Text>
                </View>
                
                <Text style={styles.word}>{currentWord.word}</Text>
                <Text style={styles.pronunciation}>{currentWord.pronunciation}</Text>
                
                <TouchableOpacity style={styles.soundButton}>
                  <Volume2 size={20} color="#2563EB" />
                </TouchableOpacity>
                
                <Text style={styles.flipHint}>Tap to see meaning</Text>
              </View>
            ) : (
              <View style={styles.cardBack}>
                <Text style={styles.meaningTitle}>Meaning</Text>
                <Text style={styles.meaning}>{currentWord.meaning}</Text>
                
                <Text style={styles.exampleTitle}>Example</Text>
                <Text style={styles.example}>{currentWord.example}</Text>
                
                <Text style={styles.category}>Category: {currentWord.category}</Text>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.difficultButton}>
            <RotateCcw size={20} color="#EF4444" />
            <Text style={styles.difficultButtonText}>Hard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.easyButton} onPress={nextWord}>
            <Star size={20} color="#10B981" />
            <Text style={styles.easyButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={nextWord}>
          <Text style={styles.nextButtonText}>Next Word</Text>
          <ArrowRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
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
    color: '#E0E7FF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 3,
  },
  flashcard: {
    height: 320,
    marginBottom: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'center',
  },
  cardFront: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  word: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  pronunciation: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  soundButton: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 50,
    marginBottom: 20,
  },
  flipHint: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  cardBack: {
    flex: 1,
    justifyContent: 'center',
  },
  meaningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  meaning: {
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 26,
    marginBottom: 20,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E0E7FF',
    marginBottom: 8,
  },
  example: {
    fontSize: 16,
    color: '#E0E7FF',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 20,
  },
  category: {
    fontSize: 14,
    color: '#C7D2FE',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  difficultButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  difficultButtonText: {
    color: '#EF4444',
    fontWeight: '600',
  },
  easyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  easyButtonText: {
    color: '#10B981',
    fontWeight: '600',
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
});
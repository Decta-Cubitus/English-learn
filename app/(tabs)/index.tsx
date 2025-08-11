import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Target, Calendar, BookOpen, FileText, Zap } from 'lucide-react-native';

export default function HomeScreen() {
  const stats = {
    streak: 12,
    wordsLearned: 847,
    lessonsCompleted: 34,
    level: 'Intermediate'
  };

  const dailyChallenges = [
    { id: 1, title: 'Learn 10 new words', progress: 7, total: 10, icon: BookOpen },
    { id: 2, title: 'Complete 3 grammar exercises', progress: 1, total: 3, icon: FileText },
    { id: 3, title: 'Read 2 articles', progress: 0, total: 2, icon: Zap },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#2563EB', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.username}>Ready to learn English?</Text>
          <View style={styles.streakContainer}>
            <Calendar size={20} color="#FDE047" />
            <Text style={styles.streakText}>{stats.streak} day streak</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Target size={24} color="#10B981" />
            <Text style={styles.statNumber}>{stats.wordsLearned}</Text>
            <Text style={styles.statLabel}>Words Learned</Text>
          </View>
          <View style={styles.statCard}>
            <Trophy size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>{stats.lessonsCompleted}</Text>
            <Text style={styles.statLabel}>Lessons Done</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Challenges</Text>
          {dailyChallenges.map((challenge) => {
            const IconComponent = challenge.icon;
            const progressPercentage = (challenge.progress / challenge.total) * 100;
            
            return (
              <TouchableOpacity key={challenge.id} style={styles.challengeCard}>
                <View style={styles.challengeHeader}>
                  <IconComponent size={20} color="#2563EB" />
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                </View>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${progressPercentage}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {challenge.progress}/{challenge.total}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity style={styles.continueCard}>
            <LinearGradient
              colors={['#8B5CF6', '#A855F7']}
              style={styles.continueGradient}
            >
              <Text style={styles.continueTitle}>Intermediate Grammar</Text>
              <Text style={styles.continueSubtitle}>Present Perfect Tense</Text>
              <View style={styles.continueProgress}>
                <View style={styles.continueProgressBar}>
                  <View style={[styles.continueProgressFill, { width: '65%' }]} />
                </View>
                <Text style={styles.continueProgressText}>65% Complete</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 4,
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    color: '#FDE047',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  content: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    minWidth: 40,
  },
  continueCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  continueGradient: {
    padding: 20,
  },
  continueTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  continueSubtitle: {
    fontSize: 14,
    color: '#E0E7FF',
    marginBottom: 16,
  },
  continueProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  continueProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
  },
  continueProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  continueProgressText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
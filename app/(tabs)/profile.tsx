import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Trophy, 
  Target, 
  Calendar, 
  BookOpen, 
  Award, 
  Settings, 
  Bell,
  ChevronRight,
  CheckCircle2
} from 'lucide-react-native';

export default function ProfileScreen() {
  const userStats = {
    name: 'Alex Johnson',
    level: 'Intermediate',
    streak: 12,
    wordsLearned: 847,
    lessonsCompleted: 34,
    totalPoints: 2450,
    joinDate: 'January 2024'
  };

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Complete your first lesson', earned: true, icon: '🎯' },
    { id: 2, title: 'Word Master', description: 'Learn 100 new words', earned: true, icon: '📚' },
    { id: 3, title: 'Grammar Pro', description: 'Complete 10 grammar exercises', earned: true, icon: '✏️' },
    { id: 4, title: 'Speed Reader', description: 'Complete 5 reading exercises', earned: false, icon: '⚡' },
    { id: 5, title: 'Consistency King', description: 'Maintain a 30-day streak', earned: false, icon: '🔥' },
  ];

  const menuItems = [
    { id: 1, title: 'Study Reminders', icon: Bell, color: '#F59E0B' },
    { id: 2, title: 'Learning Goals', icon: Target, color: '#10B981' },
    { id: 3, title: 'Settings', icon: Settings, color: '#6B7280' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#A855F7']}
        style={styles.header}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <User size={32} color="#FFFFFF" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userStats.name}</Text>
            <Text style={styles.userLevel}>{userStats.level} Level</Text>
            <Text style={styles.joinDate}>Member since {userStats.joinDate}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Calendar size={24} color="#F59E0B" />
              <Text style={styles.statNumber}>{userStats.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statCard}>
              <BookOpen size={24} color="#2563EB" />
              <Text style={styles.statNumber}>{userStats.wordsLearned}</Text>
              <Text style={styles.statLabel}>Words Learned</Text>
            </View>
          </View>
          
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Trophy size={24} color="#10B981" />
              <Text style={styles.statNumber}>{userStats.lessonsCompleted}</Text>
              <Text style={styles.statLabel}>Lessons Done</Text>
            </View>
            <View style={styles.statCard}>
              <Award size={24} color="#8B5CF6" />
              <Text style={styles.statNumber}>{userStats.totalPoints}</Text>
              <Text style={styles.statLabel}>Total Points</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  achievement.earned && styles.achievementEarned
                ]}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={[
                  styles.achievementTitle,
                  achievement.earned && styles.achievementEarnedText
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  achievement.earned && styles.achievementEarnedDescription
                ]}>
                  {achievement.description}
                </Text>
                {achievement.earned && (
                  <View style={styles.earnedBadge}>
                    <CheckCircle2 size={16} color="#10B981" />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}20` }]}>
                    <IconComponent size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            );
          })}
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
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 14,
    color: '#C7D2FE',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    marginBottom: 32,
  },
  statRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
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
    fontSize: 24,
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
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  achievementEarned: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementEarnedText: {
    color: '#1F2937',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  achievementEarnedDescription: {
    color: '#6B7280',
  },
  earnedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 20,
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
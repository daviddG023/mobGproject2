import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Calendar, User, Clock } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>NG</Text>
          </View>
          <Text style={styles.clubName}>New Giza Golf Club</Text>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => router.replace('/welcome')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome Back, John Doe</Text>
        <Text style={styles.memberInfo}>Handicap: 18 | Membership: Premium</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsSection}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Rounds This Month</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, styles.statNumberGold]}>3</Text>
            <Text style={styles.statLabel}>Upcoming Lessons</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Tournament Entries</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <View style={styles.actionCard}>
          <Calendar size={40} color="#6B7280" />
          <Text style={styles.actionTitle}>Book Tee Time</Text>
          <Text style={styles.actionDescription}>
            Reserve your preferred tee times and create matches
          </Text>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/(tabs)/book-tee-time')}
          >
            <Text style={styles.actionButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionCard}>
          <User size={40} color="#D4AF37" />
          <Text style={styles.actionTitle}>Book Lesson</Text>
          <Text style={styles.actionDescription}>
            Schedule private or group lessons with instructors
          </Text>
          <TouchableOpacity 
            style={[styles.actionButton, styles.actionButtonGold]}
            onPress={() => router.push('/(tabs)/book-lesson')}
          >
            <Text style={[styles.actionButtonText, styles.actionButtonTextDark]}>
              Schedule Lesson
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionCard}>
          <Clock size={40} color="#6B7280" />
          <Text style={styles.actionTitle}>Tournaments</Text>
          <Text style={styles.actionDescription}>
            Register for upcoming tournaments and events
          </Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>View Tournaments</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D5838',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clubName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  welcomeSection: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  memberInfo: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsSection: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  statNumberGold: {
    color: '#D4AF37',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  actionsSection: {
    padding: 20,
    gap: 16,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#2D5838',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  actionButtonGold: {
    backgroundColor: '#D4AF37',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  actionButtonTextDark: {
    color: '#1F2937',
  },
});
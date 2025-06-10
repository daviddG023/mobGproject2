import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const demoUser = {
  name: 'John Smith',
  email: 'john.smith@email.com',
  handicap: 12.4,
  memberSince: 2022,
  membershipTier: 'Gold',
  profilePhoto: null, // use null for placeholder
  memberId: 'NGC-2022-001',
};

const demoStats = {
  totalRounds: 34,
  totalTime: '72h',
  achievements: ['Played 10 rounds', 'Won a tournament'],
};

export default function ProfileScreen() {
  const [user, setUser] = useState(demoUser);
  const navigation = useNavigation();

  const handleEditPhoto = () => {
    Alert.alert('Edit Photo', 'Photo editing not implemented in demo.');
  };
  const handleSignOut = () => {
    // Use expo-router for navigation
    router.replace('/welcome');
  };
  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Change password not implemented in demo.');
  };
  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Payment methods not implemented in demo.');
  };
  const handleUpcoming = () => {
    Alert.alert('Upcoming Reservations', 'Upcoming reservations shortcut.');
  };
  const handleActivity = (type: string) => {
    Alert.alert(type, `${type} details not implemented in demo.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* User Info */}
      <View style={styles.profileTop}>
        <TouchableOpacity onPress={handleEditPhoto} style={styles.profilePhotoWrapper}>
          {user.profilePhoto ? (
            <Image source={{ uri: user.profilePhoto }} style={styles.profilePhoto} />
          ) : (
            <View style={styles.profilePhotoPlaceholder}>
              <Ionicons name="person-circle-outline" size={80} color="#D1D5DB" />
              <View style={styles.editIcon}><Ionicons name="camera" size={20} color="#fff" /></View>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        <View style={styles.profileDetailsRow}>
          <Text style={styles.profileDetail}>Handicap: <Text style={styles.profileDetailValue}>{user.handicap}</Text></Text>
          <Text style={styles.profileDetail}>| Member since <Text style={styles.profileDetailValue}>{user.memberSince}</Text></Text>
        </View>
        <Text style={styles.profileTier}>Membership: {user.membershipTier} ({user.memberId})</Text>
      </View>

      {/* My Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Activity</Text>
        <View style={styles.sectionList}>
          <TouchableOpacity style={styles.sectionItem} /* onPress={() => navigation.navigate('PastBookings')}> */>
            <Ionicons name="golf-outline" size={22} color="#2D5838" style={styles.sectionIcon} />
            <Text style={styles.sectionItemText}>Past Tee Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem} /*  onPress={() => navigation.navigate('PastLessons')}> */>
            <FontAwesome5 name="chalkboard-teacher" size={20} color="#D4AF37" style={styles.sectionIcon} />
            <Text style={styles.sectionItemText}>Past Lessons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem} onPress={() => handleActivity('Tournament History')}>
            <MaterialCommunityIcons name="trophy-outline" size={22} color="#B91C1C" style={styles.sectionIcon} />
            <Text style={styles.sectionItemText}>Tournament History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem} onPress={() => handleActivity('Favorite Courses/Pros')}>
            <Ionicons name="star-outline" size={22} color="#F59E42" style={styles.sectionIcon} />
            <Text style={styles.sectionItemText}>Favorite Courses/Pros</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* My Account */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Account</Text>
        <View style={styles.sectionList}>
          <TouchableOpacity style={styles.sectionItem} onPress={handleUpcoming}>
            <Ionicons name="calendar-outline" size={22} color="#2D5838" style={styles.sectionIcon} />
            <Text style={styles.sectionItemText}>Upcoming Reservations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem} onPress={handlePaymentMethods}>
            <Ionicons name="card-outline" size={22} color="#D4AF37" style={styles.sectionIcon} />
            <Text style={styles.sectionItemText}>Payment Methods</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem} onPress={handleChangePassword}>
            <Ionicons name="lock-closed-outline" size={22} color="#6B7280" style={styles.sectionIcon} />
            <Text style={styles.sectionItemText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem} onPress={handleSignOut}>
            <Ionicons name="exit-outline" size={22} color="#B91C1C" style={styles.sectionIcon} />
            <Text style={styles.sectionItemText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Optional Enhancements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements & Stats</Text>
        <View style={styles.achievementsRow}>
          {demoStats.achievements.map((ach, idx) => (
            <View key={idx} style={styles.achievementBadge}>
              <Ionicons name="medal-outline" size={20} color="#D4AF37" />
              <Text style={styles.achievementText}>{ach}</Text>
            </View>
          ))}
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{demoStats.totalRounds}</Text>
            <Text style={styles.statLabel}>Total Rounds</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{demoStats.totalTime}</Text>
            <Text style={styles.statLabel}>Time on Course</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 0,
  },
  profileTop: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 16,
  },
  profilePhotoWrapper: {
    marginBottom: 12,
    position: 'relative',
  },
  profilePhoto: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  profilePhotoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#2D5838',
    borderRadius: 12,
    padding: 2,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 8,
  },
  profileDetailsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 14,
    color: '#6B7280',
  },
  profileDetailValue: {
    color: '#2D5838',
    fontWeight: '600',
  },
  profileTier: {
    fontSize: 14,
    color: '#D4AF37',
    marginBottom: 4,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  sectionList: {
    gap: 8,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionIcon: {
    marginRight: 12,
    width: 28,
    textAlign: 'center',
  },
  sectionItemText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  achievementsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 4,
  },
  achievementText: {
    fontSize: 13,
    color: '#D4AF37',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    minWidth: 90,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5838',
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
});
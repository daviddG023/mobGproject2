import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Search, Edit, Ban, CheckCircle, Mail, Phone } from 'lucide-react-native';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  handicap: number;
  joinDate: string;
  membershipType: 'Premium' | 'Standard';
  status: 'Active' | 'Suspended';
}

const initialMembers: Member[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+20 100 123 4567',
    handicap: 12,
    joinDate: '2023-01-15',
    membershipType: 'Premium',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Sarah Mohamed',
    email: 'sarah.mohamed@email.com',
    phone: '+20 100 987 6543',
    handicap: 18,
    joinDate: '2023-03-22',
    membershipType: 'Standard',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Omar Ali',
    email: 'omar.ali@email.com',
    phone: '+20 100 555 7890',
    handicap: 8,
    joinDate: '2022-11-10',
    membershipType: 'Premium',
    status: 'Suspended',
  },
];

const AdminHeader = () => (
  <View style={styles.header}>
    <View style={styles.logoContainer}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>A</Text>
      </View>
      <View>
        <Text style={styles.adminTitle}>Admin Panel</Text>
        <Text style={styles.clubName}>New Giza Golf Club</Text>
      </View>
    </View>
    <TouchableOpacity 
      style={styles.logoutButton}
      onPress={() => router.replace('/welcome')}
    >
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

export default function UserManagementScreen() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSuspendMember = (id: string) => {
    Alert.alert(
      'Suspend Member',
      'Are you sure you want to suspend this member?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Suspend',
          style: 'destructive',
          onPress: () => {
            setMembers(members.map(member =>
              member.id === id ? { ...member, status: 'Suspended' } : member
            ));
          }
        }
      ]
    );
  };

  const handleActivateMember = (id: string) => {
    setMembers(members.map(member =>
      member.id === id ? { ...member, status: 'Active' } : member
    ));
    Alert.alert('Success', 'Member has been activated');
  };

  const renderMemberCard = (member: Member) => (
    <View key={member.id} style={styles.memberCard}>
      <View style={styles.memberHeader}>
        <Text style={styles.memberName}>{member.name}</Text>
        <View style={styles.memberBadges}>
          <View style={[styles.statusBadge, member.status === 'Active' ? styles.statusActive : styles.statusSuspended]}>
            <Text style={[styles.statusText, member.status === 'Active' ? styles.statusActiveText : styles.statusSuspendedText]}>
              {member.status}
            </Text>
          </View>
          <View style={[styles.membershipBadge, member.membershipType === 'Premium' ? styles.membershipPremium : styles.membershipStandard]}>
            <Text style={[styles.membershipText, member.membershipType === 'Premium' ? styles.membershipPremiumText : styles.membershipStandardText]}>
              {member.membershipType}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.memberDetails}>
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Mail size={16} color="#6B7280" />
            <Text style={styles.contactText}>{member.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Phone size={16} color="#6B7280" />
            <Text style={styles.contactText}>{member.phone}</Text>
          </View>
        </View>
        
        <View style={styles.memberStats}>
          <Text style={styles.statText}>Handicap: <Text style={styles.statValue}>{member.handicap}</Text></Text>
          <Text style={styles.statText}>Joined: <Text style={styles.statValue}>{member.joinDate}</Text></Text>
        </View>
      </View>

      <View style={styles.memberActions}>
        <TouchableOpacity style={styles.editButton}>
          <Edit size={16} color="#6B7280" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        
        {member.status === 'Active' ? (
          <TouchableOpacity 
            style={styles.suspendButton}
            onPress={() => handleSuspendMember(member.id)}
          >
            <Ban size={16} color="#FFFFFF" />
            <Text style={styles.suspendButtonText}>Suspend</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.activateButton}
            onPress={() => handleActivateMember(member.id)}
          >
            <CheckCircle size={16} color="#FFFFFF" />
            <Text style={styles.activateButtonText}>Activate</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <AdminHeader />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Member Search</Text>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search members by name or email..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Member Directory */}
        <View style={styles.directorySection}>
          <Text style={styles.sectionTitle}>Member Directory</Text>
          {filteredMembers.map(renderMemberCard)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#374151',
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#1F2937',
    fontWeight: 'bold',
    fontSize: 16,
  },
  adminTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  clubName: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  logoutButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: '#1F2937',
    fontWeight: '500',
    fontSize: 12,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  directorySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  memberBadges: {
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  statusActive: {
    backgroundColor: '#10B981',
  },
  statusSuspended: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusActiveText: {
    color: '#FFFFFF',
  },
  statusSuspendedText: {
    color: '#FFFFFF',
  },
  membershipBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  membershipPremium: {
    backgroundColor: '#D4AF37',
  },
  membershipStandard: {
    backgroundColor: '#6B7280',
  },
  membershipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  membershipPremiumText: {
    color: '#1F2937',
  },
  membershipStandardText: {
    color: '#FFFFFF',
  },
  memberDetails: {
    marginBottom: 16,
  },
  contactInfo: {
    gap: 8,
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#6B7280',
  },
  memberStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statValue: {
    fontWeight: '600',
    color: '#2D5838',
  },
  memberActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  suspendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  suspendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  activateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  activateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
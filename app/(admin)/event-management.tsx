import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Plus, Edit, Trash2, Users, Calendar, Clock, X } from 'lucide-react-native';

interface Event {
  id: string;
  name: string;
  type: 'Tournament' | 'Special Event' | 'Lesson';
  date: string;
  time: string;
  sponsor?: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'Active' | 'Full' | 'Cancelled';
  price?: number;
  instructor?: string;
}

const initialEvents: Event[] = [
  {
    id: '1',
    name: 'Weekly Tournament',
    type: 'Tournament',
    date: '2024-06-08',
    time: '08:00',
    maxParticipants: 32,
    currentParticipants: 24,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Red Bull Championship',
    type: 'Special Event',
    date: '2024-06-15',
    time: '09:00',
    sponsor: 'Red Bull',
    maxParticipants: 50,
    currentParticipants: 45,
    status: 'Active',
  },
  {
    id: '3',
    name: 'Pro Lesson with Ahmed',
    type: 'Lesson',
    date: '2024-06-09',
    time: '14:00',
    instructor: 'Ahmed Hassan',
    maxParticipants: 4,
    currentParticipants: 1,
    status: 'Active',
    price: 150,
  },
  {
    id: '4',
    name: 'Group Putting Clinic',
    type: 'Lesson',
    date: '2024-06-10',
    time: '16:00',
    instructor: 'Sarah Mohamed',
    maxParticipants: 8,
    currentParticipants: 6,
    status: 'Active',
    price: 75,
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

const TabSelector = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'events' && styles.activeTab]}
      onPress={() => onTabChange('events')}
    >
      <Calendar size={20} color={activeTab === 'events' ? '#FFFFFF' : '#6B7280'} />
      <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
        Events & Tournaments
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'lessons' && styles.activeTab]}
      onPress={() => onTabChange('lessons')}
    >
      <Users size={20} color={activeTab === 'lessons' ? '#FFFFFF' : '#6B7280'} />
      <Text style={[styles.tabText, activeTab === 'lessons' && styles.activeTabText]}>
        Lessons
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'teetimes' && styles.activeTab]}
      onPress={() => onTabChange('teetimes')}
    >
      <Clock size={20} color={activeTab === 'teetimes' ? '#FFFFFF' : '#6B7280'} />
      <Text style={[styles.tabText, activeTab === 'teetimes' && styles.activeTabText]}>
        Tee Times
      </Text>
    </TouchableOpacity>
  </View>
);

export default function EventManagementScreen() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [activeTab, setActiveTab] = useState('events');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState({
    name: '',
    type: 'Tournament' as Event['type'],
    date: '',
    time: '',
    sponsor: '',
    maxParticipants: '',
    price: '',
    instructor: '',
  });

  const filteredEvents = events.filter(event => {
    if (activeTab === 'events') return event.type === 'Tournament' || event.type === 'Special Event';
    if (activeTab === 'lessons') return event.type === 'Lesson';
    return false; // teetimes would be handled separately
  });

  const handleCreateEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.time || !newEvent.maxParticipants) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      name: newEvent.name,
      type: newEvent.type,
      date: newEvent.date,
      time: newEvent.time,
      sponsor: newEvent.sponsor || undefined,
      maxParticipants: parseInt(newEvent.maxParticipants),
      currentParticipants: 0,
      status: 'Active',
      price: newEvent.price ? parseInt(newEvent.price) : undefined,
      instructor: newEvent.instructor || undefined,
    };

    setEvents([...events, event]);
    setShowCreateModal(false);
    resetForm();
    Alert.alert('Success', `${newEvent.type} created successfully!`);
  };

  const handleDeleteEvent = (id: string) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setEvents(events.filter(e => e.id !== id))
        }
      ]
    );
  };

  const resetForm = () => {
    setNewEvent({
      name: '',
      type: 'Tournament',
      date: '',
      time: '',
      sponsor: '',
      maxParticipants: '',
      price: '',
      instructor: '',
    });
    setEditingEvent(null);
  };

  const renderEventCard = (event: Event) => (
    <View key={event.id} style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventName}>{event.name}</Text>
        <View style={styles.eventActions}>
          <Text style={styles.participantCount}>
            <Users size={16} color="#6B7280" /> {event.currentParticipants}/{event.maxParticipants}
          </Text>
          <TouchableOpacity style={styles.actionButton}>
            <Edit size={16} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeleteEvent(event.id)}
          >
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.eventDetails}>
        <Text style={styles.eventDetail}>{event.date} at {event.time}</Text>
        {event.instructor && (
          <Text style={styles.eventDetail}>Instructor: {event.instructor}</Text>
        )}
        {event.sponsor && (
          <Text style={styles.eventDetail}>Sponsored by {event.sponsor}</Text>
        )}
        {event.price && (
          <Text style={styles.eventDetail}>Price: EGP {event.price}</Text>
        )}
      </View>

      <View style={styles.eventFooter}>
        <View style={[styles.statusBadge, event.status === 'Active' && styles.statusActive]}>
          <Text style={[styles.statusText, event.status === 'Active' && styles.statusActiveText]}>
            {event.status}
          </Text>
        </View>
        <Text style={styles.eventType}>{event.type}</Text>
      </View>
    </View>
  );

  const renderTeeTimesTab = () => (
    <View style={styles.teeTimesContainer}>
      <View style={styles.createSection}>
        <Text style={styles.createTitle}>+ Create New Tee Time Slot</Text>
        <View style={styles.createForm}>
          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Course</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Select course"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Date</Text>
              <TextInput
                style={styles.formInput}
                placeholder="dd/mm/yyyy"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Start Time</Text>
              <TextInput
                style={styles.formInput}
                placeholder="--:-- --"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>End Time</Text>
              <TextInput
                style={styles.formInput}
                placeholder="--:-- --"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create Tee Time Slots</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.manageSection}>
        <Text style={styles.sectionTitle}>Manage Tee Times</Text>
        
        <View style={styles.teeTimeCard}>
          <View style={styles.teeTimeHeader}>
            <Text style={styles.teeTimeName}>07:00 - Championship Course</Text>
            <View style={styles.teeTimeActions}>
              <Text style={styles.teeTimeCount}>
                <Users size={16} color="#6B7280" /> 3/4
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Edit size={16} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Trash2 size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.teeTimeDate}>Date: 2024-06-08</Text>
          <View style={[styles.statusBadge, styles.statusAvailable]}>
            <Text style={[styles.statusText, styles.statusAvailableText]}>Available</Text>
          </View>
        </View>

        <View style={styles.teeTimeCard}>
          <View style={styles.teeTimeHeader}>
            <Text style={styles.teeTimeName}>07:30 - Championship Course</Text>
            <View style={styles.teeTimeActions}>
              <Text style={styles.teeTimeCount}>
                <Users size={16} color="#6B7280" /> 4/4
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Edit size={16} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Trash2 size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.teeTimeDate}>Date: 2024-06-08</Text>
          <View style={[styles.statusBadge, styles.statusFull]}>
            <Text style={[styles.statusText, styles.statusFullText]}>Full</Text>
          </View>
        </View>

        <View style={styles.teeTimeCard}>
          <View style={styles.teeTimeHeader}>
            <Text style={styles.teeTimeName}>08:00 - Executive Course</Text>
            <View style={styles.teeTimeActions}>
              <Text style={styles.teeTimeCount}>
                <Users size={16} color="#6B7280" /> 2/4
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Edit size={16} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Trash2 size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.teeTimeDate}>Date: 2024-06-08</Text>
          <View style={[styles.statusBadge, styles.statusAvailable]}>
            <Text style={[styles.statusText, styles.statusAvailableText]}>Available</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <AdminHeader />
      
      <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab !== 'teetimes' ? (
          <>
            {/* Create Section */}
            <View style={styles.createSection}>
              <Text style={styles.createTitle}>
                + Create New {activeTab === 'events' ? 'Event/Tournament' : 'Lesson'}
              </Text>
              <TouchableOpacity 
                style={styles.createButton}
                onPress={() => setShowCreateModal(true)}
              >
                <Plus size={20} color="#FFFFFF" />
                <Text style={styles.createButtonText}>
                  Create {activeTab === 'events' ? 'Event' : 'Lesson'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Manage Section */}
            <View style={styles.manageSection}>
              <Text style={styles.sectionTitle}>
                Manage {activeTab === 'events' ? 'Events & Tournaments' : 'Lessons'}
              </Text>
              {filteredEvents.map(renderEventCard)}
            </View>
          </>
        ) : (
          renderTeeTimesTab()
        )}
      </ScrollView>

      {/* Create Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Create New {activeTab === 'events' ? 'Event/Tournament' : 'Lesson'}
              </Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                  {activeTab === 'events' ? 'Event' : 'Lesson'} Name
                </Text>
                <TextInput
                  style={styles.formInput}
                  value={newEvent.name}
                  onChangeText={(text) => setNewEvent({ ...newEvent, name: text })}
                  placeholder={`Enter ${activeTab === 'events' ? 'event' : 'lesson'} name`}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {activeTab === 'events' && (
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Event Type</Text>
                  <View style={styles.typeSelector}>
                    <TouchableOpacity
                      style={[styles.typeOption, newEvent.type === 'Tournament' && styles.typeOptionSelected]}
                      onPress={() => setNewEvent({ ...newEvent, type: 'Tournament' })}
                    >
                      <Text style={[styles.typeOptionText, newEvent.type === 'Tournament' && styles.typeOptionTextSelected]}>
                        Tournament
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.typeOption, newEvent.type === 'Special Event' && styles.typeOptionSelected]}
                      onPress={() => setNewEvent({ ...newEvent, type: 'Special Event' })}
                    >
                      <Text style={[styles.typeOptionText, newEvent.type === 'Special Event' && styles.typeOptionTextSelected]}>
                        Special Event
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {activeTab === 'lessons' && (
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Instructor</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newEvent.instructor}
                    onChangeText={(text) => setNewEvent({ ...newEvent, instructor: text })}
                    placeholder="Select instructor"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              )}

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Date</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newEvent.date}
                    onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
                    placeholder="dd/mm/yyyy"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Time</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newEvent.time}
                    onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
                    placeholder="--:-- --"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {activeTab === 'events' && (
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Sponsor (Optional)</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newEvent.sponsor}
                    onChangeText={(text) => setNewEvent({ ...newEvent, sponsor: text })}
                    placeholder="Sponsor name"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              )}

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>
                    Max {activeTab === 'events' ? 'Participants' : 'Students'}
                  </Text>
                  <TextInput
                    style={styles.formInput}
                    value={newEvent.maxParticipants}
                    onChangeText={(text) => setNewEvent({ ...newEvent, maxParticipants: text })}
                    placeholder="32"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                  />
                </View>
                {activeTab === 'lessons' && (
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Price (EGP)</Text>
                    <TextInput
                      style={styles.formInput}
                      value={newEvent.price}
                      onChangeText={(text) => setNewEvent({ ...newEvent, price: text })}
                      placeholder="Lesson price"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="numeric"
                    />
                  </View>
                )}
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleCreateEvent}>
                <Text style={styles.submitButtonText}>
                  Create {activeTab === 'events' ? 'Event' : 'Lesson'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#2D5838',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  createSection: {
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
  createTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D5838',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  manageSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
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
    marginBottom: 20,
  },
  eventCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  eventActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  participantCount: {
    fontSize: 14,
    color: '#6B7280',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 4,
  },
  eventDetails: {
    marginBottom: 12,
  },
  eventDetail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#F3F4F6',
  },
  statusActive: {
    backgroundColor: '#10B981',
  },
  statusAvailable: {
    backgroundColor: '#10B981',
  },
  statusFull: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  statusActiveText: {
    color: '#FFFFFF',
  },
  statusAvailableText: {
    color: '#FFFFFF',
  },
  statusFullText: {
    color: '#FFFFFF',
  },
  eventType: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  teeTimesContainer: {
    gap: 24,
  },
  createForm: {
    gap: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formGroup: {
    flex: 1,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
  },
  teeTimeCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  teeTimeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  teeTimeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  teeTimeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  teeTimeCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  teeTimeDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalContent: {
    padding: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    alignItems: 'center',
  },
  typeOptionSelected: {
    borderColor: '#2D5838',
    backgroundColor: '#F0FDF4',
  },
  typeOptionText: {
    fontSize: 14,
    color: '#6B7280',
  },
  typeOptionTextSelected: {
    color: '#2D5838',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#2D5838',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
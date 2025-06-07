import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { router } from 'expo-router';

const TOURNAMENTS = [
  {
    id: '1',
    name: 'Weekly Member Championship',
    sponsor: 'New Giza Development',
    sponsorType: 'main',
    date: 'June 7, 2025',
    time: '08:00 AM',
    format: 'Stroke Play',
    entryFee: 500,
    rules: 'Full handicap allowance, medal play format',
    description: 'Weekly championship with prizes for overall winners and category winners.',
    players: 87,
    maxPlayers: 120,
    registered: true,
    full: false,
    participants: ['Ahmed Hassan', 'Sarah Mohamed', 'Omar Ali', 'You'],
  },
  {
    id: '2',
    name: 'Ramadan Night Tournament',
    sponsor: 'CIB Bank',
    sponsorType: 'atm',
    date: 'June 14, 2025',
    time: '07:00 PM',
    format: 'Stableford',
    entryFee: 400,
    rules: '90% handicap allowance, best ball format available',
    description: 'Special Ramadan tournament with traditional iftar dinner included.',
    players: 65,
    maxPlayers: 80,
    registered: false,
    full: false,
    participants: ['Ahmed Hassan', 'Sarah Mohamed'],
  },
  {
    id: '3',
    name: 'Summer Classic Championship',
    sponsor: 'Mobil 1',
    sponsorType: 'oil',
    date: 'June 21, 2025',
    time: '06:30 AM',
    format: 'Match Play',
    entryFee: 800,
    rules: 'Scratch play, 18-hole matches',
    description: 'Prestigious summer championship with knockout format.',
    players: 64,
    maxPlayers: 64,
    registered: false,
    full: true,
    participants: ['Sarah Mohamed', 'Omar Ali'],
  },
];

const SPONSOR_ICONS = {
  main: '🏆',
  atm: '🏦',
  oil: '🛢️',
};

export default function TournamentsScreen() {
  const [tournaments, setTournaments] = useState(TOURNAMENTS);
  const [showParticipants, setShowParticipants] = useState(false);
  const [participantsList, setParticipantsList] = useState<string[]>([]);
  const [schedule, setSchedule] = useState(
    TOURNAMENTS.filter(t => t.registered)
  );

  const handleRegister = (id: string) => {
    setTournaments(tournaments => tournaments.map(t =>
      t.id === id ? { ...t, registered: true, players: t.players + 1 } : t
    ));
    setSchedule(sch => {
      const t = tournaments.find(t => t.id === id);
      if (t && !sch.some(s => s.id === id)) return [...sch, { ...t, registered: true, players: t.players + 1 }];
      return sch;
    });
  };

  const handleWithdraw = (id: string) => {
    setTournaments(tournaments => tournaments.map(t =>
      t.id === id ? { ...t, registered: false, players: t.players - 1 } : t
    ));
    setSchedule(sch => sch.filter(s => s.id !== id));
  };

  const handleViewParticipants = (participants: string[]) => {
    setParticipantsList(participants);
    setShowParticipants(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}><Text style={styles.logoText}>NG</Text></View>
          <Text style={styles.clubName}>New Giza Golf Club</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.headerButtonText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/welcome')}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.pageTitle}>Tournament Registration</Text>
        <Text style={styles.pageSubtitle}>Register for upcoming tournaments and special events</Text>
        {/* Tournament Cards */}
        {tournaments.map(t => (
          <View key={t.id} style={[styles.tournamentCard, t.registered && styles.tournamentCardRegistered, t.full && styles.tournamentCardFull]}>
            <View style={styles.tournamentHeader}>
              <Text style={styles.tournamentName}>{t.name}</Text>
              {t.registered && <Text style={styles.statusRegistered}>Registered</Text>}
              {t.full && !t.registered && <Text style={styles.statusFull}>Full</Text>}
            </View>
            <Text style={styles.sponsor}><Text style={styles.sponsorIcon}>{SPONSOR_ICONS[t.sponsorType as keyof typeof SPONSOR_ICONS]}</Text> Sponsored by {t.sponsor}</Text>
            <View style={styles.tournamentInfoRow}>
              <View style={styles.tournamentInfoCol}>
                <Text style={styles.infoText}>{t.date}</Text>
                <Text style={styles.infoText}>{t.time}</Text>
                <Text style={styles.infoText}>{t.players}/{t.maxPlayers} players</Text>
              </View>
              <View style={styles.tournamentInfoCol}>
                <Text style={styles.infoText}>Format: <Text style={styles.infoBold}>{t.format}</Text></Text>
                <Text style={styles.infoText}>Entry Fee: <Text style={styles.infoBold}>EGP {t.entryFee}</Text></Text>
                <Text style={styles.infoText}>Rules: <Text style={styles.infoBold}>{t.rules}</Text></Text>
              </View>
              <View style={styles.tournamentInfoCol}>
                <Text style={styles.tournamentDesc}>{t.description}</Text>
              </View>
            </View>
            <View style={styles.tournamentActions}>
              {!t.full && !t.registered && (
                <TouchableOpacity style={styles.registerButton} onPress={() => handleRegister(t.id)}>
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              )}
              {t.registered && (
                <TouchableOpacity style={styles.withdrawButton} onPress={() => handleWithdraw(t.id)}>
                  <Text style={styles.withdrawButtonText}>Withdraw</Text>
                </TouchableOpacity>
              )}
              {t.full && !t.registered && (
                <View style={styles.fullButton}>
                  <Text style={styles.fullButtonText}>Tournament Full</Text>
                </View>
              )}
              <TouchableOpacity style={styles.participantsButton} onPress={() => handleViewParticipants(t.participants)}>
                <Text style={styles.participantsButtonText}>View Participants</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {/* Schedule */}
        <View style={styles.scheduleCard}>
          <Text style={styles.scheduleTitle}>Your Tournament Schedule</Text>
          {schedule.length === 0 ? (
            <View style={styles.noSchedule}>
              <Text style={styles.noScheduleText}>No tournament registrations yet</Text>
              <Text style={styles.noScheduleSubtext}>Register for tournaments above to see them here</Text>
            </View>
          ) : (
            schedule.map(s => (
              <View key={s.id} style={styles.scheduleItem}>
                <View style={styles.scheduleInfo}>
                  <Text style={styles.scheduleName}>{s.name}</Text>
                  <Text style={styles.scheduleDate}>{s.date} at {s.time} - {s.format}</Text>
                </View>
                <Text style={styles.statusRegistered}>Registered</Text>
              </View>
            ))
          )}
        </View>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Participants Modal */}
      <Modal visible={showParticipants} animationType="slide" transparent onRequestClose={() => setShowParticipants(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Participants</Text>
            <FlatList
              data={participantsList}
              keyExtractor={(item, idx) => String(item) + String(idx)}
              renderItem={({ item }) => <Text style={styles.participantName}>{item}</Text>}
              style={{ marginBottom: 24 }}
            />
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowParticipants(false)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 64,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 },
  logo: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#2D5838', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  logoText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  clubName: { fontSize: 16, fontWeight: '600', color: '#1F2937', flexShrink: 1 },
  headerButtons: { flexDirection: 'row', gap: 8, flexShrink: 0 },
  headerButton: { borderWidth: 1, borderColor: '#D1D5DB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, minWidth: 80, alignItems: 'center' },
  headerButtonText: { color: '#6B7280', fontWeight: '500', fontSize: 12 },
  logoutButton: { borderWidth: 1, borderColor: '#D1D5DB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, minWidth: 60, alignItems: 'center' },
  logoutText: { color: '#6B7280', fontWeight: '500', fontSize: 12 },
  scroll: { flex: 1 },
  pageTitle: { fontSize: 32, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginTop: 16, marginBottom: 8 },
  pageSubtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  tournamentCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, borderWidth: 1, borderColor: '#D4AF37', marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  tournamentCardRegistered: { borderColor: '#2D5838' },
  tournamentCardFull: { borderColor: '#9CA3AF', opacity: 0.85 },
  tournamentHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  tournamentName: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  statusRegistered: { backgroundColor: '#2D5838', color: '#fff', fontWeight: '600', fontSize: 12, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 8, overflow: 'hidden' },
  statusFull: { backgroundColor: '#9CA3AF', color: '#fff', fontWeight: '600', fontSize: 12, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 8, overflow: 'hidden' },
  sponsor: { fontSize: 14, color: '#D4AF37', marginBottom: 12 },
  sponsorIcon: { fontSize: 16, marginRight: 4 },
  tournamentInfoRow: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  tournamentInfoCol: { flex: 1, gap: 2 },
  infoText: { fontSize: 14, color: '#1F2937' },
  infoBold: { fontWeight: '600', color: '#2D5838' },
  tournamentDesc: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  tournamentActions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  registerButton: { backgroundColor: '#2D5838', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center', flex: 1 },
  registerButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  withdrawButton: { backgroundColor: '#B91C1C', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center', flex: 1 },
  withdrawButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  fullButton: { backgroundColor: '#9CA3AF', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center', flex: 1 },
  fullButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  participantsButton: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', flex: 1 },
  participantsButtonText: { color: '#1F2937', fontWeight: '500', fontSize: 16 },
  scheduleCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, borderWidth: 1, borderColor: '#D4AF37', marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  scheduleTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 12 },
  noSchedule: { alignItems: 'center', paddingVertical: 24 },
  noScheduleText: { fontSize: 16, color: '#9CA3AF', marginBottom: 4 },
  noScheduleSubtext: { fontSize: 14, color: '#6B7280' },
  scheduleItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingVertical: 12 },
  scheduleInfo: { flex: 1 },
  scheduleName: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  scheduleDate: { fontSize: 14, color: '#6B7280' },
  backButton: { marginTop: 8, backgroundColor: '#F3F4F6', borderRadius: 8, paddingVertical: 16, alignItems: 'center' },
  backButtonText: { color: '#1F2937', fontWeight: '600', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 320, maxHeight: 400, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  participantName: { fontSize: 16, color: '#1F2937', marginBottom: 4 },
  closeModalButton: { marginTop: 8, backgroundColor: '#2D5838', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32, alignItems: 'center' },
  closeModalButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
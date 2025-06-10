import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { DollarSign, Calendar, Users, TrendingUp, Trophy, GraduationCap, Building } from 'lucide-react-native';

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

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconColor 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: any; 
  iconColor: string;
}) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <Text style={styles.statTitle}>{title}</Text>
      <Icon size={24} color={iconColor} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statChange}>{change}</Text>
  </View>
);

const TrendRow = ({ 
  month, 
  revenue, 
  bookings 
}: { 
  month: string; 
  revenue: string; 
  bookings: string;
}) => (
  <View style={styles.trendRow}>
    <Text style={styles.trendMonth}>{month}</Text>
    <Text style={styles.trendRevenue}>{revenue}</Text>
    <Text style={styles.trendBookings}>{bookings}</Text>
  </View>
);

const PopularEventRow = ({ 
  name, 
  metric 
}: { 
  name: string; 
  metric: string;
}) => (
  <View style={styles.popularEventRow}>
    <Text style={styles.eventName}>{name}</Text>
    <Text style={styles.eventMetric}>{metric}</Text>
  </View>
);

export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      <AdminHeader />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Monthly Revenue"
            value="$52,000"
            change="+15.2% from last month"
            icon={DollarSign}
            iconColor="#10B981"
          />
          <StatCard
            title="Total Bookings"
            value="280"
            change="+8.1% from last month"
            icon={Calendar}
            iconColor="#3B82F6"
          />
          <StatCard
            title="Active Members"
            value="1,234"
            change="+12% growth"
            icon={Users}
            iconColor="#8B5CF6"
          />
          <StatCard
            title="Avg. Revenue/Member"
            value="$42.14"
            change="+3.2% improvement"
            icon={TrendingUp}
            iconColor="#F59E0B"
          />
        </View>

        {/* Revenue & Bookings Trend */}
        <View style={styles.trendSection}>
          <Text style={styles.sectionTitle}>Revenue & Bookings Trend</Text>
          <View style={styles.trendTable}>
            <View style={styles.trendHeader}>
              <Text style={styles.trendHeaderText}>Month</Text>
              <Text style={styles.trendHeaderText}>Revenue</Text>
              <Text style={styles.trendHeaderText}>Bookings</Text>
            </View>
            <TrendRow month="Jan" revenue="$35,000" bookings="180 bookings" />
            <TrendRow month="Feb" revenue="$42,000" bookings="220 bookings" />
            <TrendRow month="Mar" revenue="$38,000" bookings="195 bookings" />
            <TrendRow month="Apr" revenue="$45,000" bookings="240 bookings" />
            <TrendRow month="May" revenue="$52,000" bookings="280 bookings" />
          </View>
        </View>

        {/* Most Popular Events */}
        <View style={styles.popularSection}>
          <Text style={styles.sectionTitle}>Most Popular Events</Text>
          <View style={styles.popularList}>
            <PopularEventRow name="Weekly Tournaments" metric="85% attendance" />
            <PopularEventRow name="Private Lessons" metric="78% booking rate" />
            <PopularEventRow name="Corporate Events" metric="92% satisfaction" />
          </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  trendSection: {
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
    marginBottom: 20,
  },
  trendTable: {
    gap: 12,
  },
  trendHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  trendHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  trendRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  trendMonth: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  trendRevenue: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  trendBookings: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
  },
  popularSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  popularList: {
    gap: 16,
  },
  popularEventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  eventName: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  eventMetric: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  X,
  CreditCard,
  DollarSign,
  Smartphone,
  User,
  Star,
  ArrowRight
} from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

interface LessonForm {
  lessonType: string;
  instructor: string;
  date: string;
  time: string;
  notes: string;
}

interface Instructor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rate: number;
  rating: number;
  about: string;
  image?: string;
}

interface LessonType {
  id: string;
  name: string;
  description: string;
  discount?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: any;
}

const lessonTypes: LessonType[] = [
  {
    id: 'private',
    name: 'Private Lesson',
    description: 'One-on-one instruction'
  },
  {
    id: 'group',
    name: 'Group Lesson',
    description: '2-4 players (20% discount)',
    discount: '20% discount'
  },
  {
    id: 'playing',
    name: 'Playing Lesson',
    description: 'On-course instruction'
  }
];

const instructors: Instructor[] = [
  {
    id: 'ahmed',
    name: 'Ahmed Hassan',
    specialty: 'Full Swing & Short Game',
    experience: '15 years',
    rate: 800,
    rating: 4.9,
    about: 'Former Egyptian National Team player with expertise in all aspects of the game.'
  },
  {
    id: 'sarah',
    name: 'Sarah Mohamed',
    specialty: 'Putting & Mental Game',
    experience: '12 years',
    rate: 700,
    rating: 4.8,
    about: 'Sports psychology certified with focus on course management and mental toughness.'
  },
  {
    id: 'omar',
    name: 'Omar Ali',
    specialty: 'Junior Development',
    experience: '10 years',
    rate: 600,
    rating: 4.7,
    about: 'Specialized in youth development with proven track record of developing young talent.'
  }
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
];

const paymentMethods: PaymentMethod[] = [
  {
    id: 'visa',
    name: 'Visa Card',
    description: 'Pay with your Visa credit or debit card',
    icon: CreditCard
  },
  {
    id: 'cash',
    name: 'Cash',
    description: 'Pay with cash at the club',
    icon: DollarSign
  },
  {
    id: 'apple',
    name: 'Apple Pay',
    description: 'Pay securely with Apple Pay',
    icon: Smartphone
  }
];

const upcomingLessons = [
  {
    id: 1,
    type: 'Private Lesson',
    instructor: 'Ahmed Hassan',
    date: 'Tomorrow, 10:00 AM',
    status: 'confirmed'
  },
  {
    id: 2,
    type: 'Group Lesson',
    instructor: 'Sarah Mohamed',
    date: 'June 5, 2025, 2:00 PM',
    status: 'confirmed'
  }
];

const Header = () => (
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>NG</Text>
          </View>
          <View style={styles.clubNameContainer}>
            <Text style={styles.clubName}>New Giza Golf Club</Text>
          </View>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.headerButtonText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => router.replace('/welcome')}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
);

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <View style={styles.stepIndicator}>
    {Array.from({ length: totalSteps }).map((_, index) => (
      <View key={index} style={styles.stepContainer}>
        <View style={[
          styles.stepCircle,
          index + 1 <= currentStep && styles.stepCircleActive
        ]}>
          <Text style={[
            styles.stepNumber,
            index + 1 <= currentStep && styles.stepNumberActive
          ]}>
            {index + 1}
                  </Text>
              </View>
        {index < totalSteps - 1 && (
          <View style={[
            styles.stepLine,
            index + 1 < currentStep && styles.stepLineActive
          ]} />
        )}
                </View>
              ))}
            </View>
);

const LessonTypeCard = ({ 
  type, 
  selected, 
  onSelect 
}: { 
  type: LessonType; 
  selected: boolean; 
  onSelect: () => void;
}) => (
                <TouchableOpacity
    style={[styles.lessonTypeCard, selected && styles.lessonTypeCardSelected]}
    onPress={onSelect}
  >
    <View style={styles.lessonTypeContent}>
      <Text style={[styles.lessonTypeName, selected && styles.lessonTypeNameSelected]}>
                      {type.name}
                    </Text>
      <Text style={[styles.lessonTypeDescription, selected && styles.lessonTypeDescriptionSelected]}>
                      {type.description}
                    </Text>
                    {type.discount && (
                      <Text style={styles.discountText}>{type.discount}</Text>
                    )}
                  </View>
    {selected && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
);

const InstructorCard = ({ 
  instructor, 
  selected, 
  onSelect 
}: { 
  instructor: Instructor; 
  selected: boolean; 
  onSelect: () => void;
}) => (
                <TouchableOpacity
    style={[styles.instructorCard, selected && styles.instructorCardSelected]}
    onPress={onSelect}
  >
    <View style={styles.instructorContent}>
      <View style={styles.instructorAvatar}>
                      <User size={24} color="#2D5838" />
                    </View>
      <View style={styles.instructorInfo}>
        <Text style={[styles.instructorName, selected && styles.instructorNameSelected]}>
                        {instructor.name}
                      </Text>
        <Text style={[styles.instructorSpecialty, selected && styles.instructorSpecialtySelected]}>
                        {instructor.specialty}
                      </Text>
        <View style={styles.instructorDetails}>
          <Text style={styles.instructorDetail}>Experience: {instructor.experience}</Text>
          <Text style={styles.instructorDetail}>Rate: EGP {instructor.rate}/hour</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#D4AF37" fill="#D4AF37" />
            <Text style={styles.ratingText}>{instructor.rating}/5.0</Text>
                    </View>
                  </View>
      </View>
    </View>
    {selected && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
);

const DateSelector = ({ 
  selectedDate, 
  onSelect 
}: { 
  selectedDate: string; 
  onSelect: (date: string) => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;
      
      days.push({
        date: date.getDate(),
        fullDate: date,
        isCurrentMonth,
        isToday,
        isPast,
        dateString: date.toISOString().split('T')[0]
      });
    }
    
    return days;
  };

  return (
    <View style={styles.dateSelector}>
            <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={() => {
          const newMonth = new Date(currentMonth);
          newMonth.setMonth(currentMonth.getMonth() - 1);
          setCurrentMonth(newMonth);
        }}>
                <ChevronLeft size={24} color="#2D5838" />
              </TouchableOpacity>
              <Text style={styles.monthYear}>
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </Text>
        <TouchableOpacity onPress={() => {
          const newMonth = new Date(currentMonth);
          newMonth.setMonth(currentMonth.getMonth() + 1);
          setCurrentMonth(newMonth);
        }}>
          <ChevronLeft size={24} color="#2D5838" style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>
            </View>

              <View style={styles.weekDays}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <Text key={day} style={styles.weekDay}>{day}</Text>
                ))}
              </View>

              <View style={styles.calendarGrid}>
                {generateCalendarDays().map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.calendarDay,
                      !day.isCurrentMonth && styles.calendarDayInactive,
                      day.isToday && styles.calendarDayToday,
                      day.isPast && styles.calendarDayPast,
              selectedDate === day.dateString && styles.calendarDaySelected
                    ]}
                    onPress={() => {
                      if (!day.isPast && day.isCurrentMonth) {
                onSelect(day.dateString);
                      }
                    }}
                    disabled={day.isPast}
                  >
                    <Text style={[
                      styles.calendarDayText,
                      !day.isCurrentMonth && styles.calendarDayTextInactive,
                      day.isToday && styles.calendarDayTextToday,
                      day.isPast && styles.calendarDayTextPast,
              selectedDate === day.dateString && styles.calendarDayTextSelected
                    ]}>
                      {day.date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
  );
};

const TimeSelector = ({ 
  selectedTime, 
  onSelect 
}: { 
  selectedTime: string; 
  onSelect: (time: string) => void;
}) => (
  <View style={styles.timeSelector}>
            <ScrollView style={styles.timeList}>
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
          style={[styles.timeOption, selectedTime === time && styles.timeOptionSelected]}
          onPress={() => onSelect(time)}
        >
          <Text style={[styles.timeOptionText, selectedTime === time && styles.timeOptionTextSelected]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
);

const BookingSummary = ({ form }: { form: LessonForm }) => {
  const selectedLessonType = lessonTypes.find(t => t.id === form.lessonType);
  const selectedInstructor = instructors.find(i => i.id === form.instructor);
  
  const calculatePrice = () => {
    if (!selectedInstructor) return 0;
    let price = selectedInstructor.rate;
    if (selectedLessonType?.id === 'group') {
      price = Math.round(price * 0.8);
    }
    return price;
  };

                return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Booking Summary</Text>
      
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Lesson Type:</Text>
        <Text style={styles.summaryValue}>{selectedLessonType?.name}</Text>
              </View>
      
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Instructor:</Text>
        <Text style={styles.summaryValue}>{selectedInstructor?.name}</Text>
              </View>
      
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date:</Text>
        <Text style={styles.summaryValue}>
          {new Date(form.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
              </View>
      
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Time:</Text>
                <Text style={styles.summaryValue}>{form.time}</Text>
              </View>
      
      {selectedLessonType?.id === 'group' && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discount:</Text>
                  <Text style={styles.discountValue}>-20%</Text>
                </View>
              )}
      
              <View style={[styles.summaryRow, styles.summaryTotal]}>
                <Text style={styles.summaryTotalLabel}>Total:</Text>
                <Text style={styles.summaryTotalValue}>EGP {calculatePrice()}</Text>
              </View>
            </View>
  );
};

export default function BookLessonScreen() {
  const [form, setForm] = useState<LessonForm>({
    lessonType: '',
    instructor: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleBooking = () => {
    if (!form.lessonType || !form.instructor || !form.date || !form.time) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const selectedLessonType = lessonTypes.find(t => t.id === form.lessonType);
    const selectedInstructor = instructors.find(i => i.id === form.instructor);
    
    Alert.alert(
      'Lesson Booked!', 
      `Your ${selectedLessonType?.name.toLowerCase()} with ${selectedInstructor?.name} has been booked for ${new Date(form.date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })} at ${form.time}`,
      [
        {
          text: 'OK',
          onPress: () => router.back()
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Book Golf Lesson</Text>
        <Text style={styles.pageSubtitle}>Improve your game with our professional instructors</Text>

        <View style={styles.bookingForm}>
          {/* Lesson Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lesson Type</Text>
            <View style={styles.lessonTypesList}>
              {lessonTypes.map((type) => (
                <LessonTypeCard
                  key={type.id}
                  type={type}
                  selected={form.lessonType === type.id}
                  onSelect={() => setForm({ ...form, lessonType: type.id })}
                />
              ))}
            </View>
          </View>

          {/* Instructor Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Instructor</Text>
            <View style={styles.instructorsList}>
              {instructors.map((instructor) => (
                <InstructorCard
                  key={instructor.id}
                  instructor={instructor}
                  selected={form.instructor === instructor.id}
                  onSelect={() => setForm({ ...form, instructor: instructor.id })}
                />
              ))}
            </View>
          </View>

          {/* Date Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <DateSelector
              selectedDate={form.date}
              onSelect={(date) => setForm({ ...form, date })}
            />
          </View>

          {/* Time Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Time</Text>
            <TimeSelector
              selectedTime={form.time}
              onSelect={(time) => setForm({ ...form, time })}
            />
          </View>

          {/* Booking Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Summary</Text>
            <BookingSummary form={form} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
              <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
              >
          <Text style={styles.backButtonText}>Cancel</Text>
              </TouchableOpacity>
        
              <TouchableOpacity 
          style={[styles.bookButton, !form.lessonType || !form.instructor || !form.date || !form.time ? styles.bookButtonDisabled : null]}
          onPress={handleBooking}
          disabled={!form.lessonType || !form.instructor || !form.date || !form.time}
              >
          <Text style={styles.bookButtonText}>Book Lesson</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2D5838',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  clubNameContainer: {
    flex: 1,
  },
  clubName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  headerButtonText: {
    color: '#6B7280',
    fontWeight: '500',
    fontSize: 12,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: '#6B7280',
    fontWeight: '500',
    fontSize: 12,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    borderColor: '#2D5838',
    backgroundColor: '#2D5838',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  stepNumberActive: {
    color: '#FFFFFF',
  },
  stepLine: {
    width: 60,
    height: 2,
    backgroundColor: '#D1D5DB',
  },
  stepLineActive: {
    backgroundColor: '#2D5838',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  lessonTypesList: {
    gap: 16,
  },
  lessonTypeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  lessonTypeCardSelected: {
    borderColor: '#2D5838',
    backgroundColor: '#F0FDF4',
  },
  lessonTypeContent: {
    flex: 1,
  },
  lessonTypeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  lessonTypeNameSelected: {
    color: '#2D5838',
  },
  lessonTypeDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  lessonTypeDescriptionSelected: {
    color: '#2D5838',
  },
  discountText: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '600',
    marginTop: 4,
  },
  instructorsList: {
    gap: 16,
  },
  instructorCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  instructorCardSelected: {
    borderColor: '#2D5838',
    backgroundColor: '#F0FDF4',
  },
  instructorContent: {
    flexDirection: 'row',
    gap: 16,
  },
  instructorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  instructorNameSelected: {
    color: '#2D5838',
  },
  instructorSpecialty: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  instructorSpecialtySelected: {
    color: '#2D5838',
  },
  instructorDetails: {
    gap: 4,
  },
  instructorDetail: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  dateSelector: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDay: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    width: 40,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  calendarDayInactive: {
    opacity: 0.3,
  },
  calendarDayToday: {
    backgroundColor: '#FEF3C7',
  },
  calendarDayPast: {
    opacity: 0.3,
  },
  calendarDaySelected: {
    backgroundColor: '#2D5838',
  },
  calendarDayText: {
    fontSize: 16,
    color: '#1F2937',
  },
  calendarDayTextInactive: {
    color: '#9CA3AF',
  },
  calendarDayTextToday: {
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  calendarDayTextPast: {
    color: '#D1D5DB',
  },
  calendarDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  timeSelector: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },
  timeList: {
    maxHeight: 300,
  },
  timeOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  timeOptionSelected: {
    backgroundColor: '#F0FDF4',
  },
  timeOptionText: {
    fontSize: 16,
    color: '#1F2937',
  },
  timeOptionTextSelected: {
    color: '#2D5838',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  discountValue: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    marginTop: 8,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D5838',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  backButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#2D5838',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2D5838',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bookingForm: {
    gap: 32,
    paddingBottom: 32,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
});
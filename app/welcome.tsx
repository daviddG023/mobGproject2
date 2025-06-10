import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { X, Calendar, User, Clock, ChevronLeft, ChevronRight } from 'lucide-react-native';

interface AuthForm {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  handicap?: string;
}

const { width: screenWidth } = Dimensions.get('window');

const heroSlides = [
  {
    id: 1,
    title: 'New Giza Golf Club',
    subtitle: 'Experience Premium Golf Excellence',
    image: 'https://images.pexels.com/photos/1325735/pexels-photo-1325735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Championship 18-hole course with stunning views'
  },
  {
    id: 2,
    title: 'World-Class Facilities',
    subtitle: 'State-of-the-Art Golf Experience',
    image: 'https://images.pexels.com/photos/1325673/pexels-photo-1325673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Professional training facilities and premium amenities'
  },
  {
    id: 3,
    title: 'Exclusive Membership',
    subtitle: 'Join Our Elite Golf Community',
    image: 'https://images.pexels.com/photos/1325674/pexels-photo-1325674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Connect with fellow golf enthusiasts and professionals'
  }
];

const serviceSlides = [
  [
    {
      icon: Calendar,
      title: 'Tee Time Booking',
      description: 'Reserve your preferred tee times with flexible match visibility options. Create open matches or private sessions.',
      color: '#6B7280'
    },
    {
      icon: User,
      title: 'Private Lessons',
      description: 'Book personalized lessons with our professional instructors. View bios, availability, and pricing.',
      color: '#D4AF37'
    }
  ],
  [
    {
      icon: Clock,
      title: 'Tournaments',
      description: 'Register for weekly tournaments and special events. View participants and tournament details.',
      color: '#6B7280'
    },
    {
      icon: User,
      title: 'Pro Shop',
      description: 'Browse our premium golf equipment and apparel. Exclusive member discounts available.',
      color: '#2D5838'
    }
  ]
];

export default function WelcomeScreen() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState<AuthForm>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    handicap: '',
  });

  // Hero carousel state
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroScrollRef = useRef<ScrollView>(null);

  // Services carousel state
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const serviceScrollRef = useRef<ScrollView>(null);

  // Auto-slide for hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => {
        const next = (prev + 1) % heroSlides.length;
        heroScrollRef.current?.scrollTo({
          x: next * screenWidth,
          animated: true,
        });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleAuth = () => {
    // Simple validation
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (authMode === 'register' && (!form.firstName || !form.lastName || !form.phone)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Check for admin credentials
    if (form.email === 'admin@gmail.com' && form.password === 'admin123') {
      setShowAuthModal(false);
      router.replace('/(admin)/event-management');
      return;
    }

    // Simulate successful authentication for regular users
    setShowAuthModal(false);
    router.replace('/(tabs)');
  };

  const resetForm = () => {
    setForm({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      handicap: '',
    });
  };

  const switchAuthMode = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    resetForm();
  };

  const handleHeroScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentHeroSlide(slideIndex);
  };

  const handleServiceScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentServiceSlide(slideIndex);
  };

  const goToHeroSlide = (index: number) => {
    setCurrentHeroSlide(index);
    heroScrollRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  const goToServiceSlide = (index: number) => {
    setCurrentServiceSlide(index);
    serviceScrollRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>NG</Text>
          </View>
          <Text style={styles.clubName}>New Giza Golf Club</Text>
        </View>
        <TouchableOpacity
          style={styles.memberLoginButton}
          onPress={() => setShowAuthModal(true)}
        >
          <Text style={styles.memberLoginText}>Member Login</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Carousel Section */}
      <View style={styles.heroContainer}>
        <ScrollView
          ref={heroScrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleHeroScroll}
          style={styles.heroScrollView}
        >
          {heroSlides.map((slide) => (
            <View key={slide.id} style={styles.heroSlide}>
              <Image source={{ uri: slide.image }} style={styles.heroImage} />
              <View style={styles.heroOverlay}>
                <View style={styles.heroContent}>
                  <Text style={styles.heroTitle}>{slide.title}</Text>
                  <Text style={styles.heroSubtitle}>{slide.subtitle}</Text>
                  <Text style={styles.heroDescription}>{slide.description}</Text>
                  <TouchableOpacity
                    style={styles.accessPortalButton}
                    onPress={() => setShowAuthModal(true)}
                  >
                    <Text style={styles.accessPortalText}>Access Member Portal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Hero Pagination Dots */}
        <View style={styles.paginationContainer}>
          {heroSlides.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                currentHeroSlide === index && styles.paginationDotActive,
              ]}
              onPress={() => goToHeroSlide(index)}
            />
          ))}
        </View>

        {/* Hero Navigation Arrows */}
        <TouchableOpacity
          style={[styles.navArrow, styles.navArrowLeft]}
          onPress={() => goToHeroSlide(currentHeroSlide > 0 ? currentHeroSlide - 1 : heroSlides.length - 1)}
        >
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navArrow, styles.navArrowRight]}
          onPress={() => goToHeroSlide((currentHeroSlide + 1) % heroSlides.length)}
        >
          <ChevronRight size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Services Section */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Member Services</Text>
        
        <View style={styles.servicesContainer}>
          <ScrollView
            ref={serviceScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleServiceScroll}
            style={styles.servicesScrollView}
          >
            {serviceSlides.map((slideServices, slideIndex) => (
              <View key={slideIndex} style={styles.servicesSlide}>
                {slideServices.map((service, serviceIndex) => {
                  const IconComponent = service.icon;
                  return (
                    <View key={serviceIndex} style={styles.serviceCard}>
                      <IconComponent size={40} color={service.color} />
                      <Text style={styles.serviceTitle}>{service.title}</Text>
                      <Text style={styles.serviceDescription}>{service.description}</Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </ScrollView>

          {/* Services Pagination */}
          <View style={styles.servicesPaginationContainer}>
            {serviceSlides.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.servicesPaginationDot,
                  currentServiceSlide === index && styles.servicesPaginationDotActive,
                ]}
                onPress={() => goToServiceSlide(index)}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Premium Section */}
      <View style={styles.premiumSection}>
        <Text style={styles.premiumTitle}>Premium Golf Experience</Text>
        <Text style={styles.premiumDescription}>
          New Giza Golf Club offers an unparalleled golfing experience with world-class
          facilities, professional instruction, and exclusive member services. Join our
          community of golf enthusiasts and elevate your game to new heights.
        </Text>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => setShowAuthModal(true)}
        >
          <Text style={styles.joinButtonText}>Join Our Community</Text>
        </TouchableOpacity>
      </View>

      {/* Auth Modal */}
      <Modal
        visible={showAuthModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAuthModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowAuthModal(false)}
                >
                  <X size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalTitle}>Member Portal</Text>
              <Text style={styles.modalSubtitle}>Access your New Giza Golf Club account</Text>

              {/* Auth Mode Tabs */}
              <View style={styles.authTabs}>
                <TouchableOpacity
                  style={[
                    styles.authTab,
                    authMode === 'login' && styles.authTabActive,
                  ]}
                  onPress={() => switchAuthMode('login')}
                >
                  <Text
                    style={[
                      styles.authTabText,
                      authMode === 'login' && styles.authTabTextActive,
                    ]}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.authTab,
                    authMode === 'register' && styles.authTabActive,
                  ]}
                  onPress={() => switchAuthMode('register')}
                >
                  <Text
                    style={[
                      styles.authTabText,
                      authMode === 'register' && styles.authTabTextActive,
                    ]}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Form */}
              {authMode === 'login' && (
                <View style={styles.form}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      style={styles.input}
                      value={form.email}
                      onChangeText={(text) => setForm({ ...form, email: text })}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                      style={styles.input}
                      value={form.password}
                      onChangeText={(text) => setForm({ ...form, password: text })}
                      secureTextEntry
                    />
                  </View>
                  <TouchableOpacity style={styles.submitButton} onPress={handleAuth}>
                    <Text style={styles.submitButtonText}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Register Form */}
              {authMode === 'register' && (
                <View style={styles.form}>
                  <Text style={styles.formTitle}>Create Account</Text>
                  <Text style={styles.formSubtitle}>Join New Giza Golf Club</Text>

                  <View style={styles.row}>
                    <View style={[styles.inputGroup, styles.halfWidth]}>
                      <Text style={styles.inputLabel}>First Name</Text>
                      <TextInput
                        style={styles.input}
                        value={form.firstName}
                        onChangeText={(text) => setForm({ ...form, firstName: text })}
                      />
                    </View>
                    <View style={[styles.inputGroup, styles.halfWidth]}>
                      <Text style={styles.inputLabel}>Last Name</Text>
                      <TextInput
                        style={styles.input}
                        value={form.lastName}
                        onChangeText={(text) => setForm({ ...form, lastName: text })}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      style={styles.input}
                      value={form.email}
                      onChangeText={(text) => setForm({ ...form, email: text })}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      value={form.phone}
                      onChangeText={(text) => setForm({ ...form, phone: text })}
                      keyboardType="phone-pad"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Handicap</Text>
                    <TextInput
                      style={styles.input}
                      value={form.handicap}
                      onChangeText={(text) => setForm({ ...form, handicap: text })}
                      keyboardType="numeric"
                      placeholder="Optional"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                      style={styles.input}
                      value={form.password}
                      onChangeText={(text) => setForm({ ...form, password: text })}
                      secureTextEntry
                    />
                  </View>

                  <TouchableOpacity style={styles.submitButton} onPress={handleAuth}>
                    <Text style={styles.submitButtonText}>Create Account</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    zIndex: 10,
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
  memberLoginButton: {
    backgroundColor: '#2D5838',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  memberLoginText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  heroContainer: {
    position: 'relative',
    height: 400,
  },
  heroScrollView: {
    flex: 1,
  },
  heroSlide: {
    width: screenWidth,
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(45, 88, 56, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.9,
  },
  heroDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.8,
  },
  accessPortalButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  accessPortalText: {
    color: '#1F2937',
    fontWeight: '600',
    fontSize: 16,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#D4AF37',
    width: 24,
  },
  navArrow: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  navArrowLeft: {
    left: 20,
  },
  navArrowRight: {
    right: 20,
  },
  servicesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 32,
  },
  servicesContainer: {
    position: 'relative',
  },
  servicesScrollView: {
    flex: 1,
  },
  servicesSlide: {
    width: screenWidth - 40,
    gap: 16,
  },
  serviceCard: {
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
    elevation: 3,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  servicesPaginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  servicesPaginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  servicesPaginationDotActive: {
    backgroundColor: '#2D5838',
    width: 24,
  },
  premiumSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  premiumDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  joinButton: {
    backgroundColor: '#2D5838',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
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
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
  },
  modalHeader: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  authTabs: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  authTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  authTabActive: {
    backgroundColor: '#2D5838',
  },
  authTabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  authTabTextActive: {
    color: '#FFFFFF',
  },
  form: {
    gap: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#D4AF37',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  halfWidth: {
    flex: 0.5,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#2D5838',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
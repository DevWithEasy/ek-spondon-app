import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { 
  MaterialIcons, 
  Feather,
  Ionicons,
  FontAwesome5 
} from '@expo/vector-icons';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'expo-router';

const Reports = () => {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [reports, setReports] = useState([]);

  // Mock data - replace with API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setReports([
        {
          id: 1,
          title: "সাপ্তাহিক রক্তদান রিপোর্ট",
          type: "summary",
          date: "১৫ জুন ২০২৩",
          status: "generated",
          downloads: 24,
          icon: "bar-chart"
        },
        {
          id: 2,
          title: "রক্তের গ্রুপ ভিত্তিক চাহিদা বিশ্লেষণ",
          type: "analysis",
          date: "১০ জুন ২০২৩",
          status: "pending",
          downloads: 8,
          icon: "pie-chart"
        },
        {
          id: 3,
          title: "মাসিক ডোনার রিপোর্ট",
          type: "donor",
          date: "১ জুন ২০২৩",
          status: "generated",
          downloads: 42,
          icon: "users"
        },
        {
          id: 4,
          title: "জরুরী রক্তের চাহিদা রিপোর্ট",
          type: "urgent",
          date: "২৮ মে ২০২৩",
          status: "generated",
          downloads: 36,
          icon: "alert-triangle"
        },
        {
          id: 5,
          title: "বছর শেষের সারাংশ রিপোর্ট",
          type: "annual",
          date: "৩১ ডিসেম্বর ২০২২",
          status: "generated",
          downloads: 15,
          icon: "file-text"
        }
      ]);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filters = [
    { id: 'all', label: 'সকল' },
    { id: 'summary', label: 'সারাংশ' },
    { id: 'donor', label: 'ডোনার' },
    { id: 'urgent', label: 'জরুরী' },
    { id: 'analysis', label: 'বিশ্লেষণ' }
  ];

  const filteredReports = selectedFilter === 'all' 
    ? reports 
    : reports.filter(report => report.type === selectedFilter);

  const renderReportItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.reportCard}
      onPress={() => router.push(`/admin/reports/${item.id}`)}
    >
      <View style={styles.reportIcon}>
        <Feather name={item.icon} size={24} color="#d32f2f" />
      </View>
      
      <View style={styles.reportDetails}>
        <Text style={styles.reportTitle}>{item.title}</Text>
        <Text style={styles.reportDate}>
          <MaterialIcons name="date-range" size={14} color="#666" /> {item.date}
        </Text>
        
        <View style={styles.reportMeta}>
          <View style={styles.metaItem}>
            <Feather name="download" size={14} color="#666" />
            <Text style={styles.metaText}>{item.downloads} ডাউনলোড</Text>
          </View>
          
          <View style={[
            styles.statusBadge,
            item.status === 'generated' ? styles.generatedStatus : styles.pendingStatus
          ]}>
            <Text style={styles.statusText}>
              {item.status === 'generated' ? 'প্রস্তুত' : 'প্রক্রিয়াধীন'}
            </Text>
          </View>
        </View>
      </View>
      
      <MaterialIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );

  if (isLoggedIn === false) {
    router.replace("/signin");
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d32f2f" />
        <Text style={styles.loadingText}>রিপোর্ট লোড হচ্ছে...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.generateButton}
          onPress={() => router.push('/admin/reports/generate')}
        >
          <Feather name="plus" size={18} color="#fff" />
          <Text style={styles.generateButtonText}>নতুন রিপোর্ট</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.activeFilter
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.activeFilterText
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Reports List */}
      {filteredReports.length > 0 ? (
        <FlatList
          data={filteredReports}
          renderItem={renderReportItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <FontAwesome5 name="file-alt" size={50} color="#d32f2f" />
          <Text style={styles.emptyText}>কোন রিপোর্ট পাওয়া যায়নি</Text>
        </View>
      )}

      {/* Statistics Summary */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>পরিসংখ্যান</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{reports.length}</Text>
            <Text style={styles.statLabel}>মোট রিপোর্ট</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {reports.filter(r => r.status === 'generated').length}
            </Text>
            <Text style={styles.statLabel}>প্রস্তুত</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {reports.reduce((sum, report) => sum + report.downloads, 0)}
            </Text>
            <Text style={styles.statLabel}>মোট ডাউনলোড</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'HindSiliguri_500Medium',
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'HindSiliguri_600SemiBold',
    color: '#333',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  generateButtonText: {
    color: '#fff',
    fontFamily: 'HindSiliguri_500Medium',
    marginLeft: 8,
    fontSize: 14,
  },
  filterContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#d32f2f',
  },
  filterText: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  listContainer: {
    padding: 15,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reportIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  reportDetails: {
    flex: 1,
  },
  reportTitle: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  reportDate: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  reportMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  metaText: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  generatedStatus: {
    backgroundColor: '#E8F5E9',
  },
  pendingStatus: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 12,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 15,
  },
  emptyText: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 16,
    color: '#666',
    marginTop: 15,
  },
  statsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 24,
    color: '#d32f2f',
    marginBottom: 5,
  },
  statLabel: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 14,
    color: '#666',
  },
});

export default Reports;
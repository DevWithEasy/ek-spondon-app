import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, Pressable, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DatePickerModal = ({
  visible,
  onClose,
  onDateConfirm,
  initialDate,
}) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Refs for scroll views
  const dayScrollRef = useRef(null);
  const monthScrollRef = useRef(null);
  const yearScrollRef = useRef(null);
  
  // Flag to track initial scroll
  const [hasScrolled, setHasScrolled] = useState(false);

  // Set initial values and scroll to them
  useEffect(() => {
    if (visible && initialDate && !hasScrolled) {
      const day = initialDate.getDate();
      const month = initialDate.getMonth() + 1;
      const year = initialDate.getFullYear();
      
      setSelectedDay(day.toString());
      setSelectedMonth(month.toString());
      setSelectedYear(year.toString());
      
      // Scroll to initial positions after a small delay
      setTimeout(() => {
        if (dayScrollRef.current) {
          dayScrollRef.current.scrollTo({ y: (day - 1) * 44, animated: false });
        }
        if (monthScrollRef.current) {
          monthScrollRef.current.scrollTo({ y: (month - 1) * 44, animated: false });
        }
        if (yearScrollRef.current) {
          const currentYear = new Date().getFullYear();
          const yearIndex = currentYear - year;
          yearScrollRef.current.scrollTo({ y: yearIndex * 44, animated: false });
        }
        setHasScrolled(true);
      }, 100);
    }
    
    if (!visible) {
      setHasScrolled(false);
    }
  }, [visible, initialDate]);

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleConfirm = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      const newDate = new Date(
        parseInt(selectedYear),
        parseInt(selectedMonth) - 1,
        parseInt(selectedDay)
      );
      onDateConfirm(newDate);
      onClose();
    }
  };

  const getFormattedDate = () => {
    if (!selectedDay || !selectedMonth || !selectedYear) {
      return "তারিখ নির্বাচন করুন";
    }
    
    const monthNames = [
      'জানুয়ারী', 'ফেব্রুয়ারী', 'মার্চ', 'এপ্রিল', 
      'মে', 'জুন', 'জুলাই', 'আগস্ট', 
      'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    
    return `${selectedDay} ${monthNames[parseInt(selectedMonth) - 1]}, ${selectedYear}`;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>জন্ম তারিখ নির্বাচন করুন</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#666" />
            </Pressable>
          </View>
          
          <View style={styles.selectedDateContainer}>
            <MaterialIcons name="calendar-today" size={24} color="#d32f2f" />
            <Text style={styles.selectedDateText}>
              {getFormattedDate()}
            </Text>
          </View>
          
          <View style={styles.datePickerRow}>
            {/* Day Picker */}
            <View style={styles.datePickerColumn}>
              <Text style={styles.datePickerLabel}>দিন</Text>
              <ScrollView 
                ref={dayScrollRef}
                style={styles.datePickerScroll}
                showsVerticalScrollIndicator={false}
                snapToInterval={44} // Height of each option
                decelerationRate="fast"
              >
                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                  <Pressable 
                    key={day} 
                    style={[
                      styles.dateOption, 
                      selectedDay === day.toString() && styles.selectedDateOption
                    ]}
                    onPress={() => handleDayChange(day.toString())}
                  >
                    <Text style={[
                      styles.dateOptionText,
                      selectedDay === day.toString() && styles.selectedDateOptionText
                    ]}>
                      {day}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
            
            {/* Month Picker */}
            <View style={styles.datePickerColumn}>
              <Text style={styles.datePickerLabel}>মাস</Text>
              <ScrollView 
                ref={monthScrollRef}
                style={styles.datePickerScroll}
                showsVerticalScrollIndicator={false}
                snapToInterval={44}
                decelerationRate="fast"
              >
                {[
                  'জানুয়ারী', 'ফেব্রুয়ারী', 'মার্চ', 'এপ্রিল', 
                  'মে', 'জুন', 'জুলাই', 'আগস্ট', 
                  'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
                ].map((month, index) => (
                  <Pressable 
                    key={month} 
                    style={[
                      styles.dateOption, 
                      selectedMonth === (index + 1).toString() && styles.selectedDateOption
                    ]}
                    onPress={() => handleMonthChange((index + 1).toString())}
                  >
                    <Text style={[
                      styles.dateOptionText,
                      selectedMonth === (index + 1).toString() && styles.selectedDateOptionText
                    ]}>
                      {month}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
            
            {/* Year Picker */}
            <View style={styles.datePickerColumn}>
              <Text style={styles.datePickerLabel}>বছর</Text>
              <ScrollView 
                ref={yearScrollRef}
                style={styles.datePickerScroll}
                showsVerticalScrollIndicator={false}
                snapToInterval={44}
                decelerationRate="fast"
              >
                {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                  <Pressable 
                    key={year} 
                    style={[
                      styles.dateOption, 
                      selectedYear === year.toString() && styles.selectedDateOption
                    ]}
                    onPress={() => handleYearChange(year.toString())}
                  >
                    <Text style={[
                      styles.dateOptionText,
                      selectedYear === year.toString() && styles.selectedDateOptionText
                    ]}>
                      {year}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>বাতিল</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleConfirm}
              disabled={!selectedDay || !selectedMonth || !selectedYear}
            >
              <Text style={styles.modalButtonText}>নিশ্চিত করুন</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 18,
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  selectedDateText: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  datePickerColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  datePickerLabel: {
    fontFamily: 'HindSiliguri_500Medium',
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  datePickerScroll: {
    maxHeight: 200,
  overScrollMode: 'never',
  bounces: false,
  },
dateOption: {
  padding: 10,
  marginVertical: 2,
  borderRadius: 5,
  alignItems: 'center',
  height: 40,
  justifyContent: 'center',
},
  selectedDateOption: {
    backgroundColor: '#d32f2f',
  },
  dateOptionText: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 14,
    color: '#333',
  },
  selectedDateOptionText: {
    color: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  confirmButton: {
    backgroundColor: '#d32f2f',
  },
  modalButtonText: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16,
    color: 'white',
  },
});

export default DatePickerModal;
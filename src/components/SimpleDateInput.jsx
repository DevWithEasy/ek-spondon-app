import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SimpleDateInput = ({ title, value, onChange, error }) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      const day = value.getDate().toString().padStart(2, '0');
      const month = (value.getMonth() + 1).toString().padStart(2, '0');
      const year = value.getFullYear();
      setDisplayValue(`${day}/${month}/${year}`);
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const handleChange = (text) => {
    // Remove all non-digit characters and limit to 8 digits (DDMMYYYY)
    const digitsOnly = text.replace(/[^\d]/g, '').substring(0, 8);
    
    let formatted = '';
    let valid = true;
    
    if (digitsOnly.length > 0) {
      // Validate day (01-31)
      const day = digitsOnly.substring(0, 2);
      if (day.length === 2) {
        const dayNum = parseInt(day);
        if (dayNum < 1 || dayNum > 31) valid = false;
      }
      
      // Validate month (01-12)
      if (digitsOnly.length >= 3) {
        const month = digitsOnly.substring(2, 4);
        if (month.length === 2) {
          const monthNum = parseInt(month);
          if (monthNum < 1 || monthNum > 12) valid = false;
        }
      }
      
      if (valid) {
        // Auto-format with slashes
        formatted = digitsOnly.substring(0, 2); // Day
        if (digitsOnly.length >= 2) {
          formatted += '/' + digitsOnly.substring(2, 4); // Month
          if (digitsOnly.length >= 4) {
            formatted += '/' + digitsOnly.substring(4, 8); // Year
          }
        }
      } else {
        // Keep previous valid value if new input is invalid
        formatted = displayValue;
      }
    }
    
    setDisplayValue(formatted);
    
    // Parse the date when complete (8 digits: DDMMYYYY)
    if (valid && digitsOnly.length === 8) {
      const day = parseInt(digitsOnly.substring(0, 2));
      const month = parseInt(digitsOnly.substring(2, 4)) - 1;
      const year = parseInt(digitsOnly.substring(4, 8));
      
      const date = new Date(year, month, day);
      if (date.getDate() === day && date.getMonth() === month) {
        onChange(date);
      } else {
        onChange(null);
      }
    } else {
      onChange(null);
    }
  };

  const clearInput = () => {
    setDisplayValue('');
    onChange(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{title} (DD/MM/YYYY)</Text>
        {displayValue ? (
          <TouchableOpacity onPress={clearInput}>
            <MaterialIcons name="clear" size={20} color="#d32f2f" />
          </TouchableOpacity>
        ) : null}
      </View>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="DD/MM/YYYY"
        placeholderTextColor="#b3b6b7"
        value={displayValue}
        onChangeText={handleChange}
        keyboardType="numeric"
        maxLength={10}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 15,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    height: 50,
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 15,
    color: '#333',
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  errorText: {
    fontFamily: 'HindSiliguri_400Regular',
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 5,
  },
});

export default SimpleDateInput;
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';


// =========================
// REUSABLE METRIC CARD
// =========================
function MetricCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricDescription}>{description}</Text>
    </View>
  );
}


// =========================
// REUSABLE QUICK ACTION
// =========================
function QuickAction({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <Pressable style={styles.actionButton}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionText}>{title}</Text>
    </Pressable>
  );
}


// =========================
// MAIN DASHBOARD
// =========================
export default function App() {
  const { width } = useWindowDimensions();

  // Changes card width depending on screen size
  const isWideScreen = width >= 600;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Welcome back!</Text>
        </View>

        <Pressable style={styles.profileButton}>
          <Text style={styles.profileText}>👤</Text>
        </Pressable>
      </View>


      {/* METRIC CARDS */}
      <Text style={styles.sectionTitle}>Overview</Text>

      <View style={styles.cardContainer}>

        <View
          style={[
            styles.cardWrapper,
            { width: isWideScreen ? '31%' : '100%' },
          ]}
        >
          <MetricCard
            title="Balance"
            value="₱12,500"
            description="Available balance"
          />
        </View>

        <View
          style={[
            styles.cardWrapper,
            { width: isWideScreen ? '31%' : '100%' },
          ]}
        >
          <MetricCard
            title="Income"
            value="₱8,200"
            description="This month"
          />
        </View>

        <View
          style={[
            styles.cardWrapper,
            { width: isWideScreen ? '31%' : '100%' },
          ]}
        >
          <MetricCard
            title="Expenses"
            value="₱4,350"
            description="This month"
          />
        </View>

      </View>


      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionsContainer}>
        <QuickAction icon="＋" title="Add" />
        <QuickAction icon="↗" title="Send" />
        <QuickAction icon="₱" title="Pay" />
      </View>


      {/* RECENT ACTIVITY */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>

      <View style={styles.activityContainer}>

        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Text>🛒</Text>
          </View>

          <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>Grocery</Text>
            <Text style={styles.activityDate}>Today, 10:30 AM</Text>
          </View>

          <Text style={styles.expense}>-₱500</Text>
        </View>


        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Text>☕</Text>
          </View>

          <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>Coffee</Text>
            <Text style={styles.activityDate}>Today, 8:15 AM</Text>
          </View>

          <Text style={styles.expense}>-₱120</Text>
        </View>


        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Text>💰</Text>
          </View>

          <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>Salary</Text>
            <Text style={styles.activityDate}>September 10</Text>
          </View>

          <Text style={styles.income}>+₱8,000</Text>
        </View>

      </View>

    </ScrollView>
  );
}


// =========================
// STYLES
// =========================
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },


  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    fontSize: 22,
  },


  // SECTION TITLES
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    marginTop: 10,
  },


  // METRIC CARDS
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  cardWrapper: {
    marginBottom: 15,
  },

  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    minHeight: 130,

    // Shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    // Shadow for Android
    elevation: 3,
  },

  metricTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },

  metricValue: {
    fontSize: 25,
    fontWeight: '700',
    color: '#111827',
  },

  metricDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 6,
  },


  // QUICK ACTIONS
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  actionButton: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    minHeight: 80,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  actionIcon: {
    fontSize: 22,
    marginBottom: 5,
  },

  actionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },


  // RECENT ACTIVITY
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
  },

  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activityInfo: {
    flex: 1,
    marginLeft: 12,
  },

  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },

  activityDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 3,
  },

  expense: {
    fontSize: 14,
    fontWeight: '600',
  },

  income: {
    fontSize: 14,
    fontWeight: '600',
  },

});
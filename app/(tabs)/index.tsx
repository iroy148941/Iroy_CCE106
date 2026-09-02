import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [isEditing, setIsEditing] = useState(true);

  // Empty profile — user provides all information
  const [profile, setProfile] = useState({
    fullName: "",
    program: "",
    biography: "",
    email: "",
    phone: "",
  });

  const [form, setForm] = useState({
    fullName: "",
    program: "",
    biography: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear the error when the user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Clear feedback message while editing
    setMessage("");
  };

  const validate = () => {
    const newErrors = {};

    // Full Name validation
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    // Program validation
    if (!form.program.trim()) {
      newErrors.program = "Program is required.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      setMessage("Please complete the required fields.");
      return;
    }

    const cleanedProfile = {
      fullName: form.fullName.trim(),
      program: form.program.trim(),
      biography: form.biography.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    setProfile(cleanedProfile);
    setForm(cleanedProfile);
    setIsEditing(false);
    setMessage("✓ Profile saved successfully!");
  };

  const handleEdit = () => {
    setForm(profile);
    setErrors({});
    setMessage("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(profile);
    setErrors({});
    setMessage("");
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Personal Profile</Text>
          <Text style={styles.subtitle}>
            Enter and manage your personal information
          </Text>
        </View>

        {/* Profile Image Placeholder */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>PHOTO</Text>
          </View>

          <Text style={styles.imageHint}>Profile Image</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.card}>
          {/* Full Name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Full Name *</Text>

            {isEditing ? (
              <>
                <TextInput
                  style={[
                    styles.input,
                    errors.fullName && styles.inputError,
                  ]}
                  value={form.fullName}
                  onChangeText={(value) =>
                    handleChange("fullName", value)
                  }
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="words"
                />

                {errors.fullName && (
                  <Text style={styles.errorText}>
                    {errors.fullName}
                  </Text>
                )}
              </>
            ) : (
              <Text style={styles.value}>{profile.fullName}</Text>
            )}
          </View>

          {/* Program */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Program *</Text>

            {isEditing ? (
              <>
                <TextInput
                  style={[
                    styles.input,
                    errors.program && styles.inputError,
                  ]}
                  value={form.program}
                  onChangeText={(value) =>
                    handleChange("program", value)
                  }
                  placeholder="Enter your program"
                  placeholderTextColor="#9CA3AF"
                />

                {errors.program && (
                  <Text style={styles.errorText}>
                    {errors.program}
                  </Text>
                )}
              </>
            ) : (
              <Text style={styles.value}>{profile.program}</Text>
            )}
          </View>

          {/* Biography */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Short Biography</Text>

            {isEditing ? (
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={form.biography}
                onChangeText={(value) =>
                  handleChange("biography", value)
                }
                placeholder="Write a short biography about yourself"
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
              />
            ) : (
              <Text style={styles.bioText}>
                {profile.biography || "No biography provided."}
              </Text>
            )}
          </View>

          {/* Contact Information */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>
              Contact Information
            </Text>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email *</Text>

              {isEditing ? (
                <>
                  <TextInput
                    style={[
                      styles.input,
                      errors.email && styles.inputError,
                    ]}
                    value={form.email}
                    onChangeText={(value) =>
                      handleChange("email", value)
                    }
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  {errors.email && (
                    <Text style={styles.errorText}>
                      {errors.email}
                    </Text>
                  )}
                </>
              ) : (
                <Text style={styles.value}>{profile.email}</Text>
              )}
            </View>

            {/* Phone */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone Number</Text>

              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={form.phone}
                  onChangeText={(value) =>
                    handleChange("phone", value)
                  }
                  placeholder="Enter your phone number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.value}>
                  {profile.phone || "No phone number provided."}
                </Text>
              )}
            </View>
          </View>

          {/* Buttons */}
          {isEditing ? (
            <View style={styles.buttonRow}>
              {profile.fullName !== "" && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelButtonText}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  profile.fullName === "" && styles.fullButton,
                ]}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <Text style={styles.saveButtonText}>
                  Save Profile
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEdit}
              activeOpacity={0.8}
            >
              <Text style={styles.editButtonText}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Feedback */}
        {message !== "" && (
          <View
            style={[
              styles.messageBox,
              message.startsWith("✓")
                ? styles.successBox
                : styles.warningBox,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.startsWith("✓")
                  ? styles.successText
                  : styles.warningText,
              ]}
            >
              {message}
            </Text>
          </View>
        )}

        {/* Saved Result */}
        {!isEditing && profile.fullName !== "" && (
          <View style={styles.savedResult}>
            <Text style={styles.savedTitle}>
              ✓ Saved Profile
            </Text>

            <Text style={styles.savedText}>
              Your information has been successfully saved
              and is displayed above.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 5,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E5E7EB",
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },

  imagePlaceholderText: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "700",
  },

  imageHint: {
    marginTop: 8,
    fontSize: 13,
    color: "#6B7280",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  fieldContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  value: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#FAFAFA",
  },

  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FFF7F7",
  },

  bioInput: {
    minHeight: 100,
  },

  bioText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4B5563",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 5,
  },

  contactSection: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 18,
    marginBottom: 5,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 5,
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 5,
  },

  cancelButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },

  saveButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginLeft: 5,
  },

  fullButton: {
    flex: 1,
    marginLeft: 0,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  editButton: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 5,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  messageBox: {
    marginTop: 15,
    padding: 14,
    borderRadius: 10,
  },

  successBox: {
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#86EFAC",
  },

  warningBox: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FCD34D",
  },

  messageText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  successText: {
    color: "#166534",
  },

  warningText: {
    color: "#92400E",
  },

  savedResult: {
    marginTop: 15,
    padding: 16,
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },

  savedTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D4ED8",
    marginBottom: 4,
  },

  savedText: {
    fontSize: 13,
    color: "#3B82F6",
    lineHeight: 19,
  },
});
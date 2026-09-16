import { useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Profile() {
  const [name, setName] = useState("Mike Airon");

  const [program, setProgram] = useState(
    "BS Information Technology"
  );

  const [error, setError] = useState("");

  const [saved, setSaved] = useState(false);

  const saveProfile = () => {
    if (name.trim() === "") {
      setError("Full Name is required.");
      setSaved(false);
      return;
    }

    setError("");
    setSaved(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjMmFVUCkL2k5zDvzijvrwtEG-m6O1bzTm5SXMb87BoA&s=10",
        }}
        style={styles.avatar}
      />

      <Text style={styles.title}>
        My Profile
      </Text>

      <Text style={styles.label}>
        Full Name
      </Text>

      <TextInput
        value={name}
        onChangeText={(text) => {
          setName(text);
          setSaved(false);
          setError("");
        }}
        placeholder="Enter your full name"
        style={styles.input}
      />

      {error !== "" && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      <Text style={styles.label}>
        Program / Course
      </Text>

      <TextInput
        value={program}
        onChangeText={(text) => {
          setProgram(text);
          setSaved(false);
        }}
        placeholder="Enter your program"
        style={styles.input}
      />

      <Pressable
        disabled={name.trim() === ""}
        onPress={saveProfile}
        style={({ pressed }) => [
          styles.button,
          name.trim() === "" &&
            styles.disabledButton,
          pressed &&
            name.trim() !== "" &&
            styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>
          Save Profile
        </Text>
      </Pressable>

      {saved && (
        <Text style={styles.success}>
          Profile saved successfully!
        </Text>
      )}

      <View style={styles.savedInfo}>
        <Text style={styles.savedTitle}>
          Saved Information
        </Text>

        <Text>Name: {name}</Text>

        <Text>Program: {program}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 25,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 10,
    padding: 13,
    marginBottom: 15,
  },

  error: {
    color: "red",
    marginTop: -8,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#222222",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  disabledButton: {
    backgroundColor: "#aaaaaa",
  },

  pressed: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },

  success: {
    color: "green",
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },

  savedInfo: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },

  savedTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
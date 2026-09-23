import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const API_URL = "https://dummyjson.com";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  // Restore session when app starts
  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const savedToken = await SecureStore.getItemAsync("authToken");

      if (savedToken) {
        setToken(savedToken);
        await fetchProfile(savedToken);
      }
    } catch (error) {
      console.log("Session restore error:", error);
    } finally {
      setCheckingSession(false);
    }
  };

  // LOGIN
  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          expiresInMins: 30,
        }),
      });

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save access token securely
      await SecureStore.setItemAsync("authToken", data.accessToken);

      setToken(data.accessToken);

      // Get protected profile
      await fetchProfile(data.accessToken);
    } catch (error: any) {
      console.log("Login error:", error);
      setError(error.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  // PROTECTED API REQUEST
  const fetchProfile = async (authToken: string) => {
    try {
      const response = await fetch(`${API_URL}/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      console.log("Profile response:", data);

      // Token expired / unauthorized
      if (response.status === 401) {
        await logout();
        setError("Your session has expired. Please login again.");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to load profile.");
      }

      setUser(data);
    } catch (error: any) {
      console.log("Profile error:", error);
      setUser(null);
      setError(error.message || "Unable to load your profile.");
    }
  };

  // LOGOUT
  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken");

    setToken(null);
    setUser(null);
    setUsername("");
    setPassword("");
    setError("");
  };

  // SESSION CHECK
  if (checkingSession) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Restoring session...
        </Text>
      </View>
    );
  }

  // PROTECTED PROFILE
  if (token && user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Student Portal</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Welcome!</Text>

          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>
            {user.firstName} {user.lastName}
          </Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{user.username}</Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>STUDENT</Text>
          </View>
        </View>

        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </Pressable>
      </View>
    );
  }

  // LOGIN SCREEN
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Portal</Text>

      <Text style={styles.subtitle}>
        Login to continue
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error !== "" && (
        <Text style={styles.error}>{error}</Text>
      )}

      <Pressable
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>LOGIN</Text>
        )}
      </Pressable>

      <Text style={styles.demoText}>
        Demo account
      </Text>

      <Text style={styles.demoCredentials}>
        Username: emilys{"\n"}
        Password: emilyspass
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f5f5f5",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutButton: {
    backgroundColor: "#b00020",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    marginVertical: 25,
    elevation: 4,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    color: "#777",
    marginTop: 12,
  },

  value: {
    fontSize: 17,
    marginTop: 3,
  },

  roleBadge: {
    alignSelf: "flex-start",
    marginTop: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#e5e5e5",
  },

  roleText: {
    fontWeight: "bold",
    fontSize: 12,
  },

  loadingText: {
    marginTop: 10,
  },

  demoText: {
    textAlign: "center",
    marginTop: 25,
    color: "#777",
  },

  demoCredentials: {
    textAlign: "center",
    marginTop: 5,
    color: "#555",
    fontSize: 13,
  },
});
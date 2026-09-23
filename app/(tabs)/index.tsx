import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Quote = {
  quote: string;
  author: string;
};

export default function QuotesApp() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://dummyjson.com/quotes/random"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }

      const data = await response.json();

      if (!data || !data.quote) {
        setQuote(null);
        setError("No quote available.");
        return;
      }

      setQuote({
        quote: data.quote,
        author: data.author,
      });
    } catch (error) {
      console.log("API Error:", error);

      setQuote(null);
      setError("Unable to load quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch quote when the app starts
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QUOTE OF THE DAY</Text>

      {/* Loading State */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Loading quote...
          </Text>
        </View>
      )}

      {/* Error State */}
      {!loading && error !== "" && (
        <View style={styles.center}>
          <Text style={styles.error}>
            {error}
          </Text>

          <Pressable
            style={styles.button}
            onPress={fetchQuote}
          >
            <Text style={styles.buttonText}>
              TRY AGAIN
            </Text>
          </Pressable>
        </View>
      )}

      {/* Success State */}
      {!loading && error === "" && quote && (
        <>
          <View style={styles.quoteCard}>
            <Text style={styles.quote}>
              "{quote.quote}"
            </Text>

            <Text style={styles.author}>
              — {quote.author}
            </Text>
          </View>

          <Pressable
            style={styles.button}
            onPress={fetchQuote}
          >
            <Text style={styles.buttonText}>
              NEW QUOTE
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },

  quoteCard: {
    width: "100%",
    padding: 25,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 4,
    marginBottom: 30,
  },

  quote: {
    fontSize: 22,
    lineHeight: 32,
    textAlign: "center",
    fontStyle: "italic",
  },

  author: {
    marginTop: 20,
    fontSize: 17,
    textAlign: "right",
    fontWeight: "600",
  },

  button: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: "#222",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
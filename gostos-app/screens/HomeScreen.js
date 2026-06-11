import React, { useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function HomeScreen({
  navigation,
  expenses,
  deleteExpense,
}) {
  const [advice, setAdvice] = useState(
    "Toque em 'Ver Conselho' para buscar uma ideia rápida da API."
  );
  const [adviceId, setAdviceId] = useState(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [adviceError, setAdviceError] = useState("");

  const total = expenses.reduce(
    (sum, item) => sum + item.value,
    0
  );

  async function handleFetchAdvice() {
    try {
      setLoadingAdvice(true);
      setAdviceError("");

      const response = await fetch(
        "https://api.adviceslip.com/advice",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Falha na requisição.");
      }

      const data = await response.json();
      setAdvice(data.slip.advice);
      setAdviceId(data.slip.id);
    } catch {
      setAdviceError("Não foi possível carregar o conselho agora.");
    } finally {
      setLoadingAdvice(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Resumo do dia</Text>
        <Text style={styles.heroSubtitle}>
          Um conselho rápido da API, sem sair da sua tela de gastos.
        </Text>

        <View style={styles.adviceCard}>
          <Text style={styles.adviceLabel}>Conselho</Text>
          <Text style={styles.adviceText}>{advice}</Text>

          {adviceId !== null ? (
            <Text style={styles.adviceMeta}>#{adviceId}</Text>
          ) : null}

          {adviceError ? (
            <Text style={styles.errorText}>{adviceError}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.adviceButton}
            onPress={handleFetchAdvice}
            disabled={loadingAdvice}
          >
            {loadingAdvice ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color="#fff" />
                <Text style={styles.adviceButtonText}>Buscando...</Text>
              </View>
            ) : (
              <Text style={styles.adviceButtonText}>Ver Conselho</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total gasto</Text>
          <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("Adicionar Gasto")
        }
      >
        <Text style={styles.buttonText}>
          + Novo Gasto
        </Text>
      </TouchableOpacity>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.description}>
                {item.description}
              </Text>

              <Text style={styles.value}>
                R$ {item.value.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteExpense(item.id)}
            >
              <Text style={styles.deleteText}>
                Excluir
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  total: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  addButton: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 14,
    marginBottom: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },

  item: {
    backgroundColor: "#e2e8f0",
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  description: {
    fontSize: 18,
    fontWeight: "bold",
  },

  value: {
    marginTop: 5,
  },

  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
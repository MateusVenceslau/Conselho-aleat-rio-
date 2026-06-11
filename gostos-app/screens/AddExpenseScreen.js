import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddExpenseScreen({
  navigation,
  addExpense,
}) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSave() {
    if (
      description.trim() === "" ||
      Number(value) <= 0
    ) {
      setError(
        "Preencha todos os campos corretamente."
      );
      return;
    }

    addExpense(description, value);

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Ex: Mercado"
      />

      <Text style={styles.label}>Valor</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        placeholder="Ex: 50"
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  label: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },

  error: {
    color: "red",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
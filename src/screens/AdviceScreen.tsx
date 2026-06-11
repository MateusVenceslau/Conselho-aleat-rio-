import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { getRandomAdvice } from "../services/adviceApi";

export default function AdviceScreen() {
  const [advice, setAdvice] = useState(
    "Um bom conselho aparece quando você desacelera o suficiente para ouvi-lo."
  );
  const [adviceId, setAdviceId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleFetchAdvice() {
    try {
      setLoading(true);
      setErrorMessage("");

      const randomAdvice = await getRandomAdvice();
      setAdvice(randomAdvice.advice);
      setAdviceId(randomAdvice.id);
    } catch {
      setErrorMessage("Falha ao buscar conselho. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.canvas}>
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />

        <View style={styles.container}>
          <View style={styles.hero}>
            <View style={styles.kickerRow}>
              <View style={styles.kickerPill}>
                <Text style={styles.kickerText}>API em tempo real</Text>
              </View>
              <Text style={styles.mutedIndex}>/{adviceId ?? "--"}</Text>
            </View>

            <Text style={styles.title}>Conselho do dia</Text>
            <Text style={styles.subtitle}>
              Um layout simples, direto e com uma leitura mais humana do que um
              bloco padrão de app.
            </Text>
          </View>

          <View style={styles.cardWrap}>
            <View style={styles.cardAccent} />
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Mensagem recebida</Text>
              <Text style={styles.adviceText}>{advice}</Text>

              <View style={styles.cardFooter}>
                <Text style={styles.cardHint}>Clique para atualizar a leitura</Text>
                {adviceId !== null ? (
                  <Text style={styles.adviceMeta}>Conselho #{adviceId}</Text>
                ) : null}
              </View>
            </View>
          </View>

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleFetchAdvice}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.buttonLoading}>
                <ActivityIndicator color="#f8fafc" />
                <Text style={styles.buttonText}>Buscando...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Ver Conselho</Text>
            )}
          </Pressable>

          <Text style={styles.footerNote}>
            Toque no botão quando quiser uma ideia curta, limpa e sem ruído.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0b1020",
  },
  canvas: {
    flex: 1,
    backgroundColor: "#0b1020",
  },
  glowTop: {
    position: "absolute",
    top: -90,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: "rgba(251, 191, 36, 0.18)",
  },
  glowBottom: {
    position: "absolute",
    left: -100,
    bottom: -90,
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: "rgba(56, 189, 248, 0.14)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 28,
    justifyContent: "center",
  },
  hero: {
    gap: 12,
    marginBottom: 20,
  },
  kickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kickerPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(15, 23, 42, 0.46)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.22)",
  },
  kickerText: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  mutedIndex: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "700",
  },
  title: {
    color: "#f8fafc",
    fontSize: 36,
    fontWeight: "900",
    lineHeight: 42,
    letterSpacing: -0.6,
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 340,
  },
  cardWrap: {
    marginBottom: 14,
  },
  cardAccent: {
    position: "absolute",
    top: 14,
    left: 14,
    right: -6,
    bottom: -8,
    borderRadius: 30,
    backgroundColor: "rgba(148, 163, 184, 0.08)",
  },
  card: {
    backgroundColor: "rgba(248, 250, 252, 0.97)",
    borderRadius: 30,
    padding: 24,
    minHeight: 236,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.2)",
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 7,
  },
  cardLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  adviceText: {
    color: "#0f172a",
    fontSize: 24,
    lineHeight: 35,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  cardFooter: {
    marginTop: 22,
    gap: 8,
  },
  cardHint: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },
  adviceMeta: {
    color: "#1d4ed8",
    fontSize: 13,
    fontWeight: "800",
  },
  error: {
    color: "#fda4af",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#f8fafc",
    borderRadius: 18,
    minHeight: 56,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  buttonLoading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  footerNote: {
    marginTop: 14,
    color: "#94a3b8",
    fontSize: 13,
    lineHeight: 19,
  },
});

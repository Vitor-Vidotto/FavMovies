import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginProps {
  setUserLoggedIn: (loggedIn: boolean) => void;
}

export function Login({ setUserLoggedIn }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log("Usuário autenticado:", userCredential.user);
      setError(null);
      setUserLoggedIn(true);
    } catch (error) {
      console.error("Erro ao autenticar o usuário:", error.message);
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Seu e-mail"
      />
      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Sua senha"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Cor de fundo preta
  },
  label: {
    fontSize: 18,
    color: "#fff", // Cor do texto branca
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc", // Cor da borda cinza claro
    borderWidth: 1,
    marginBottom: 10,
    padding: 10, // Aumentar o padding
    borderRadius: 20, // Deixar os inputs redondos
    backgroundColor: "#fff", // Cor de fundo branca
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

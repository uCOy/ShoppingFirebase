import React, { useState } from "react";

import auth from "@react-native-firebase/auth";

import { Alert } from "react-native";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  function handleSignIn() {
    auth()
      .signInWithEmailAndPassword((user), (password))
      .then(() => {
        navigation.navigate("Produtos")

      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert('Esse email já está sendo usado!')
        }

        if (error.code === "auth/user-not-found") {
          Alert.alert('Usuário não encontrado!')
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert('Formato de email invalido!')
        }

        // console.error(error);
      });
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>Monte sua lista de compra para te ajudar nas compras</Subtitle>

      <Input onChangeText={setUser} placeholder="e-mail" keyboardType="email-address" />

      <Input onChangeText={setPassword} placeholder="senha" secureTextEntry />

      <Button title="Entrar" onPress={handleSignIn} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText title="Criar minha conta" onPress={() => navigation.navigate("SignUp")} />
      </Account>
    </Container>
  );
}

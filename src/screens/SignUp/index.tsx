import React, { useState } from "react";

import auth from "@react-native-firebase/auth";

import { Alert } from "react-native";

import { Container, Title, Subtitle } from "./styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {

  const[email, setEmail] = useState("");
  const[senha, setSenha] = useState("");
  const[confirmeSenha, setConfirmeSenha] = useState("");

  const navigation = useNavigation();

  function handleSignUp() {
    if(senha === confirmeSenha) {
      auth()
        .createUserWithEmailAndPassword((email), (senha))
        .then(() => {
          navigation.navigate("SignIn");
          return Alert.alert("Conta criada com sucesso!");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Alert.alert('Esse email já está sendo usado!')
          }
  
          if (error.code === "auth/invalid-email") {
            Alert.alert('Formato de email invalido!')
          }
  
          // console.error(error);
        });
    } else {
      return Alert.alert("Senhas incorretas por favor digite as novamente!");
    }
  }

  return (
    <Container>
      <Title>Crie uma Conta</Title>
      <Subtitle>Crie sua conta e comece a organizar suas compras</Subtitle>

      <Input onChangeText={setEmail} placeholder="e-mail" keyboardType="email-address" />

      <Input onChangeText={setSenha} placeholder="senha" secureTextEntry />

      <Input onChangeText={setConfirmeSenha} placeholder="confirme sua senha" secureTextEntry />

      <Button title="Criar Conta" onPress={handleSignUp} />
    </Container>
  );
}

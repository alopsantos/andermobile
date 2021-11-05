import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Container, Form, Fields } from "./styles";
import { HeaderLayout } from "../../components/Header";
import { InputForm } from "../../components/Form/InputForm";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
} from "react-native";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import { Button } from "../../components/Form/Button";
import api from "../../services/api";
import { useAuth } from "../../hooks/auth";

interface IDepositos {
  user_id: string;
  cliente: string;
  valor: string;
  data: string;
}

const schema = Yup.object().shape({
  cliente: Yup.string().required("Nome do cliente é obrigatório!"),
  valor: Yup.number()
  .typeError("Infome um valor númerio")
  .positive("O valor não pode ser negativo!")
  .required("O valor é obrigador informar"),
  data: Yup.date()
    .required("Data do deposito ou transferencia é obrigatório!")
});
export function Depositos() {
  const { user } = useAuth();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema)});

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }
  async function handleDeposito(form: IDepositos) {
    if (category.key === "category") return Alert.alert("Selecione um banco");

    try {
      await api.post("/depositos", {
        status: 0,
        user_id: user.id,
        cliente: form.cliente,
        banco: category.key,
        data: form.data,
        valor: form.valor,
      });

      reset();
      setCategory({
        key: "banco",
        name: "Categoria",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Container>
        <HeaderLayout title="Deposito" />

        <Form>
          <Fields>
            <InputForm
              name="cliente"
              control={control}
              placeholder="Nome igual no comprovante"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.cliente && errors.cliente.message}
            />

            <InputForm
              name="valor"
              control={control}
              placeholder="Valor"
              keyboardType="numbers-and-punctuation"
              error={errors.valor && errors.valor.message}
            />
            <InputForm
              name="data"
              control={control}
              placeholder="data"
              keyboardType="numbers-and-punctuation"
              error={errors.data && errors.data.message}
            />

            <CategorySelectButton
              title={category.name}
              onPress={() => handleOpenSelectCategoryModal()}
            />
          </Fields>

          <Button onPress={handleSubmit(handleDeposito)} title="Enviar" />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => handleCloseSelectCategoryModal()}
          />
        </Modal>
      </Container>
    </KeyboardAvoidingView>
  );
}

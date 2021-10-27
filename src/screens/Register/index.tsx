import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

interface IFormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Infome um valor númerio")
    .positive("O valor não pode ser negativo!")
});

export function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionsTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: IFormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo de transação");
    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Valor"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                isActive={transactionType === "up"}
                title="Income"
                type="up"
                onPress={() => handleTransactionsTypeSelect("up")}
              />
              <TransactionTypeButton
                isActive={transactionType === "down"}
                title="Outcome"
                type="down"
                onPress={() => handleTransactionsTypeSelect("down")}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={() => handleOpenSelectCategoryModal()}
            />
          </Fields>
          <Button onPress={handleSubmit(handleRegister)} title="Enviar" />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => handleCloseSelectCategoryModal()}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}

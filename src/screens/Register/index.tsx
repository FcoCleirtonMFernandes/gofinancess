import React, { useState } from 'react';
import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Asyncstorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import { 
    Container, 
    Header, 
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const schema = yup.object().shape({
  name: yup
  .string()
  .required('Nome é obrigatório.'),

  amount: yup
  .number()
  .typeError('Informe um valor númerico.')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório.')
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { user } = useAuth();

  const [category, setCategory] = useState({
    key: 'category',
    name: 'categoria'
  });

  const navigation = useNavigation();

  const {
    control, 
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

 // const datakey = '@gofinances:transactions';

  function handleTransactionTypeSelect(type : 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação.');

    if(category.key === 'category')
      return Alert.alert('Selecione a categoria.');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    } 
    //console.log(newTransaction);

    //aplicando o async-storage - salvar registro
    try {
      const datakey = `@gofinances:transactions_user:${user.id}`;

      //recuperar a informações
      const data = await Asyncstorage.getItem(datakey);
      // formatar
      const currentData = data ? JSON.parse(data) : [];

      //salvar com os dados já existente
      const dataFormatted =[
        ...currentData,
        newTransaction
      ]

      await Asyncstorage.setItem(datakey, JSON.stringify(dataFormatted));

      //limpar campos
      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'categoria'
      });

      //apos salvar e limpar campos, redirecionar a pag listagem
      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar!");
    }
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
                    placeholder='Nome'
                    autoCapitalize='sentences'
                    autoCorrect={false}
                    error={errors.name && errors.name.message}
                  />
                  <InputForm
                    name="amount"
                    control={control}
                    placeholder='Preço'
                    keyboardType='numeric'
                    error={errors.amount && errors.amount.message}
                  />

                  <TransactionTypes>
                      <TransactionTypeButton 
                          type='up'
                          title='Income'
                          onPress={() => handleTransactionTypeSelect('positive')}
                          isActive={transactionType === 'positive'}
                      />
                      <TransactionTypeButton 
                          type='down'
                          title='Outcome'
                          onPress={() => handleTransactionTypeSelect('negative')}
                          isActive={transactionType === 'negative'}
                      />
                  </TransactionTypes>

                  <CategorySelectButton 
                      title={category.name}
                      onPress={handleOpenSelectCategoryModal}
                  />

              </Fields>

              <Button 
                  title="Enviar"
                  onPress={handleSubmit(handleRegister)}
              />

          </Form>

          <Modal visible={categoryModalOpen}>
              <CategorySelect 
                  category={category}
                  setCategory={setCategory}
                  closeSelectCategory={handleCloseSelectCategoryModal}
              />
          </Modal>
          
      </Container>
    </TouchableWithoutFeedback>
  );
}
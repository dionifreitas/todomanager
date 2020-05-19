import React, {Component} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Image,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import {createUserOnFirebaseAsync} from '../services/FirebaseApi';

const img = require('../assets/task.png');

export default class Register extends Component {
  state = {
    email: '',
    password: '',
  };
  async _createUserAsync() {
    try {
      const user = await createUserOnFirebaseAsync(
        this.state.email,
        this.state.password,
      );
      Alert.alert(
        'Usuário criado!',
        `O usuário ${user.email} foi criado com sucesso!`,
        [
          {
            text: 'Ok',
            onPress: () => {
              this.props.navigation.goBack();
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert('Erro ao criar usuário', error.message);
    }
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.topView}>
            <Image style={styles.img} source={img} />
            <Text style={styles.title}>Cadastrando de usuário</Text>
          </View>
          <View style={styles.bottomView}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              keyboardType={'email-address'}
              autoCapitalize="none"
              onChangeText={email => this.setState({email})}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}
            />
            <Button
              title="Registrar usuário"
              onPress={() => {
                this._createUserAsync();
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  topView: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
  },
  img: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    marginBottom: 20,
  },
});

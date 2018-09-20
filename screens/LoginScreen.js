import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    Dimensions,
    AsyncStorage,
    TextInput
} from 'react-native';
import { Button } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';

class LoginScreen extends React.Component
{
    render()
    {
        <View>
            <Text>Регистрация / Войти</Text>
            <Text>Введите номер телефона</Text>
            <TextInput />
            <Text>Регистрируясь / Авторизуясь в приложении вы соглашаетесь с условиями <Text>Политики конфиденциальности</Text> и <Text>Пользовательским соглашением</Text></Text>
            <Button
                large
                title='Отправить'
                color='#8bc34a'
                onPress={this.pressButton}
                style={styles.button} />
        </View>
    }
}
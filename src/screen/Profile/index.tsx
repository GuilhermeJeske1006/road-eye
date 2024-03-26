import { Component, useCallback, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    SafeAreaView,
    StatusBar,
    Button,
    ScrollView,
} from "react-native";

export default function ProfileScreen(props: { onAuth: (isAuth: boolean) => void }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [phone, setPhone] = useState('999999999');
    const [cpf, setCpf] = useState('111.111.111-00');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('joao da silva');
    const [errors, setErrors] = useState({
        email: '',
        senha: '',
        phone: '',
        cpf: '',
        passwordRequired: '',
        passwordMin: '',
        confirmPasswordMin: '',
        passwordDifferent: '',
        confirmPasswordRequired: '',
        confirmPassword: '',
        name: '',
        isEmail: '',
    
    });

    const formatCpf = (text) => {
        // Remove qualquer caracter que não seja número
        const formattedCpf = text.replace(/[^\d]/g, '');
    
        // Adiciona os pontos e o traço conforme o formato do CPF
        if (formattedCpf.length > 3 && formattedCpf.length <= 6) {
          return formattedCpf.slice(0, 3) + '.' + formattedCpf.slice(3);
        } else if (formattedCpf.length > 6 && formattedCpf.length <= 9) {
          return formattedCpf.slice(0, 3) + '.' + formattedCpf.slice(3, 6) + '.' + formattedCpf.slice(6);
        } else if (formattedCpf.length > 9) {
          return (
            formattedCpf.slice(0, 3) +
            '.' +
            formattedCpf.slice(3, 6) +
            '.' +
            formattedCpf.slice(6, 9) +
            '-' +
            formattedCpf.slice(9)
          );
        }
    
        return formattedCpf;
      };

      const formatPhoneNumber = (text) => {
        // Remove qualquer caracter que não seja número
        const formattedNumber = text.replace(/[^\d]/g, '');
    
        // Verifica o comprimento do número e aplica a máscara adequada
        if (formattedNumber.length <= 2) {
          return formattedNumber;
        } else if (formattedNumber.length <= 6) {
          return `(${formattedNumber.slice(0, 2)}) ${formattedNumber.slice(2)}`;
        } else if (formattedNumber.length <= 10) {
          return `(${formattedNumber.slice(0, 2)}) ${formattedNumber.slice(2, 6)}-${formattedNumber.slice(6)}`;
        } else {
          return `(${formattedNumber.slice(0, 2)}) ${formattedNumber.slice(2, 7)}-${formattedNumber.slice(7, 11)}`;
        }
      };

      

    const validateSubmit = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.isEmail = 'Email inválido';
        } else {
            delete errors.isEmail;
        }
        if (email === '') {
            errors.email = 'Email é obrigatório';
        } else {
            delete errors.email;
        }

        if (phone === '') {
            errors.phone = 'Telefone é obrigatório';
        } else {
            delete errors.phone;
        }
        if (cpf === '') {
            errors.cpf = 'CPF é obrigatório';
        } else {
            delete errors.cpf;
        }
        if (name === '') {
            errors.name = 'Nome é obrigatório';
        } else {
            delete errors.name;
        }
        setErrors({ ...errors, ...errors });
        if (errors.email || errors.senha || errors.phone || errors.cpf || errors.name || errors.isEmail) {
            return false;
        }
        return true;
    }

    function submit() {

        if(validateSubmit()){
            console.log(email, senha, phone, cpf, password, confirmPassword, name);
        }
        
    }

    const validatePassword = () => {
    
        if (password === '') {
            errors.passwordRequired = 'Senha é obrigatória';
        } else{
            delete errors.passwordRequired;
        }
        if (password.length < 6) {
            errors.passwordMin = 'Senha deve ter no mínimo 6 caracteres';
        }else{
            delete errors.passwordMin;
        }
    
        if (confirmPassword === '') {
            errors.confirmPasswordRequired = 'Confirmar senha é obrigatória';
        } else{
            delete errors.confirmPasswordRequired;
        }
        if (confirmPassword.length < 6) {
            errors.confirmPasswordMin = 'Confirmar senha deve ter no mínimo 6 caracteres';
        }else{
            delete errors.confirmPasswordMin;
        }
    
        if (password !== confirmPassword) {
            errors.passwordDifferent = 'Senhas não conferem';
        }else{
            delete errors.passwordDifferent;
        }
    
        setErrors({ ...errors, ...errors });

        if(errors.passwordRequired || errors.passwordMin || errors.confirmPasswordRequired || errors.confirmPasswordMin || errors.passwordDifferent){
            return false;
        }

        return true;
    
    };
    
    function submitPassword() {        
        if (validatePassword()) {
            console.log(password, 'Nova senha salva com sucesso!');
        }
    }
    
    

    return (
        <ScrollView style={{ backgroundColor: '#F2F2F2' }}>

            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, margin: 30, justifyContent: "center" }}>
                <Text style={styles.titleAdress}>
                    Dados do Perfil
                </Text>
                {
                    errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>
                }

                <TextInput
                    style={styles.input}
                    placeholder="Digite seu Nome"
                    value={name}

                    onChangeText={text => setName(text)}
                />
                {
                    errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>
                }
                {
                    errors.isEmail && <Text style={{ color: 'red' }}>{errors.isEmail}</Text>
                }
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu telefone"
                    keyboardType="numeric"
                    value={phone}

                    onChangeText={text => setPhone(formatPhoneNumber(text))}
                />
                {
                    errors.cpf && <Text style={{ color: 'red' }}>{errors.cpf}</Text>
                }
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu cpf"
                    keyboardType="numeric"
                    value={cpf}
                    onChangeText={text => setCpf(formatCpf(text))}
                />


                <TouchableOpacity
                    onPress={submit}
                    style={[styles.button, { marginTop: 30 }]}
                >
                    <Text style={styles.buttonText}>Atualizar dados</Text>
                </TouchableOpacity>


                <Text style={[styles.titleAdress, { marginTop: 60 }]}>
                    Altere a sua senha
                </Text>

                {
                    errors.passwordRequired && <Text style={{ color: 'red' }}>{errors.passwordRequired}</Text>
                }
                {
                    errors.passwordMin && <Text style={{ color: 'red' }}>{errors.passwordMin}</Text>
                }
                {
                    errors.passwordDifferent && <Text style={{ color: 'red' }}>{errors.passwordDifferent}</Text>
                }
                {
                    errors.confirmPasswordRequired && <Text style={{ color: 'red' }}>{errors.confirmPasswordRequired}</Text>
                }
                {
                    errors.confirmPasswordMin && <Text style={{ color: 'red' }}>{errors.confirmPasswordMin}</Text>
                }
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cofirme sua senha"
                    secureTextEntry
                    onChangeText={text => setConfirmPassword(text)}
                />

                <TouchableOpacity
                    onPress={submitPassword}
                    style={[styles.button, { marginTop: 30 }]}
                >
                    <Text style={styles.buttonText}>Atualizar Senha</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    input: {
        borderRadius: 20,
        marginBottom: 10,
        height: 55,
        margin: 5,
        paddingLeft: 20,
        fontFamily: 'sans-serif',
        fontSize: 15,
        padding: 15,
        backgroundColor: "#FFFFFF",
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#BC1C2C",
        padding: 17,
        borderRadius: 20,
        marginTop: 10,
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: 20,
        color: "#fff",
    },
    titleAdress: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

})

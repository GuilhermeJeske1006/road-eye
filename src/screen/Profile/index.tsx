import { Component, useCallback, useEffect, useState } from "react";
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
import { InputText } from "../../components/geral/input-text";
import BtnPrimary from "../../components/geral/btn-primary";
import TextError from "../../components/geral/text-error";
import { useDispatch } from "react-redux";
import { postUpdate, putPassword, showUser } from "../../store/User/thunks";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const user = useSelector((state: any) => state.UserReducer.data);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
          const userId = await AsyncStorage.getItem('user_id');
          dispatch(showUser(userId)); 
        };
    
        fetchUserData(); 
      }, [dispatch]); 
    
      useEffect(() => {
        if (user) {
          setEmail(user.email);
          setPhone(user.phone);
          setCpf(user.cpf);
          setName(user.name);
        }
      }, [user]);

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

    const submit = async () => {

        if (validateSubmit()) {
            try {
                const data = {
                    name: name,
                    email: email,
                    phone: phone,
                    cpf: cpf
                }
                const userId = await AsyncStorage.getItem('user_id');
                const res = dispatch(postUpdate(data, userId));

                if (res) {
                    console.log('Dados atualizados com sucesso!');
                }

            } catch (error) {
                console.log(error);
            }
        }

    }

    const validatePassword = () => {

        if (password === '') {
            errors.passwordRequired = 'Senha é obrigatória';
        } else {
            delete errors.passwordRequired;
        }
        if (password.length < 6) {
            errors.passwordMin = 'Senha deve ter no mínimo 6 caracteres';
        } else {
            delete errors.passwordMin;
        }

        if (confirmPassword === '') {
            errors.confirmPasswordRequired = 'Confirmar senha é obrigatória';
        } else {
            delete errors.confirmPasswordRequired;
        }
        if (confirmPassword.length < 6) {
            errors.confirmPasswordMin = 'Confirmar senha deve ter no mínimo 6 caracteres';
        } else {
            delete errors.confirmPasswordMin;
        }

        if (password !== confirmPassword) {
            errors.passwordDifferent = 'Senhas não conferem';
        } else {
            delete errors.passwordDifferent;
        }

        setErrors({ ...errors, ...errors });

        if (errors.passwordRequired || errors.passwordMin || errors.confirmPasswordRequired || errors.confirmPasswordMin || errors.passwordDifferent) {
            return false;
        }

        return true;

    };

    function submitPassword() {
        if (validatePassword()) {
            try {
                const data = {
                    password: password
                }
                const res = dispatch(putPassword(data));

                if(res) {
                    console.log('Senha alterada com sucesso!');
            }
            } catch (error) {
                console.log(error);
            }
        }   

            
    }



    return (
        <ScrollView style={{ backgroundColor: '#F2F2F2' }}>

            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, margin: 30, justifyContent: "center" }}>
                <Text style={styles.titleAdress}>
                    Dados do Perfil
                </Text>
                {
                    errors.name && <TextError error={errors.name} />
                }
                <InputText
                    setFn={text => setName(text)}
                    placeholder="Digite seu Nome"
                    value={name}
                />
                {
                    errors.email && <TextError error={errors.email} />
                }
                {
                    errors.isEmail && <TextError error={errors.isEmail} />
                }
                <InputText
                    setFn={text => setEmail(text)}
                    placeholder="Digite seu email"
                    attribute={{ keyboardType: "email-address" }}
                    value={email}
                />
                <InputText
                    setFn={text => setPhone(formatPhoneNumber(text))}
                    placeholder="Digite seu telefone"
                    attribute={{ keyboardType: "numeric" }}
                    value={phone}
                />
                {
                    errors.cpf && <TextError error={errors.cpf} />
                }
                <InputText
                    setFn={text => setCpf(formatCpf(text))}
                    placeholder="Digite seu cpf"
                    attribute={{ keyboardType: "numeric" }}
                    value={cpf}
                />

                <BtnPrimary fn={submit} text="Atualizar dados" />


                <Text style={[styles.titleAdress, { marginTop: 60 }]}>
                    Altere a sua senha
                </Text>

                {
                    errors.passwordRequired && <TextError error={errors.passwordRequired} />
                }
                {
                    errors.passwordMin && <TextError error={errors.passwordMin} />
                }
                {
                    errors.passwordDifferent && <TextError error={errors.passwordDifferent} />
                }
                {
                    errors.confirmPasswordRequired && <TextError error={errors.confirmPasswordRequired} />
                }
                {
                    errors.confirmPasswordMin && <TextError error={errors.confirmPasswordMin} />
                }

                <InputText
                    setFn={text => setPassword(text)}
                    placeholder="Digite sua senha"
                    attribute={{ secureTextEntry: true }}
                />
                <InputText
                    setFn={text => setConfirmPassword(text)}
                    placeholder="Cofirme sua senha"
                    attribute={{ secureTextEntry: true }}
                />

                <BtnPrimary fn={submitPassword} text="Alterar senha" />

            </KeyboardAvoidingView>

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    titleAdress: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

})

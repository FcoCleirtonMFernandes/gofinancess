import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components'

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';

export function SignIn() {

  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  
  // saber qual context acessar
  const { signInWithGoogle, signInWithApple } = useAuth();

  //console.log(user);

  async function handleSignInWithGoogle(){
    try {
        setIsLoading(true);
        return await signInWithGoogle();
    } catch (error) {
        console.log(error);
        Alert.alert('Não foi possível usar a conta do Google');
        setIsLoading(false);
    }
  }

  async function handleSignInWithApple(){
    try {
        setIsLoading(true);
        return await signInWithApple();
    } catch (error) {
        console.log(error);
        Alert.alert('Não foi possível usar a conta do Apple');
        setIsLoading(false);
    }
  }

  return (
    <Container>
        <Header>
            <TitleWrapper>

                <LogoSvg>
                    width={RFValue(120)}
                    heigth={RFValue(68)}
                </LogoSvg>

                <Title>
                    Controle suas {'\n'} finanças 
                    de forma {'\n'} muito simples.
                </Title>

            </TitleWrapper>

            <SignInTitle>
                Faça seu login com {'\n'}
                umas das contas abaixo.
            </SignInTitle>
        </Header>

        <Footer>
            <FooterWrapper>
                
                <SignInSocialButton 
                    title='Entrar com Google'
                    svg={GoogleSvg}
                    onPress={handleSignInWithGoogle}
                />

                {
                    Platform.OS === 'ios' && 
                    <SignInSocialButton 
                        title='Entrar com Apple'
                        svg={AppleSvg}
                        onPress={handleSignInWithApple}
                    />
                }
            </FooterWrapper>

            { isLoading && 
                <ActivityIndicator 
                    color={theme.colors.shape}
                />
            }
        </Footer>

    </Container>
  );
}
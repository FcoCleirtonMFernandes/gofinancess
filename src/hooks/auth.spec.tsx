import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from './auth';

/* mock simula preenchimento pelo app 
  como depende de uma sessão do usuario logado, peloa session
*/
jest.mock('expo-auth-session', () => {
    return  {
        startAsync: () => {
            return {
                type: 'success',
                params: {
                    access_tokem: 'google-tokem'
                }
            }
        }
    }
});

describe('Auth Hook', () => {
    it('should be able to sign in with Google account existing', async () => {
        
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                id: `userInfo.id`,
                email: `userInfo.email`,
                name: `userInfo.given_name`,
                photo: `userInfo.picture`,
                locale: `userInfo.locale`,
                verified_email: `userInfo.verified_email`,
            })
        })) as jest.Mock;
        
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        /**
         * 1- Abre uma tela par ao usuário autenticar
         * 2- Retorna type e params pela fução (startAsync)
         * 3- Fetch dos dados de perfil no servidor
         */

        //chamar a função da google para verificar se tem conta
        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).toBeTruthy();
    });
});
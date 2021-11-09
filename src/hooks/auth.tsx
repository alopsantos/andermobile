import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";
import { Alert } from "react-native";

interface User {
  id: string;
  setor: string;
  isAdmin: boolean;
  name: string;
  email: string;
  avatar: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  defineInterceptor(): void;
}
interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const state = { errorMessage: null,}
  const keyToken = "@ander:token";
  const keyUser = "@ander:user";

  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorangeData(): Promise<void> {
      try {
        const [token, user] = await AsyncStorage.multiGet([keyToken, keyUser]);

        if (token[1] && user[1]) {
          api.defaults.headers.authorization = `Bearer ${token[1]}`;

          setData({ token: token[1], user: JSON.parse(user[1]) });
        }
        console.log("Oi")
        setLoading(false);
      } catch (error) {
       signOut();
      }
    }
    loadStorangeData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });
      const { token, user } = response.data;
      
      await AsyncStorage.multiSet([
        [keyToken, token],
        [keyUser, JSON.stringify(user)]
      ]);
      
      api.defaults.headers.authorization = `Bearer ${token}`;
      


      setData({ token, user });
    } catch (response) {
      console.log("Erro aqui")
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([keyToken, keyUser]);

    setData({} as AuthState);
  }, []);

  const defineInterceptor = useCallback(async () =>{
    api.interceptors.response.use(response => {
      return response
    }, error => {
      return new Promise((resolve, reject) => {
        const originalReq = error.config
        if(error.response.status == 401 && error.config && !error.config._retry){
          Alert.alert("Oi, você vai precisar fazer o login novemente para continuar.")
          signOut();
        }else{
          console.log("Nao deu certo")
        }
      })
    })
  }, [])
    
  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut, defineInterceptor }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };

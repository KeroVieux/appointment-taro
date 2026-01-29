import {createContext, useState, useContext} from 'react';

interface User {
  phone: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (userData) => { return userData },
  clearUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const setUserData = (userData: User) => {
    setUser(userData);
    return userData
  };

  const clearUserData = () => {
    setUser(null);
  };

  const value = {
    user,
    setUser: setUserData,  // 设置用户
    clearUser: clearUserData  // 清除用户
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser必须在UserProvider内使用');
  }
  return context;
};

// context/UserContext.jsx
import {createContext, useState, useContext} from 'react';

// 用户类型定义
interface User {
  phone: string;
}

// Context 类型
interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

// 1. 创建 Context
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (userData) => { return userData },
  clearUser: () => {},
});

// 2. Provider 组件
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // 设置用户
  const setUserData = (userData: User) => {
    setUser(userData);
    return userData
  };

  // 清除用户
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

// 3. 自定义 Hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser必须在UserProvider内使用');
  }
  return context;
};

import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, {PropsWithChildren, useEffect, useState} from 'react'
import { useUser } from '../context/userContext';
import './main.scss'

const NO_LAYOUT_PAGES = ['/pages/login/login']

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const currentPage = Taro.getCurrentInstance().router?.path || ''
  const indexOfQuery = currentPage.indexOf('?')
  const currentPagePath = currentPage.substring(0, indexOfQuery)
  const [showLayout, setShowLayout] = useState(false)
  const { user, clearUser } = useUser();

  const handleLogout = () => {
    Taro.removeStorageSync('user')
    clearUser()
    Taro.navigateTo({ url: '/pages/login/login' })
  }

  useEffect(() => {
    setShowLayout(!NO_LAYOUT_PAGES.includes(currentPagePath))
  }, [currentPage])

  if (!showLayout) {
    return (<View>{children}</View>)
  }

  return (
    <View className='main-layout'>
      <View className='header'>
        <View className='user-info'>
          {user ? (
            <>
              <Text className='username'>{user.phone}</Text>
              <View className='logout' onClick={handleLogout}>退出</View>
            </>
          ) : (
            <Text className='username'>未登录</Text>
          )}
        </View>
      </View>

      <View className='content'>
        {children}
      </View>

      <View className='tabbar'>
        <View
          className='tab-item'
          onClick={() => Taro.switchTab({ url: '/pages/index/index' })}
        >
          首页
        </View>
        <View
          className='tab-item'
          onClick={() => Taro.navigateTo({ url: '/pages/appointment/list' })}
        >
          我的预约
        </View>
        <View
          className='tab-item'
          onClick={() => Taro.navigateTo({ url: '/pages/profile/index' })}
        >
          个人中心
        </View>
      </View>
    </View>
  )
}

export default MainLayout

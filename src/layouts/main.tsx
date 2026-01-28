// src/layouts/MainLayout.tsx
import { View, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import React, { PropsWithChildren, useState } from 'react'
import './main.scss'

// 定义不需要 Layout 的页面
const NO_LAYOUT_PAGES = ['/pages/login/index']

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  const [showLayout, setShowLayout] = useState(false)

  useDidShow(() => {
    // 检查当前页面是否需要 Layout
    const currentPage = Taro.getCurrentPages().pop()?.route || ''
    setShowLayout(!NO_LAYOUT_PAGES.includes(`/${currentPage}`))

    // 获取用户信息
    const userInfo = Taro.getStorageSync('user')
    setUser(userInfo)
  })

  if (!showLayout) {
    return <>{children}</>
  }

  return (
    <View className='main-layout'>
      {/* 顶部导航栏 */}
      <View className='header'>
        <View className='user-info'>
          {user ? (
            <>
              <Text className='username'>{user.name || user.phone}</Text>
              <View className='logout' onClick={handleLogout}>退出</View>
            </>
          ) : (
            <Text className='username'>未登录</Text>
          )}
        </View>
      </View>

      {/* 内容区域 - 子页面在这里渲染 */}
      <View className='content'>
        {children}
      </View>

      {/* 底部 TabBar（可选） */}
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

  function handleLogout() {
    Taro.removeStorageSync('user')
    Taro.removeStorageSync('token')
    Taro.reLaunch({ url: '/pages/login/index' })
  }
}

export default MainLayout

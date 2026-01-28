import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import MainLayout from './layouts/main'

import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return (<MainLayout>{children}</MainLayout>)
}



export default App

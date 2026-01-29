import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import MainLayout from './layouts/main'
import { UserProvider } from './context/userContext';
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  return (<UserProvider><MainLayout>{children}</MainLayout></UserProvider>)
}



export default App

import {View, Text, Button, ScrollView} from '@tarojs/components'
import { useLoad, getStorageSync, navigateTo, request } from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

export default function Index () {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  useLoad(async () => {
    const token = getStorageSync('token')
    if (!token) {
      await navigateTo({ url: '/pages/login/login' })
    } else {
      const responseData = await request({
        url: `${process.env.TARO_APP_BASE_URL}/appointments`,
        method: 'GET',
        header: {
          Authorization: token
        }
      })
      if (responseData.statusCode === 200) {
        setAppointments(responseData.data || [])
      }
    }
  })
  return (
    <View className='container'>
      <View className='header'>
        <Text className='title'>My Appointments</Text>
        <View className='btn-area'><Button onClick={() => navigateTo({ url: '/pages/create/create' })} type='primary' size='mini'>New</Button></View>
      </View>

      {appointments.length === 0 ? (
        <View className='empty'>No Appointments</View>
      ) : (
        <ScrollView scrollY className='list p-10'>
          {appointments.map((item) => (
            <View key={item.id} className='appointment-item'>
              <View className='service-name'>serviceName：{item.serviceName}</View>
              <View className='date-time'>
                <Text>date：{item.date}</Text>
                <Text>timeSlot：{item.timeSlot}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

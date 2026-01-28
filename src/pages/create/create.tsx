import { View, Picker, Text, Input, Button, Form } from '@tarojs/components'
import { getStorageSync, request, navigateTo } from '@tarojs/taro'
import { useState } from 'react'

export default function Create () {
  const [serviceName, setServiceName] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [timeSlot, setTimeSlot] = useState<string>('')

  const submit = async () => {
    const token: string = getStorageSync('token')
    const responseData = await request({
      url: `${process.env.TARO_APP_BASE_URL}/appointments`,
      method: 'POST',
      header: {
        Authorization: token
      },
      data: { serviceName, date, timeSlot }
    })
    if (responseData.statusCode === 200) {
      await navigateTo({ url: '/pages/index/index' })
    }
  }

  return (
    <View className='container'>
      <Form className='mb-10'>
        <View>
          <Text>serviceName</Text>
          <View>
            <Input type='text' placeholder='serviceName' defaultValue={serviceName} onInput={e => setServiceName(e.detail.value)} />
          </View>
        </View>
        <View>
          <Text>Date</Text>
          <View>
            <Picker value={date} mode='date' onChange={e => setDate(e.detail.value)}>
              <View className='picker'>
                Selected：{date || 'Pick'}
              </View>
            </Picker>
          </View>
        </View>
        <View>
          <Text>timeSlot</Text>
          <View>
            <Input type='text' placeholder='9-18' defaultValue={timeSlot} onInput={e => setTimeSlot(e.detail.value)} />
          </View>
        </View>
      </Form>
      <View>
        <Button type='primary' onClick={submit}>submit</Button>
      </View>
    </View>
  )
}

import {Button, View, Input, Label, Form} from '@tarojs/components'
import { request, setStorageSync, navigateTo } from '@tarojs/taro'
import { useState } from 'react'

export default function Login () {
  const [phone, setPhone] = useState<string>('1316233311')
  const [code, setCode] = useState<string>('123456')
  const submit = async () => {
    const responseData = await request({
      url: `${process.env.TARO_APP_BASE_URL}/login`,
      method: 'POST',
      data: { phone, code }
    })
    if (responseData.statusCode === 200) {
      setStorageSync('token', responseData.data.token)
      await navigateTo({ url: '/pages/index/index' })
    }
  }

  return (
    <View className='container'>
      <Form className='mb-10'>
        <View>
          <Label>Phone</Label>
          <Input type='text' name='phone' placeholder='phone' defaultValue={phone} onInput={e => setPhone(e.detail.value)} />
        </View>
        <View>
          <Label>Code</Label>
          <Input type='text' name='code' defaultValue={code} onInput={e => setCode(e.detail.value)} />
        </View>
      </Form>
      <View>
        <Button type='primary' onClick={submit}>submit</Button>
      </View>
    </View>
  )
}

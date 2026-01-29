import {Button, View, Input, Label, Form} from '@tarojs/components'
import { request, setStorageSync, navigateTo } from '@tarojs/taro'
import {useRef} from 'react'
import { useUser } from '../../context/userContext';

export default function Login () {
  const { setUser } = useUser();
  const defaultPhone = '1316233311'
  const defaultCode = '123456'
  const phoneRef = useRef({
    value: defaultPhone
  });
  const codeRef = useRef({
    value: defaultCode
  });
  const submit = async () => {
    const phone = phoneRef.current.value;  // 提交时获取值
    const code = codeRef.current.value;
    const responseData = await request({
      url: `${process.env.TARO_APP_BASE_URL}/login`,
      method: 'POST',
      data: { phone, code}
    })
    if (responseData.statusCode === 200) {
      setStorageSync('token', responseData.data.token)
      setStorageSync('user', phone)
      setUser({
        phone,
      })
      await navigateTo({ url: '/pages/index/index' })
    }
  }

  return (
    <View className='container'>
      <Form className='mb-10'>
        <View>
          <Label>Phone</Label>
          <Input type='text' name='phone' placeholder='phone' ref={phoneRef} defaultValue={defaultPhone} />
        </View>
        <View>
          <Label>Code</Label>
          <Input type='text' name='code' defaultValue={defaultCode} ref={codeRef} />
        </View>
      </Form>
      <View>
        <Button type='primary' onClick={submit}>submit</Button>
      </View>
    </View>
  )
}

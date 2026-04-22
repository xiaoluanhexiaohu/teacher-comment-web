import { View, Button, Input } from '@tarojs/components';

export default function LoginPage() {
  return <View><Input placeholder='邮箱' /><Input placeholder='密码' password /><Button>登录</Button></View>;
}

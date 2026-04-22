import { View, Checkbox, Button } from '@tarojs/components';

export default function HomePage() {
  return <View><View>学生列表（调用 /api/students）</View><Checkbox>课堂积极</Checkbox><Checkbox>进步明显</Checkbox><Button>生成评语</Button></View>;
}

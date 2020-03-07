<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos/>
    <Card>
      <div style="height: 600px">Content</div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos'
export default {
	components: { HeadInfos },
	data () {
		return {
		}
	}	
}
</script>
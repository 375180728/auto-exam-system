<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos/>
    <Card>
      <div style="">
        <!-- <h4>标签</h4> -->
        <NewTags/>
      </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos'
import NewTags from '@/components/NewTags'
import { mapState } from 'vuex'

export default {
	components: { 
    HeadInfos,
    NewTags
  },
	data() {
		return {
		}
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created() {
    if(!this.userInfo) {
      console.log('先登录')
      location.pathname = '/'
      return
    }
    if(this.userInfo.role  !== 0) {
      console.log('权限不足')
      location.pathname = '/'
      return
    }
  }
}
</script>
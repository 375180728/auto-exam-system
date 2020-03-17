<template>
  <Content :style="{ padding: '0 16px 16px' }">
		<HeadInfos />
    <div class="home-container">
      <div class="title">小天教学管理平台</div>
      <div class="divider">
        <Divider></Divider>
      </div>
      <div class="home-description">
        <span>提高教师工作效率</span>
        <span>增强学生学习兴趣</span>
      </div>
			<div class="come-in">
				<Button class="come-in-button" type="primary" to="/student/course" v-if="this.userInfo && this.userInfo.role == 1">进入平台</Button>
        <Button class="come-in-button" type="primary" to="/teacher/course" v-else-if="this.userInfo && this.userInfo.role == 2">进入平台</Button>
        <Button class="come-in-button" @click="handleLoginDrawer(true)" type="primary" v-else>请先登录</Button>
			</div>
    </div>
		<vue-particles
			color="#fff"
			:particleOpacity="0.7"
			:particlesNumber="60"
			shapeType="circle"
			:particleSize="4"
			linesColor="#fff"
			:linesWidth="1"
			:lineLinked="true"
			:lineOpacity="0.4"
			:linesDistance="150"
			:moveSpeed="2"
			:hoverEffect="true"
			hoverMode="grab"
			:clickEffect="true"
			clickMode="push"
			class="lizi"
      >
		</vue-particles>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
import { mapMutations, mapState } from 'vuex'

export default {
  components: { HeadInfos },
  data() {
    return {};
  },
  computed: {
    ...mapState(['userInfo'])
  },
	methods: {
    ...mapMutations(['handleLoginDrawer']),
	}
};
</script>

<style lang="less">
.home-container {
	// background: url("../assets/bg.jpg") no-repeat;
	position: relative;
  background-color: rgba(32, 32, 32);
	padding-top: 100px;
	height: 90%;
  // background-size: 100% 100%;
  .title {
    color: white;
    width: 500px;
    text-align: center;
    font-size: 40px;
    font-weight: 500;
    margin: 0 auto;
    animation: 0.6s fadeIn ease-in both 0.8s;
  }
  .divider {
    width: 800px;
    margin: 0 auto;
  }
  .home-description {
    span {
      width: 400px;
      font-size: 32px;
      text-align: center;
      animation: 0.4s fadeInUp ease both 1.5s;
      text-shadow: 0 7px 2px rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 32px;
      font-family: cursive;
      font-weight: lighter;
    }
    width: 800px;
    margin: 0 auto;
    color: azure;
    display: flex;
    justify-content: space-between;
	}
	.come-in {
		position: relative;
		width: 200px;
		margin: 0 auto;
		margin-top: 50px;
		z-index: 9999;
		.come-in-button {
			width: 100%;
		}
	}
}
.lizi {
	position: absolute;
	flex: auto;
	top: 65px; 
	right: 16px;
	width: 100%;
	height: 88%;
	z-index: 0;
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  100% {
    opacity: 1;
    transform: translateZ(0);
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

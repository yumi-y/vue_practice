<template>
  <div id="hy-swiper">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <slot name="indicator"> </slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{ active: index === currentIndex - 1 }"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Swiper",
  props: {
    //interval设置切换延迟时间，默认3000毫秒
    interval: {
      type: Number,
      default: 3000,
    },
    //规定完成动画所需的时间
    animDuration: {
      type: Number,
      default: 300,
    },
    //设置移动的比例超过四分之一就切向下一页
    moveRatio: {
      type: Number,
      default: 0.5,
    },
    //显示圆圈指标
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  //设置参数
  data: function() {
    return {
      slideCount: 0, //元素个数
      totalWidth: 0, //swiper的宽度
      swiperStyle: {}, //swiper的样式
      currentIndex: 1, //当前的index
      scrolling: false, //设置是否在滚动
    };
  },
  //mounted是在方法在html中渲染完成之后使用再调用进行后续操作
  mounted: function() {
    //1、操作DOM，在前后添加slide
    setTimeout(() => {
      this.handleDom();
      //2、开启定时器
      this.startTimer();
    }, 100);
  },
  methods: {
    /* 定时器操作 */
    //setInterval函数会不断的调用函数，直到clearInterval被调用或窗口被关闭
    startTimer: function() {
      this.playTimer = window.setInterval(() => {
        //根据设置的切换延时时间进行切换，没切换一次当前的index+1
        this.currentIndex++;
        //设置其滚动的距离
        this.scrollContent(-this.currentIndex * this.totalWidth);
        //interval为设置的切换延迟时间
      }, this.interval);
    },
    stopTimer: function() {
      //调用clearInterval停止函数调用
      window.clearInterval(this.playTimers);
    },

    /* 滚动到正确位置 */
    scrollContent: function(currentPosition) {
      //设置正在滚动
      this.scrolling = true;

      //1、开始滚动动画
      //transition可以设置动画的转变，调用animDuration参数，设置动画的转变时间
      //调用完成之后使用setTransform重置转变用于下一次调用
      this.swiperStyle.transition = "transform" + this.animDuration + "ms";
      this.setTransform(currentPosition);

      //2、判断滚动到的位置
      //低调用函数
      this.checkPosition();

      //3、滚动完成
      this.scrolling = false;
    },

    /* 校验正确的位置 */
    checkPosition: function() {
      window.setTimeout(() => {
        //1、校验正确的位置
        this.swiperStyle.transition = "0ms";
        //若索引数超过了目前所在图片数，设置回到第一张
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
          //若索引数比第一张还小，设置在原始的索引数
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        //结束移动后的回调，触发自定义函数
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },

    /* 设置滚动的位置 */
    setTransform: function(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle[
        "-webkit-transform"
      ] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle["-ms-transform"] = `translate3d(${position}px), 0, 0`;
    },

    /*操作DOM，在DOM前后添加slide */
    handleDom: function() {
      //1、获取要操作的元素
      let swiperEl = document.querySelector(".swiper");
      let slidesEls = swiperEl.getElementsByClassName("slide");

      //2、保存个数
      this.slideCount = slidesEls.length;

      //3、如果大于1个，那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }

      //4、让swiper元素，显示第一个(母目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth);
    },

    /* 拖动事件的处理 */
    touchStart: function(e) {
      //1、如果正在滚动，不可以拖动
      if (this.scrolling) return;

      //2、停止定时器
      this.stopTimer();

      //3、保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },

    touchMove: function(e) {
      //1、计算出用于拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      //2、设置当前的位置
      this.setTransform(moveDistance);
    },

    touchEnd: function(e) {
      //1、获取移动的距离
      let currentMove = Math.abs(this.distance);

      //2、判断最终的距离
      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        //右边移动超过0.5
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        //向左移动超过0.5
        this.currentIndex++;
      }

      //3、移动到正确位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      //4、移动完成后重新开启定时器
      this.startTimer();
    },

    /* 控制上一个，下一个 */
    previous: function() {
      this.changeItem(-1);
    },
    next: function() {
      this.changeItem(1);
    },
    changeItem: function(num) {
      //1、移除定时器
      this.stopTimer();

      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 3.添加定时器
      this.startTimer();
    },
  },
};
</script>
<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>

<template>
    <div class="arrow-title">
      <svg version="1.1" viewBox="0 0 70 30" class="arrow-left">
        <polygon style="fill:#09f2e1; opacity:0.25;" points="0,15 40,0 40,30"/>
        <polygon style="fill:#09f2e1; opacity:0.5;" points="15,15 55,0 55,30"/>
        <polygon style="fill:#09f2e1;" points="30,15 70,0 70,30"/>
      </svg>
      {{titleText}}
      <svg version="1.1" viewBox="0 0 70 30" class="arrow-right">
        <polygon style="fill:#09f2e1;" points="0,0 40,15 0,30"/>
        <polygon style="fill:#09f2e1; opacity:0.5;" points="15,0 55,15 15,30"/>
        <polygon style="fill:#09f2e1; opacity:0.25;" points="30,0 70,15 30,30"/>
      </svg>
    </div>
</template>

<script>
  export default {
    name: "ArrowTitle",
    props: {
      titleText: {
        type: String,
        default: '标题'
      }
    },
  }
</script>

<style scoped>

  .arrow-title {
    display: flex;
    word-break: keep-all;
  }

  .arrow-left {
    align-self: center;
    height: 10px;
    padding-right: 10px;
  }


  .arrow-right{
    align-self: center;
    height: 10px;
    padding-left: 10px;

  }
</style>

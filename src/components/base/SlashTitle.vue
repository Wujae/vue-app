<template>
  <div class="slash-title">
    <svg version="1.1" viewBox="0 0 205 30" class="slash-left">
      <path d="M0 0  L15 30"   style="stroke:#09f2e1; opacity:0.05; stroke-width:2px" />
      <path d="M10 0 L25 30"  style="stroke:#09f2e1;  opacity:0.10; stroke-width:2px" />
      <path d="M20 0 L35 30"  style="stroke:#09f2e1;  opacity:0.15; stroke-width:2px" />
      <path d="M30 0 L45 30"  style="stroke:#09f2e1;  opacity:0.20; stroke-width:2px" />
      <path d="M40 0 L55 30"  style="stroke:#09f2e1;  opacity:0.25; stroke-width:2px" />
      <path d="M50 0 L65 30"  style="stroke:#09f2e1;  opacity:0.30; stroke-width:2px" />
      <path d="M60 0 L75 30"  style="stroke:#09f2e1;  opacity:0.35; stroke-width:2px" />
      <path d="M70 0 L85 30"  style="stroke:#09f2e1;  opacity:0.40; stroke-width:2px" />
      <path d="M80 0 L95 30"  style="stroke:#09f2e1;  opacity:0.45; stroke-width:2px" />
      <path d="M90 0 L105 30" style="stroke:#09f2e1;  opacity:0.50; stroke-width:2px" />

      <path d="M100 0 L115 30" style="stroke:#09f2e1; opacity:0.55; stroke-width:2px" />
      <path d="M110 0 L125 30" style="stroke:#09f2e1; opacity:0.60; stroke-width:2px" />
      <path d="M120 0 L135 30" style="stroke:#09f2e1; opacity:0.65; stroke-width:2px" />
      <path d="M130 0 L145 30" style="stroke:#09f2e1; opacity:0.70; stroke-width:2px" />
      <path d="M140 0 L155 30" style="stroke:#09f2e1; opacity:0.75; stroke-width:2px" />
      <path d="M150 0 L165 30" style="stroke:#09f2e1; opacity:0.80; stroke-width:2px" />
      <path d="M160 0 L175 30" style="stroke:#09f2e1; opacity:0.85; stroke-width:2px" />
      <path d="M170 0 L185 30" style="stroke:#09f2e1; opacity:0.90; stroke-width:2px" />
      <path d="M180 0 L195 30" style="stroke:#09f2e1; opacity:0.95; stroke-width:2px" />
      <path d="M190 0 L205 30" style="stroke:#09f2e1; opacity:1.00; stroke-width:2px" />
    </svg>
    {{titleText}}
    <svg version="1.1" viewBox="0 0 205 30" class="slash-right">
      <path d="M190 30 L205 0"   style="stroke:#09f2e1; opacity:0.05; stroke-width:2px" />
      <path d="M180 30 L195 0"  style="stroke:#09f2e1;  opacity:0.10; stroke-width:2px" />
      <path d="M170 30 L185 0"  style="stroke:#09f2e1;  opacity:0.15; stroke-width:2px" />
      <path d="M160 30 L175 0"  style="stroke:#09f2e1;  opacity:0.20; stroke-width:2px" />
      <path d="M150 30 L165 0"  style="stroke:#09f2e1;  opacity:0.25; stroke-width:2px" />
      <path d="M140 30 L155 0"  style="stroke:#09f2e1;  opacity:0.30; stroke-width:2px" />
      <path d="M130 30 L145 0"  style="stroke:#09f2e1;  opacity:0.35; stroke-width:2px" />
      <path d="M120 30 L135 0"  style="stroke:#09f2e1;  opacity:0.40; stroke-width:2px" />
      <path d="M110 30 L125 0"  style="stroke:#09f2e1;  opacity:0.45; stroke-width:2px" />
      <path d="M100 30 L115 0" style="stroke:#09f2e1;  opacity:0.50; stroke-width:2px" />

      <path d="M90 30 L105 0" style="stroke:#09f2e1; opacity:0.55; stroke-width:2px" />
      <path d="M80 30 L95  0" style="stroke:#09f2e1; opacity:0.60; stroke-width:2px" />
      <path d="M70 30 L85  0" style="stroke:#09f2e1; opacity:0.65; stroke-width:2px" />
      <path d="M60 30 L75  0" style="stroke:#09f2e1; opacity:0.70; stroke-width:2px" />
      <path d="M50 30 L65  0" style="stroke:#09f2e1; opacity:0.75; stroke-width:2px" />
      <path d="M40 30 L55 0" style="stroke:#09f2e1; opacity:0.80; stroke-width:2px" />
      <path d="M30 30 L45  0" style="stroke:#09f2e1; opacity:0.85; stroke-width:2px" />
      <path d="M20 30 L35  0" style="stroke:#09f2e1; opacity:0.90; stroke-width:2px" />
      <path d="M10 30 L25  0" style="stroke:#09f2e1; opacity:0.95; stroke-width:2px" />
      <path d="M0  30 L15  0" style="stroke:#09f2e1; opacity:1.00; stroke-width:2px" />
    </svg>
  </div>
</template>

<script>
  export default {
    name: "SlashTitle",
    props: {
      titleText: {
        type: String,
        default: '标题'
      }
    },
  }
</script>

<style scoped>

  .slash-title {
    display: flex;
    word-break: keep-all;
  }

  .slash-left {
    align-self: center;
    height: 14px;
    padding-right: 10px;
  }


  .slash-right{
    align-self: center;
    height: 14px;
    padding-left: 10px;

  }
</style>

<template>
  <div class="train-select-holder">
    <el-select :size="'mini'" v-model="selectedTrain" filterable placeholder="请选择车组" :popper-class="'train-select-popper-class'">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "TrainSelect",
    data () {
      return {
        options: [{
          value: '3501',
          label: '3501'
        }, {
          value: '3502',
          label: '3502'
        }, {
          value: '3503',
          label: '3503'
        }, {
          value: '3504',
          label: '3504'
        }, {
          value: '3505',
          label: '3505'
        }],
        selectedTrain: null
      }
    },
    watch: {
      selectedTrain(newV) {
        this.$store.commit("updateTrainSelected", newV);
      }
    }
  }
</script>

<style>
  .train-select-holder {
    float: left;
    padding: 8px;
  }

  .train-select-holder > .el-select {
    width: 120px;
  }

 .train-select-holder > .el-select input.el-input__inner {
   background-color: #1b3b65;
   border-color: #23a2da;
   color: #fff;
 }


  .train-select-popper-class {
    background-color: #1b3b65;
    border-color: #23a2da;
    color: #fff;
  }

</style>

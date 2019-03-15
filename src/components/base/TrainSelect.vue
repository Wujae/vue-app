<template>
  <div class="train-select-holder">
    <el-select :size="'mini'" v-model="selectedTrain" filterable placeholder="请选择车组" :popper-class="'train-select-popper-class'">
      <el-option
        v-for="item in options"
        :key="item.sn"
        :label="item.sn"
        :value="item.sn">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import thmInterfaceService from '../../service/ThmInterfaceService'
  import { mapGetters } from 'vuex'

  export default {
    name: "TrainSelect",
    data () {
      return {
        options: [{
          sn: '3501',
        }, {
          sn: '3502'
        }, {
          sn: '3503'
        }, {
          sn: '3504'
        }, {
          sn: '3505'
        }],
        selectedTrain: null
      }
    },
    computed:{
      ...mapGetters([
        'getTrains'
      ])
    },
    watch: {
      getTrains (newv) { //newv 就是改变后的getTrains值
        this.parseData(newv);
      },
      selectedTrain(newV) {
        this.$store.commit("updateTrainSelected", newV);
      }
    },
    methods: {
      parseData(data) {
        this.options = data
      }
    },
    mounted() {
      thmInterfaceService.getOnlineStatusData(this)

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

  .train-select-popper-class .el-select-dropdown__item {
    color: #23a2da;
  }

</style>

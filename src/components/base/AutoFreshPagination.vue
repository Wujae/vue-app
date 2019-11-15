<template>
  <div class="main-container">
    <span class="switch-label" v-if="!hideRefresh">自动刷新</span>
    <el-switch class="switch" v-if="!hideRefresh"
      v-model="autoed" :width="30" @change="handelChange"
      :active-color="activeColor"
      :inactive-color="inactiveColor">
    </el-switch>
    <el-pagination class="pagination"
                   :page-size="pager.pageSize" @current-change="handleCurrentChange"
                   :layout="pager.layout"
                   :total="pager.total"
                   :current-page="pager.currentPage">
    </el-pagination>
    <div v-if="dataLoading" class="disabled-mask" title="数据正在加载，请稍等……"></div>
  </div>
</template>

<script>
  export default {
    name: "AutoFreshPagination",
    data() {
      return {
        autoed: true,
        activeColor: "#30547f",
        inactiveColor: "gray"
      }
    },
    props: {
      pager: {
        type: Object,
        default: () => {
          return {
            total: 100,
            pageSize: 5,
            currentPage: 1,
            layout: "prev, pager, next, total"
          }
        }
      },
      dataLoading: {
        type: Boolean,
        default: () => {
          return true
        }
      },
      hideRefresh: {
        type: Boolean,
        default: () =>{
          return false;
        }
      }
    },
    watch: {
      autoed (nv){
        this.$emit('autoed', nv);
      }
    },
    methods: {
      handelChange(val){
        this.$emit('auto-fresh', val);
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`);
        this.autoed = false;
        this.$emit('to-page', val);

      }
    }
  }
</script>

<style scoped>
  .main-container{
    width: 100%;
    position: absolute;
    left: 0;
  }

  .disabled-mask{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: not-allowed;
  }

  .switch-label{
    position: absolute;
    left: 20px;
    bottom: 10px;
    color: white;
    font-size: 12px;

  }

  .switch{
    position: absolute;
    left: 80px;
    bottom: 7px;
  }

  .pagination{
    text-align: right;
    margin-right: 20px;
  }
</style>

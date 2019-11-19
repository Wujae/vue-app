<template>
  <tech-frame v-bind="frameInitOptions">
    <div class="title">
      <slash-title :title-text="'基础信息'"/>
    </div>
    <div class="base-info-content">
      <div style="height: 150px">
        <div class="section-title"><span>基本信息</span></div>
        <transition :name="animationName" v-on:after-enter="nextShow(0)">
        <el-row v-show="shows[0]" :gutter="12" :justify="'start'" :align="'middle'" :type="'flex'" class="table-row table-row-odd">
          <el-col :span="8" >
            <div class="form-control">
              <span class="form-title">定员：</span><span class="form-text">{{trainBaseInfo.trainCarFileInfo.sb}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">编组数量：</span><span class="form-text">{{trainBaseInfo.trainCarFileInfo.ab}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">制造年月：</span><span class="form-text">{{trainBaseInfo.trainCarFileInfo.ad}}</span>
            </div>
          </el-col>
        </el-row>
        </transition>
        <transition :name="animationName" v-on:after-enter="nextShow(1)">
        <el-row v-show="shows[1]" :gutter="12" :justify="'start'" :align="'middle'" :type="'flex'" class="table-row table-row-even">
          <el-col :span="24" >
            <div class="form-control">
              <span class="form-title">编组形式：</span><span class="form-text">{{trainBaseInfo.trainCarFileInfo.cxab}}</span>
            </div>
          </el-col>
        </el-row>
        </transition>
      </div>
      <div style="height: 250px">
        <div class="section-title"><span>配属信息</span></div>
        <transition :name="animationName" v-on:after-enter="nextShow(2)">
        <el-row v-show="shows[2]" :gutter="12" :justify="'start'" :align="'middle'" :type="'flex'" class="table-row table-row-odd">
          <el-col :span="8" >
            <div class="form-control">
              <span class="form-title">配属局：</span><span class="form-text">{{trainBaseInfo.gzzr.bur_name}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">配属段：</span><span class="form-text">{{trainBaseInfo.gzzr.det_name}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">配属所：</span><span class="form-text">{{trainBaseInfo.gzzr.trh_name}}</span>
            </div>
          </el-col>
        </el-row>
        </transition>
        <transition :name="animationName" v-on:after-enter="nextShow(3)">
        <el-row v-show="shows[3]" :gutter="12" :justify="'start'" :align="'middle'" :type="'flex'" class="table-row table-row-even">
          <el-col :span="8" >
            <div class="form-control">
              <span class="form-title">使用局：</span><span class="form-text">{{trainBaseInfo.trainInUse.bur_name}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">使用段：</span><span class="form-text">{{trainBaseInfo.trainInUse.det_name}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">使用所：</span><span class="form-text">{{trainBaseInfo.trainInUse.trh_name}}</span>
            </div>
          </el-col>
        </el-row>
        </transition>
        <transition :name="animationName" v-on:after-enter="nextShow(4)">
        <el-row v-show="shows[4]" :gutter="12" :justify="'start'" :align="'middle'" :type="'flex'" class="table-row table-row-odd">
          <el-col :span="8" >
            <div class="form-control">
              <span class="form-title">配属日期：</span><span class="form-text">{{trainBaseInfo.gzzr.xy}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">配属电报：</span><span class="form-text">{{trainBaseInfo.gzzr.psdb}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">是否借调：</span><span class="form-text">{{trainBaseInfo.gzzr.trh_name != trainBaseInfo.trainInUse.trh_name ? '是':'否'}}</span>
            </div>
          </el-col>
        </el-row>
        </transition>
        <transition :name="animationName" v-on:after-enter="nextShow(5)">
        <el-row v-show="shows[5]" :gutter="12" :justify="'start'" :align="'middle'" :type="'flex'" class="table-row table-row-even">
          <el-col :span="8" >
            <div class="form-control">
              <span class="form-title">转出局：</span><span class="form-text">{{trainBaseInfo.gzzr.zcj}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">转出段：</span><span class="form-text">{{trainBaseInfo.gzzr.zcd}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">转出所：</span><span class="form-text">{{trainBaseInfo.gzzr.zcs}}</span>
            </div>
          </el-col>
        </el-row>
        </transition>
      </div>
      <div style="height: 200px">
        <div class="section-title"><span>走行信息</span></div>
        <transition :name="animationName" v-on:after-enter="nextShow(6)" >
        <el-row v-show="shows[6]" :gutter="12" :justify="'start'" :align="'middle'" :type="'flex'" class="table-row table-row-odd">
          <el-col :span="8" >
            <div class="form-control">
              <span class="form-title">累计走行：</span><span class="form-text">{{trainBaseInfo.zxxx.cag}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">更新时间：</span><span class="form-text">{{trainBaseInfo.zxxx.cab}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">上次高级修后走行：</span><span class="form-text">{{trainBaseInfo.zxxx.agak}}</span>
            </div>
          </el-col>
        </el-row>
        </transition>
        <transition :name="animationName" v-on:after-enter="nextShow(7)">
        <el-row v-show="shows[7]" :gutter="12" :justify="'start'" :align="'middle'" :type="'flex'" class="table-row table-row-even">
          <el-col :span="8" >
            <div class="form-control">
              <span class="form-title">上次高级修程：</span><span class="form-text">{{trainBaseInfo.zxxx.xaa}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">上次高级修日期：</span><span class="form-text">{{trainBaseInfo.zxxx.lae}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-control">
              <span class="form-title">上次高级修公里数：</span><span class="form-text">{{trainBaseInfo.zxxx.lak}}</span>
            </div>
          </el-col>
        </el-row>
        </transition>
        <transition :name="animationName" v-on:after-enter="nextShow(8)">
        <el-row v-show="shows[8]" :gutter="12" :justify="'start'" :align="'middle'" :type="'flex'" class="table-row table-row-odd">
          <el-col :span="8" >
            <div class="form-control">
              <span class="form-title">下次高级修程：</span><span class="form-text">{{trainBaseInfo.zxxx.xcgjx}}</span>
            </div>
          </el-col>
        </el-row>
        </transition>
      </div>
    </div>
  </tech-frame>
</template>

<script>
  import TechFrame from '../base/TechFrame'
  import mdpInterfaceService from '../../service/MdpInterfaceService'
  import { mapGetters } from 'vuex'
  import SlashTitle from '../base/SlashTitle'

  export default {
    name: "TrainSetting",
    components: {SlashTitle, TechFrame},
    data() {
      return {
        shows: [false, false, false, false, false, false, false, false, false],
        animationName:"el-zoom-in-center",
        trainBaseInfo: {
          trainCarFileInfo: {},
          trainInUse: {},
          gzzr: {},
          zxxx: {}
        }
      }
    },
    props: {
      frameInitOptions: {
        type: Object,
        default: () => {
          return {
            size: {width: 5 * 150, height: 150 * 2},
            blurDistance: 3,
            connerClip: [0, 0,  0, 0]
          }
        }
      }
    },
    computed:{
      ...mapGetters([
        'getTrainSelected'
      ])
    },
    watch: {
      getTrainSelected (newTrain) { //newv 就是改变后的trainSelected值

        this.getRemoteData(newTrain)
      }
    },
    methods: {
      getRemoteData(train) {

        mdpInterfaceService.getTrainBaseInfo(this, {params: {trainNo: train},
          onSuccess: (resp) => {
            console.log(resp)

            this.discardAnimation()
            this.trainBaseInfo = resp
            this.nextShow(-1)

          }, onError: (error) => {
            //console.log(error)
            this.discardAnimation()

          }
        })
      },
      discardAnimation() {
        this.shows.forEach((show, idx) => this.$set(this.shows, idx, false))
        console.log(this.shows)

      },
      nextShow(idx){

        setTimeout(() => {

          if(idx++ < this.shows.length){
            this.$set(this.shows, idx, true)
          }
          //console.log("show", idx)

        }, 10)
      }
    },
    mounted () {

    }

  }
</script>

<style scoped>

  .title {
    padding-top: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #10ffeb;
    display: inline-block;
  }

  .base-info-content {
    width: 90%;
    display: inline-block;
  }

  .section-title {
    display: flex;
    margin: 20px 0;
  }

  .section-title > span{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    width: 150px;
    border: 1px solid #10ffeb;
    color: #10ffeb;
    background-color: #183561;
    border-radius: 2px;
  }

  .table-row {
    height: 50px;
    border: 1px solid #1d2d47;
  }

  .table-row-odd {
    background-color: #192d4c;
  }

  .table-row-even {
    background-color: #193056;
  }

  .form-control {
    text-align: left;
    padding-left: 10px;
  }

  .form-title {
    color: #fff;
    font-weight: bold;
  }

  .form-text {
    color: #10ffeb;

  }


</style>

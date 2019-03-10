<template>
  <div class="wrap-table-div">
    <ul class="rolling-table-ul" :style="columnSetting.overallStyle">
      <li  class="title-li" :style="columnSetting.titleRowStyle">
        <div class="rolling-table-row-wrapper" :style="{height: columnSetting.columnHeight}">
          <div v-if="columnSetting.needIdx" :style="{width: columnSetting.idxOccupancyRate + '%'}"></div>
          <template v-for="column in columnSetting.columns">
            <div :style="column.titleStyle ? column.titleStyle : column.style">{{column.title}}</div>
          </template>
        </div>
      </li>
      <template v-for="item in dataItems">
        <li class="data-li" @click="onClick($event,item)" :style="item.idx % 2 === 1 ? columnSetting.oddRowStyle : columnSetting.evenRowStyle">
          <div class="rolling-table-row-wrapper" :style="{height: columnSetting.columnHeight, 'min-height': columnSetting.columnMinHeight}">
            <div v-if="columnSetting.needIdx" :style="{width: columnSetting.idxOccupancyRate + '%'}">
              <i :content="item.idx">{{item.idx}}</i>
            </div>
            <template v-for="column in columnSetting.columns">
              <div :style="column.style">
                <template v-if="item[column.key].special">
                  <div :style="item[column.key].style">{{item[column.key].value}}</div>
                </template>
                <template v-if="!item[column.key].special">
                  {{item[column.key]}}
                </template>
              </div>
            </template>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "WrapTable",
    props: {
      columnSetting: {
        type: Object,
        default: () => {
          return {
            needIdx: false,
            idxOccupancyRate: 5,
            overallStyle: null,
            columnHeight: '45px',
            columnMinHeight: '20px',
            titleRowStyle: null,
            oddRowStyle: null,
            evenRowStyle: null,
            columns: [
              {title: '', key: 'mark', style: {width: '5%'}},
              {title: '服务站', key: 'station', style: {width: '15%'}},
              {title: '配置', key: 'alloc', style: {width: '20%'}},
              {title: '运行', key: 'operation', style: {width: '15%'}},
              {title: '在线', key: 'online', style: {width: '15%'}},
              {title: '离线', key: 'offline', style: {width: '10%'}},
              {title: '故障', key: 'fault', style: {width: '15%', color: 'red'}, titleStyle: {color: 'white', width: '25%'}},
              {title: '来源', key: 'source', style: {width: '25%'}}
            ]
          };
        }
      },
      dataItems: {
        type: Array,
        default: () => {
          return [
            { mark: {special: true, style: {'background-color': '#c43838', height:'12px', width:'16px'}},station: '虹桥', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '平台预警' },
            { mark: {special: true, style: {'background-color': '#cf8c2d', height:'12px', width:'16px'}},station: '南翔', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '平台预警' },
            { mark: {special: true, style: {'background-color': '#cdcd40', height:'12px', width:'16px'}},station: '杭州', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '--' },
            { mark: {special: true, style: {'background-color': '#5ab943', height:'12px', width:'16px'}},station: '南京南', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '平台预警' },
            { mark: {special: true, style: {'background-color': '#cf8c2d', height:'12px', width:'16px'}},station: '合肥', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '平台预警' },
            { mark: {special: true, style: {'background-color': '#c43838', height:'12px', width:'16px'}},station: '徐州东', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '--' },
            { mark: {special: true, style: {'background-color': '#5ab943', height:'12px', width:'16px'}},station: '北京南', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '平台预警' },
            { mark: {special: true, style: {'background-color': '#cdcd40', height:'12px', width:'16px'}},station: '西安', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '平台预警' },
            { mark: {special: true, style: {'background-color': '#5ab943', height:'12px', width:'16px'}},station: '重庆', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '平台预警' },
            { mark: {special: true, style: {'background-color': '#cdcd40', height:'12px', width:'16px'}},station: '成都', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '平台预警' },
            { mark: {special: true, style: {'background-color': '#5ab943', height:'12px', width:'16px'}},station: '长沙', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '平台预警' },
            { mark: {special: true, style: {'background-color': '#5ab943', height:'12px', width:'16px'}},station: '广州', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '平台预警' },
            { mark: '',station: '合计', alloc: '233', operation: '123', online: '23', offline: '23', fault: '23', source: '' },
          ];
        }
      }
    },
    methods: {
      onClick () {

      }
    }
  }
</script>

<style scoped>
  .wrap-table-div {
    color: white;

  }

  .rolling-table-ul{
    list-style: none;
    font-size: 18px;
    padding-left: 0;
    margin-top: 5px;
    overflow: hidden;

  }

  .rolling-table-ul > li{
    position: relative;
  }

  .rolling-table-ul > li.title-li{
    color: #fff;

    font-size: 20px;
    font-weight: bolder;
    z-index: 2;
  }

  .rolling-table-row-wrapper{
    width: 100%;
    display: inline-flex;
    height: auto;
  }

  .rolling-table-ul > li.data-li{
    overflow: hidden;
    font-weight: lighter;
  }

  .rolling-table-row-wrapper > div{
    display: flex;
    justify-content: center;
    align-items: center;
    word-break: break-all;
  }

</style>

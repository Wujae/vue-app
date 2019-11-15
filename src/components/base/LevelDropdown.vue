<template>
  <div class="level-dropdown-holder">
    <div :style="{width: width+ 'px'}" :class="{'holder-border': !showPopper}">
      <span class="level-dropdown-link" @click="handleClick($event)"
            :style="Object.assign({width: (showPopper? width: width - 2) + 'px'}, selectedItem.style )">
      {{selectedItem.name ? selectedItem.name : placeHolder}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <transition name="el-zoom-in-top">
        <ul class="level-dropdown-menu" v-show="showPopper" :style="{width: width+ 'px'}">
          <li @click="handleClick($event, idx)" v-for="(item, idx) in dropDownItems" :style="item.style" :key="item.key">{{item.name}}<i class="dropdown-item-placeholder"></i></li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>

  export default {
    name: "LevelDropdown",
    data () {
      return {
        showPopper: false,
        selectedItem:  {
          key: null,
          name: null,
          style: {'background-color': '#1b3b65', color: '#74859c'}
        }
      };
    },
    props: {
      placeHolder: {
        type: String,
        default: "下拉选择  "
      },
      width: {
        type: Number,
        default: 120,
      },
      command: {},
      dropDownItems: {
        type: Array,
        default: () => {
          return [
            {
              key: 'A',
              name: 'A 级  251',
              style: {'background-color': '#bf3131', color: '#fff'}
            },
            {
              key: 'B',
              name: 'B 级  251',
              style: {'background-color': '#c08528', color: '#fff'}
            },
            {
              key: 'C',
              name: 'C 级  251',
              style: {'background-color': '#ac990a', color: '#fff'}
            },
          ]
        }
      }
    },
    watch: {
      dropDownItems(newv){
        if(newv && newv.length){

          for(let i = 0; i < newv.length; i++) {
            if (newv[i].selected) {
              this.selectedItem = newv[i];
              return;
            }
          }
          this.selectedItem = newv[0]
        }
      },
      selectedItem(newv) {

        this.$emit('levelSelected', newv);
      }
    },
    methods: {
      handleClick ($event, idx) {
        this.showPopper = !this.showPopper

        if(idx > -1){

          this.selectedItem = this.dropDownItems[idx]

          setTimeout( () =>{
            this.$emit('level-clicked', this.selectedItem)
          }, 10)

        }

      }
    },
    created () {

    },

    mounted () {
      if(this.dropDownItems && this.dropDownItems.length)
      this.selectedItem = this.dropDownItems[0]

    }
  }
</script>

<style scoped>

  .level-dropdown-holder {
    float: left;
    padding: 8px;
    position: relative;
    cursor: pointer;
    font-size: 14px;
  }

  .holder-border {
    border: 1px solid #23a2da;
    border-radius: 2px;
  }

  .level-dropdown-link {
    display: inline-block;
  }

  .level-dropdown-menu {
    position: absolute;
    z-index: 10;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    list-style: none;
  }

  .level-dropdown-menu > li:hover{
    opacity: .8;
  }

  .dropdown-item-placeholder{
    width: 21px;
    display: inline-block;
  }
</style>

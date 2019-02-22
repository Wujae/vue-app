<template>
  <div class="calendar">
    <div class="month-switcher">
      <button type="button" aria-label="前一年"
              class="month-switcher__icon-btn month-switcher__prev-btn el-icon-d-arrow-left" @click="addYear(-1)"></button>
      <button type="button" aria-label="上个月"
              class="month-switcher__icon-btn month-switcher__prev-btn el-icon-arrow-left" @click="addMonth(-1)"></button>
      <span role="button" class="month-switcher__header-label" @click="delegateYearPicker($event)">
        {{year}} 年
        <el-date-picker v-model="yearStr" class="month-switcher__year_picker" type="year" :clearable="false" prefix-icon="null"
          ref="yearPicker" format="yyyy 年" value-format="yyyy"></el-date-picker>
      </span>
      <span role="button" class="month-switcher__header-label" @click="delegateMonthPicker($event)">
        {{month}} 月
        <el-select ref="monthPicker" v-model="month" class="month-switcher__month_picker">
          <el-option v-for="item in 12" :key="item" :label="item + '月'" :value="item">
            <span style="float: left">{{item}} 月</span>
          </el-option>
        </el-select>
      </span>
      <button type="button" aria-label="后一年"
              class="month-switcher__icon-btn month-switcher__next-btn el-icon-d-arrow-right" @click="addYear(1)"></button>
      <button type="button" aria-label="下个月"
              class="month-switcher__icon-btn month-switcher__next-btn el-icon-arrow-right" @click="addMonth(1)"></button>
    </div>
    <div class="week-day">
      <ul class="week-day__days">
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
    </div>
    <div class="date-grid">
      <div class="date-grid__day" v-for="(item, index) in dayArray" :key="'ddt' + index">
        <el-button class="date-grid__day__btn" circle v-if="item.dateValue">{{item.dateValue}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  data () {
    return {
      yearStr: null,
      year: null,
      month: null
    }
  },
  computed: {
    dayArray () {
      let dateArray = []

      let firstDay = new Date(`${this.year}-${this.month}-01`)
      let weekday = firstDay.getDay()

      for (let i = weekday; i > 0; i--) {
        dateArray.push({
          date: null,
          dateValue: ''
        })
      }

      let endDate = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
      // console.log(endDate.getDate())

      for (let j = 1; j <= endDate.getDate(); j++) {
        dateArray.push({
          date: null,
          dateValue: '' + j
        })
      }

      // console.log(dateArray)

      return dateArray
    }
  },
  created () {
    let now = new Date()
    this.year = now.getFullYear()
    this.month = now.getMonth() + 1
  },
  watch: {
    yearStr (curVal, oldVal) {
      // console.log(curVal, oldVal)
      this.year = parseInt(curVal)
    },
    year (cv, ov) {
      // console.log(cv, ov)
      this.yearStr = cv.toString()
    }
  },
  methods: {
    delegateYearPicker ($event) {
      this.$refs.yearPicker.showPicker()
    },
    delegateMonthPicker ($event) {
      this.$refs.monthPicker.toggleMenu()
    },
    addMonth (delta) {
      if (Number.isInteger(delta)) {
        let newMonth = this.month + delta

        if (newMonth > 12) {
          this.year += parseInt(newMonth / 12)
          this.month = newMonth > 12 ? newMonth % 12 : newMonth
        } else if (newMonth <= 0) {
          let coif = 1 - parseInt(newMonth / 12)

          this.year -= coif
          this.month = coif * 12 + newMonth
        } else {
          this.month = newMonth
        }
      }
    },
    addYear (delta) {
      if (Number.isInteger(delta)) {
        this.year += delta
      }
    }
  }
}
</script>

<style scoped type="text/scss">
  .calendar {
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  .month-switcher {
    width: 100%;
    background-color: #2c3e50;
    flex: 0 1 50px;
    padding: 0 15px;
  }

  .month-switcher *:hover {
    color: #42b983;
  }

  .month-switcher__icon-btn {
    font-size: 24px;
    color: #ffffff;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
    margin-top: 14px;
  }

  .month-switcher__prev-btn {
    float: left;
    padding-right: 20px;
  }

  .month-switcher__next-btn {
    float: right;
    padding-left: 20px;
  }

  .month-switcher__header-label {
    font-size: 28px;
    font-weight: lighter;
    padding: 0 5px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    color: #ffffff;
  }

  .month-switcher__year_picker{
    height: 0;
    width: 0;

    overflow: hidden;
    left: -90px;
    position: relative;
  }

  .month-switcher__month_picker{
    height: 0;
    width: 0;

    overflow: hidden;
    left: -60px;
    top: -45px;
    position: relative;

  }

  .week-day {
    width: 100%;
    background-color: #42b983;
    flex: 0 1 50px;
    padding: 0 25px;
  }

  .week-day__days {
    display: flex;
    border-bottom: 1px solid #2c3e50;
    padding: 15px 0;
  }

  .week-day__days>li {
    text-align: left;
    padding-left: 28px;
    flex: 1 1 14.28%;
    list-style: none;
    float: left;
    color: white;
  }

  .date-grid {
    width: 100%;
    background-color: #42b983;
    flex: 10 10 90%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 25px;

  }

  .date-grid__day {
    color: white;
    flex: 0 0 14.28%;
    text-align: left;
    padding: 15px;
  }

  .date-grid__day__btn {
    background-color: #2c3e50;
    border-color: #2c3e50;
    color: white;
    width: 40px;
    height: 40px;
  }
</style>

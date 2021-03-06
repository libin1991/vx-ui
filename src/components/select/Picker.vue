<template>
  <popup :open="open" :indoc="true" :history="history" :direction="direction" @close="handleClose" @open="handleOpen">
    <div slot="header" v-if="max != 1" :class="['vx-flexbox','vx-option-picker--header']">
      <button type="button" class="vx-option-picker--cancel" @click="handleClose">{{cancelText}}</button>
      <button type="button" :class="['vx-flexbox--item','vx-option-picker--placeholder']">{{myTitle}}</button>
      <button type="button" :class="['vx-option-picker--confirm',{'is-disabled':!myValue.length}]" @click="handleConfirm">{{confirmText}}</button>
    </div>
    <div class="vx-option-picker">
      <checkbox-group ref="checkboxGroup" :validate-event="false" :max="max" @change="handleChange" :value="myValue">
        <checkbox
          v-for="(item,index) in myOptions"
          :value="item.value"
          :key="index"
          :disabled="item.disabled"
          :parentValue="myValue"
          :max="max"
          >
          <div v-html="item.html || item.label"></div>
        </checkbox>
      </checkbox-group>
    </div>
  </popup>
</template>

<script>
import Popup from '../popup'
import {CheckboxGroup} from '../checkbox'
import Checkbox from './Checkbox'

export default {
  componentName: 'OptionGroupPicker',
  components: {
    Popup,
    Checkbox,
    CheckboxGroup
  },
  props: {
    ...CheckboxGroup.props,
    open: {
      type: Boolean,
      default: false
    },
    history: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array
    },
    title: {
      type: String,
      default: '请选择'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    direction: {
      type: String,
      default: 'bottom'
    }
  },
  computed: {
    myTitle () {
      let title = this.title
      if (this.myValue.length >= this.max && this.max > 1) {
        title = `选项不能超过${this.max}个`
      }
      return title
    }
  },
  watch: {
    options (value) {
      this.myOptions = value
    },
    value (value) {
      this.myValue = value
    }
  },
  data () {
    let options = this.options
    if (this.options.length > 30) {
      options = this.options.slice(0, 30)
    }
    return {
      myOptions: options,
      myValue: this.value
    }
  },
  beforeDestroy () {
    window.$$$$picker = null
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    handleConfirm () {
      this.open && this.$emit('input', this.myValue).$emit('change', this.myValue)
    },
    handleChange (value) {
      if (this.max === 1) {
        this.open && this.$emit('input', value[0]).$emit('change', value[0])
      } else {
        this.myValue = value
      }
    },
    handleOpen () {
      window.$$$$picker = this
      requestAnimationFrame(() => {
        this.myOptions = this.options
      })
    }
  }
}
</script>

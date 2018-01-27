import '../utils/polyfill'
import Vue from 'vue'
import XButton from './button'
import XInput from './input'
import Password from './password'
import Range from './range'
import XTextarea from './textarea'
import XSwitch from './switch'
import {Checkbox, CheckboxGroup} from './checkbox'
import {Radio, RadioGroup} from './radio'
import XSelect from './select'
import {Checker, CheckerGroup} from './checker'
import {XForm, XFormItem} from './form'
import {Actionsheet, ActionsheetItem} from './actionsheet'
import {Swiper, SwiperItem} from './swiper'
import {Marquee, MarqueeItem} from './marquee'
import {Tab, TabItem} from './tab'
import {Tabbar, TabbarItem} from './tabbar'
import {Sidebar, SidebarItem} from './sidebar'
import {Flexbox, FlexboxItem} from './flexbox'
import {ButtonTab, ButtonTabItem} from './button-tab'
import Divider from './divider'
import Group from './group'
import Cell from './cell'
import Confirm from './confirm'
import Prompt from './prompt'
import Alert from './alert'
import Popup from './popup'
import PopupPicker from './popup-picker'
import Toast from './toast'
import XImg from './img'
import ListView from './list-view'
import Ripple from './ripple'
import Search from './search'
import XNav from './nav'
import Preview from './preview'
import Spinner from './spinner'
import Picker from './picker'
import Badge from './badge'
import Swipeout from './swipeout'
import Rater from './rater'
import DatetimePicker from './datetime-picker'
import DaterangePicker from './daterange-picker'
import Datetime from './datetime'
import Daterange from './daterange'
import Popover from './popover'
import Sticky from './sticky'
import Icon from './icon'
import {Carousel, CarouselItem} from './carousel'

/*
对Date的扩展，将 Date 转化为指定格式的String
月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
(new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
(new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
*/
Date.prototype.format = function (fmt = 'yyyy-MM-dd') { // author: meizz
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

Vue.mixin({
  props: {
    $cssPrefix: {
      type: String,
      default: 'v-'
    }
  }
})

let components = [
  Actionsheet,
  ActionsheetItem,
  Swiper,
  SwiperItem,
  Marquee,
  MarqueeItem,
  Tab,
  TabItem,
  Tabbar,
  TabbarItem,
  Sidebar,
  SidebarItem,
  Flexbox,
  FlexboxItem,
  ButtonTab,
  ButtonTabItem,
  XButton,
  XInput,
  Password,
  Range,
  XForm,
  XFormItem,
  XTextarea,
  XSwitch,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  XSelect,
  Checker,
  CheckerGroup,
  Divider,
  Group,
  Cell,
  Confirm,
  Prompt,
  Alert,
  Popup,
  PopupPicker,
  Toast,
  XImg,
  ListView,
  Ripple,
  Search,
  XNav,
  Preview,
  Spinner,
  Picker,
  Badge,
  Swipeout,
  Rater,
  DatetimePicker,
  DaterangePicker,
  Datetime,
  Daterange,
  Popover,
  Sticky,
  Icon,
  Carousel,
  CarouselItem
]

const install = (Vue) => {
  components.map(component => {
    component.name && Vue.component(component.name, component)
  })
}

if (process.browser) {
  ((w) => {
    w.$toast = (_props, mounted = document.body) => {
      let props = Object.assign({
        open: true,
        onClose: () => {
          return true
        }
      }, _props)
      let node = document.createElement('div')
      mounted.appendChild(node)
      let vue = new Vue({ //eslint-disable-line
        el: node,
        render (createElement) {
          let content = props.content
          return createElement(Toast, {
            props: props,
            on: {
              'on-close': this.handleClose
            },
            scopedSlots: {
              default: props => createElement('div', content)
            }
          })
        },
        data: {props: props},
        methods: {
          handleClose: () => {
            props.open = props.onClose() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          }
        },
        destroyed: () => {
          requestAnimationFrame(() => {
            vue.$el.remove()
          })
        }
      })
      return vue
    }

    w.$alert = (_props, mounted = document.body) => {
      let props = Object.assign({
        open: true,
        onConfirm: () => {
          return true
        }
      }, _props)
      let node = document.createElement('div')
      mounted.appendChild(node)
      let vue = new Vue({ //eslint-disable-line
        el: node,
        render (createElement) {
          let content = props.content
          return createElement(Alert, {
            props: props,
            on: {
              'on-confirm': this.handleConfirm,
              'on-close': this.handleClose
            },
            scopedSlots: {
              default: props => createElement('div', content)
            }
          })
        },
        data: {props: props},
        methods: {
          handleConfirm: () => {
            props.open = props.onConfirm() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          },
          handleClose: () => {
            props.open = props.onCancel() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          }
        },
        destroyed: () => {
          requestAnimationFrame(() => {
            vue.$el.remove()
          })
        }
      })
      return vue
    }

    w.$confirm = (_props, mounted = document.body) => {
      let props = Object.assign({
        open: true,
        onConfirm: () => {
          return true
        },
        onCancel: () => {
          return true
        }
      }, _props)
      let node = document.createElement('div')
      mounted.appendChild(node)
      let vue = new Vue({ //eslint-disable-line
        el: node,
        render (createElement) {
          let content = props.content
          return createElement(Confirm, {
            props: props,
            on: {
              'on-confirm': this.handleConfirm,
              'on-close': this.handleClose
            },
            scopedSlots: {
              default: props => createElement('div', content)
            }
          })
        },
        data: {props: props},
        methods: {
          handleConfirm: () => {
            props.open = props.onConfirm() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          },
          handleClose: () => {
            props.open = props.onCancel() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          }
        },
        destroyed: () => {
          requestAnimationFrame(() => {
            vue.$el.remove()
          })
        }
      })
      return vue
    }
    w.$prompt = (_props, mounted = document.body) => {
      let props = Object.assign({
        open: true,
        disabled: true,
        onConfirm: () => {
          return true
        },
        onCancel: () => {
          return true
        },
        onChange: (value) => {
          if (value && value.trim()) {
            return false
          } else {
            return true
          }
        }
      }, _props)
      let node = document.createElement('div')
      mounted.appendChild(node)
      let vue = new Vue({ //eslint-disable-line
        el: node,
        render (createElement) {
          let content = props.content
          return createElement(Prompt, {
            props: props,
            on: {
              'on-confirm': this.handleConfirm,
              'on-close': this.handleClose,
              'on-change': this.handleChange
            },
            scopedSlots: {
              default: props => createElement('div', content)
            }
          })
        },
        data: {props: props},
        methods: {
          handleConfirm: () => {
            props.open = props.onConfirm() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          },
          handleClose: () => {
            props.open = props.onCancel() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          },
          handleChange: (value) => {
            props.disabled = props.onChange(value)
          }
        },
        destroyed: () => {
          requestAnimationFrame(() => {
            vue.$el.remove()
          })
        }
      })
      return vue
    }
  })(window)
}

export {
  install,
  Actionsheet,
  ActionsheetItem,
  Swiper,
  SwiperItem,
  Marquee,
  MarqueeItem,
  Tab,
  TabItem,
  Tabbar,
  TabbarItem,
  Sidebar,
  SidebarItem,
  Flexbox,
  FlexboxItem,
  ButtonTab,
  ButtonTabItem,
  XButton,
  XInput,
  Password,
  Range,
  XForm,
  XFormItem,
  XTextarea,
  XSwitch,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  XSelect,
  Checker,
  CheckerGroup,
  Divider,
  Group,
  Cell,
  Confirm,
  Prompt,
  Alert,
  Popup,
  PopupPicker,
  Toast,
  XImg,
  ListView,
  Ripple,
  Search,
  XNav,
  Preview,
  Spinner,
  Picker,
  Badge,
  Swipeout,
  Rater,
  DatetimePicker,
  DaterangePicker,
  Datetime,
  Daterange,
  Popover,
  Sticky,
  Icon,
  Carousel,
  CarouselItem
}

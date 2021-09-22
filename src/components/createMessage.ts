/**
 * 使用createMessage函数创建Message弹窗组件
 */

import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType) => {
  // 生成Message组件的实例
  const messageInstance = createApp(Message, {
    message,
    type
  })
  // 生成div节点并挂载组件
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  // 卸载组件并移出节点
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(mountNode)
  }, 2000)
}

export default createMessage

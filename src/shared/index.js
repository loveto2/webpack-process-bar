const emptyAction = () => {
  // 警告：提示当前使用的是空 Action
  console.error('这个action是空的')
}
class Actions {
   // 默认值为空 Action
  actions = {
    setGlobalState: emptyAction,
    onGlobalStateChange: emptyAction,
  }

  // 设置 actions
  setActions(actions) {
    if (actions) {
      const { setGlobalState, onGlobalStateChange } = actions
      this.actions.setGlobalState = setGlobalState
      this.actions.onGlobalStateChange = onGlobalStateChange
    }
  }

  // 映射
  setGlobalState(...args) {
    return this.actions.setGlobalState?.(...args)
  }

  //映射
  onGlobalStateChange(...args) {
    return this.actions.onGlobalStateChange?.(...args)
  }
}

const actions = new Actions()

export default actions
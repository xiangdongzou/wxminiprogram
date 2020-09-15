Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImgs: [],
    textVal: ""
  },
  UpLoadImgs: [],
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['origin', 'compressed'],
      sourceType: ['album', 'camara'],
      success: (result) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    })
  },
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  handleFormSubmit() {
    const { textVal, chooseImgs } = this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '正在上传中',
      mask: true
    })
    chooseImgs.forEach((v, i) => {
      wx.uploadFile({
        filePath: v,
        name: 'file',
        url: 'url',
        success: (result) => {
          let url = json.parse(result.data);
          this.UpLoadImgs.push(url);
          wx.hideLoading();
          this.setData({
            textVal: "",
            chooseImgs: []
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    })
  }
})
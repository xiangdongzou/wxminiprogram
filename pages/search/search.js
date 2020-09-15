import { request } from "../../request/index.js";
Page({

  data: {
    goods: [],
    isFocus: false,
    inpValue: ""
  },
  TimeId: -1,
  handleInput(e) {
    const { value } = e.detail;
    if (!value.trim()) {
      clearTimeout(this.TimeId);
      this.setData({

        goods: [],
        isFocus: false
      })
      return
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  async qsearch(query) {
    const res = await request({ url: "/goods/qsearch", data: { query } });
    this.setData({
      goods: res
    })
  },
  handleCancel() {
    clearTimeout(this.TimeId);
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: []
    })
  }
})
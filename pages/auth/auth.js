import { request } from "../../request/index.js";
import { login } from "../../utils/asyncWx.js"
Page({
  async handleGetUserInfo(e) {
    console.log(e);
    const { encryptedData, rawData, iv, signature } = e.detail;
    const { code } = await login();
    const loginParams = { encryptedData, rawData, iv, signature, code };
    const res = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
    console.log(res);
  }
})
"use strict";

loader.define(function () {
  var pageview = {};

  pageview.init = function () {
    var uiSlide = bui.slide({
      id: "#slide1",
      height: 300,
      autopage: true,
      loop: true,
      cross: true
    });
  }; // 初始化


  pageview.init(); // 输出模块

  return pageview;
});
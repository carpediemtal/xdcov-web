webpackJsonp([362], {
    COpJ: function (t, i, e) {
        "use strict";
        Object.defineProperty(i, "__esModule", {value: !0});
        var n = e("4YfN"), s = e.n(n), a = e("aA9S"), o = e.n(a), c = e("3cXf"), r = e.n(c), l = {
                city: "",
                province: "",
                address: "",
                geo_api_info: "",
                area: "",
                tw: "",
                ymtys: "",
                sfzx: 0,
                sfcyglq: 0,
                sfyzz: 0,
                qtqk: "",
                askforleave: "0"
            }, d = {
                data: function () {
                    return {
                        msg: "",
                        icontip: "",
                        show: !1,
                        img: "",
                        dec: "",
                        showctrl: !1,
                        nodataimg: "暂无信息",
                        nodataurl: "/site/static/images/nodata.png",
                        nonetworkimg: !1,
                        nonetworktext: "",
                        date: "",
                        setting: {img: "", desc: "", copyright: "", title: ""},
                        hasFlag: !1,
                        xgh: "",
                        info: l,
                        uinfo: {realname: "", role: {}},
                        ajaxLock: !1,
                        readonly: !1,
                        Allprovice: allProvinces,
                        Allcity: [],
                        Allarea: [],
                        group_id: "",
                        ontime: !1,
                        realonly: !1,
                        jtszd: {myprovice: "", mycity: "", myarea: ""}
                    }
                }, methods: {
                    btnhide: function () {
                        this.msg = "", this.icontip = ""
                    }, blurhandler: function () {
                        if (window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                            var t, i;
                            i = setInterval(function () {
                                t = document.documentElement.scrollTop || document.body.scrollTop, t -= 1, window.scrollTo(0, t), clearInterval(i)
                            }, 100)
                        }
                    }, isNullStr: function (t) {
                        if ("" == t) return !0;
                        return new RegExp("^[ ]+$").test(t)
                    }, locatComplete: function (t) {
                        this.waploading("hide"), this.info.geo_api_info = r()(t), this.info.address = t.formattedAddress, this.info.province = t.addressComponent.province, this.info.city = t.addressComponent.city, "" == $.trim(t.addressComponent.city) && ["北京市", "上海市", "重庆市", "天津市"].indexOf(t.addressComponent.province) > -1 ? this.info.city = t.addressComponent.province : "" === $.trim(t.addressComponent.city) ? this.info.city = t.addressComponent.district : this.info.city = t.addressComponent.city, "" === $.trim(t.addressComponent.city) ? this.info.area = t.addressComponent.province + " " + t.addressComponent.district : this.info.area = t.addressComponent.province + " " + t.addressComponent.city + " " + t.addressComponent.district, console.log(t, "dingwei "), console.log(this.info.area, "this.info.area", this.info)
                    }, locatError: function (t) {
                        this.waploading("hide"), this.info.geo_api_info = r()(t), this.info.address = "", this.info.area = "", this.info.province = "", this.info.city = "", this.appFetch({
                            url: "ncovSaveError",
                            method: "POST",
                            data: {error: r()(t)}
                        }, function (t) {
                        }, "locationErr"), this.wapalert("获取位置信息失败")
                    }, getLocation: function (t) {
                        var i = this, e = new AMap.Map("iCenter");
                        e.plugin("AMap.Geolocation", function () {
                            var n = new AMap.Geolocation({
                                enableHighAccuracy: !0,
                                timeout: 1e4,
                                maximumAge: 0,
                                convert: !0,
                                showButton: !0,
                                buttonPosition: "LB",
                                buttonOffset: new AMap.Pixel(10, 20),
                                panToLocation: !1,
                                zoomToAccuracy: !1
                            });
                            e.addControl(n), !t && i.waploading("show", "获取地理位置中..."), n.getCurrentPosition(), AMap.event.addListener(n, "complete", i.locatComplete), AMap.event.addListener(n, "error", i.locatError)
                        })
                    }, handleChangeCity: function (t) {
                        for (var i, e = 0; e < this.Allprovice.length; e++) this.jtszd.myprovice == this.Allprovice[e].name && (i = e);
                        void 0 != i && (this.Allcity = this.Allprovice[i].city), 1 != t && (this.info.province = this.jtszd.myprovice, this.jtszd.mycity = "", this.info.city = "")
                    }, handleChangeArea: function (t) {
                        for (var i, e = 0; e < this.Allcity.length; e++) this.jtszd.mycity == this.Allcity[e].name && (i = e);
                        void 0 != i && (this.Allarea = this.Allcity[i].districtAndCounty), 1 != t && (this.jtszd.myarea = "", this.info.city = this.jtszd.mycity, this.info.area = this.jtszd.myprovice + " " + this.jtszd.mycity)
                    }, changearea: function () {
                        this.info.area = this.jtszd.myprovice + " " + this.jtszd.mycity + " " + this.jtszd.myarea
                    }, confirm: function () {
                        var t = this;
                        if (this.blurhandler(), !this.valid(this.info)) return !1;
                        this.wapconfirm("请确认信息是否全部正确？（Please confirm that all the information is correct?）", "确认</br>(Confirm)", "再看看</br>(Check again)", function () {
                            t.save()
                        })
                    }, save: function () {
                        var t = this;
                        this.info;
                        try {
                            var i, e = {
                                sfzx: this.info.sfzx,
                                tw: this.info.tw,
                                area: this.info.area,
                                city: this.info.city,
                                province: this.info.province,
                                address: this.xgh ? "" : this.info.address,
                                geo_api_info: this.xgh ? "" : this.info.geo_api_info,
                                sfcyglq: this.info.sfcyglq,
                                sfyzz: this.info.sfyzz,
                                qtqk: this.info.qtqk,
                                ymtys: this.info.ymtys
                            };
                            if (this.ajaxLock) return this.wapalert("数据提交中(Submitting, please wait)"), !1;
                            this.ajaxLock = !0, this.waploading("", "数据提交中, 请稍候(Submitting, please wait)..."), this.xgh && (i = {
                                xgh: this.xgh,
                                group_id: this.group_id
                            }), this.appFetch({
                                url: "xisuncovfudanDailyupSave",
                                method: "POST",
                                data: s()({}, e, i)
                            }, function (i) {
                                t.ajaxLock = !1, t.waploading("hide"), 0 == i.e ? ("" == t.xgh && (t.realonly = !0), t.msg = "提交信息成功(Submitted)", t.icontip = "success") : (t.msg = i.m, t.icontip = "err")
                            }, function (i) {
                                t.ajaxLock = !1, t.waploading("hide"), t.msg = "网络错误！", t.icontip = "err"
                            })
                        } catch (t) {
                            alert(t)
                        }
                    }, valid: function (t) {
                        return "" == this.xgh && (this.isNullStr(t.area) || this.isNullStr(t.province) || this.isNullStr(t.city)) ? (this.wapalert("未获取到地理位置（Your location could not be determined）", !1, function () {
                            $("[name=area]").focus(), $("[name=area]").get(0).scrollIntoView(!1)
                        }), !1) : this.xgh && this.isNullStr(t.province) ? (this.wapalert("请选择省（Please choose province）", !1, function () {
                            $("[name=jtszd]").get(0).scrollIntoView(!1)
                        }), !1) : this.xgh && this.isNullStr(t.city) ? (this.wapalert("请选择市（Please choose city）", !1, function () {
                            $("[name=jtszd]").get(0).scrollIntoView(!1)
                        }), !1) : this.xgh && this.Allarea.length > 0 && this.isNullStr(this.jtszd.myarea) ? (this.wapalert("请选择县/区（Please choose area）", !1, function () {
                            $("[name=jtszd]").get(0).scrollIntoView(!1)
                        }), !1) : "" == t.tw ? (this.wapalert("请选择今日体温范围（Please choose your temperature range today）", !1, function () {
                            $("[name=tw]").get(0).scrollIntoView(!1)
                        }), !1) : "" !== t.ymtys || (this.wapalert("请选择今日西安“一码通”颜色", !1, function () {
                            $("[name=ymtys]").get(0).scrollIntoView(!1)
                        }), !1)
                    }, getsetting: function () {
                        var t = this;
                        this.appFetch({url: "xisuncovfudanDailyupsetting", method: "GET", data: {}}, function (i) {
                            if (0 == i.e) {
                                t.getInfo(t.xgh);
                                var e = i.d;
                                t.setting.img = e.image, t.setting.desc = e.desc, document.title = e.title
                            } else t.img = "", t.dec = "", t.show = !1, t.nonetworkimg = !0, t.nonetworktext = i.e + "</br>" + i.m, t.nonetworkimg = "/site/static/images/network1.png"
                        }, function (i) {
                            t.img = "", t.dec = "", t.show = !1, t.nonetworkimg = !0, t.nonetworktext = resp.e + "</br>" + resp.m, t.nonetworkimg = "/site/static/images/network1.png"
                        }, 1)
                    }, getInfo: function (t) {
                        var i, e = this;
                        this.xgh && (i = {
                            xgh: this.xgh,
                            group_id: this.group_id
                        }), this.appFetch({url: "xisuncovfudanDailyup", method: "GET", data: i}, function (t) {
                            if (e.img = "", e.dec = "", 0 == t.e) {
                                if ("bjut" == appConfig.id) {
                                    var i = e.xgh ? "/ncov/bjutdailyup?xgh=" + e.xgh + "&group_id=" + e.group_id : "/ncov/bjutdailyup";
                                    return e.$router.replace({path: i}), !1
                                }
                                var n = t.d;
                                e.date = n.date;
                                var s, a = n.info, c = n.userinfo;
                                if (e.uinfo = n.userinfo, e.ontime = n.ontime, e.realonly = n.realonly, e.$set(e.info, "realname", c.realname), e.$set(e.info, "number", c.role.number), a) e.info = o()(e.info, a), e.info.area && e.xgh && (s = e.info.area.split(" "), e.jtszd.myprovice = s[0] ? s[0] : "", e.handleChangeCity(1), ["北京市", "上海市", "重庆市", "天津市"].indexOf(e.jtszd.myprovice) > -1 ? (e.jtszd.mycity = e.jtszd.myprovice, 2 == s.length && (e.jtszd.myarea = s[1] ? s[1] : ""), 3 == s.length && (e.jtszd.myarea = s[2] ? s[2] : ""), e.handleChangeArea(1)) : (e.jtszd.mycity = s[1] ? s[1] : "", e.jtszd.myarea = s[2] ? s[2] : "", e.handleChangeArea(1)));
                                e.show = !0, e.ontime && !e.realonly && "buaa" == appConfig.id && (e.info.tw = "")
                            } else e.show = !1, e.nonetworkimg = !0, e.nonetworktext = t.e + "</br>" + t.m, e.nonetworkimg = "/site/static/images/network1.png"
                        }, function (t) {
                            e.img = "", e.dec = "", e.show = !1, e.nonetworkimg = !0, e.nonetworktext = resp.e + "</br>" + resp.m, e.nonetworkimg = "/site/static/images/network1.png"
                        }, 1)
                    }
                }, mounted: function () {
                    this.img = "/site/static/images/load.gif", this.dec = "加载中", this.$route.query.xgh && (this.xgh = this.$route.query.xgh, this.group_id = this.$route.query.group_id ? this.$route.query.group_id : ""), this.getsetting()
                }
            }, v = e("UjTL"), m = e("fwLW"), u = e("Gs6B"),
            h = s()({name: "xidiandailyup", components: {network: v.a, pophint: m.default, hint: u.a}}, d), f = {
                render: function () {
                    var t = this, i = t.$createElement, e = t._self._c || i;
                    return e("div", {
                        staticClass: "item-buydate form-detail2 ncov-page",
                        staticStyle: {display: "block"}
                    }, [e("div", [e("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.show,
                            expression: "show"
                        }], staticClass: "form-detail form-detail2 item-buydate"
                    }, [e("section", [e("div", {staticClass: "form-detail-img"}, [e("img", {
                        staticClass: "detail-img",
                        attrs: {src: t.setting.img ? t.appConfig.imgUrl + t.setting.img : "/site/static/images/repair/logoyiq.jpg"}
                    })]), t._v(" "), e("div", {staticClass: "form-detail-desc"}, [e("div", [e("div", [t.setting.desc ? e("p", {domProps: {innerHTML: t._s(t.setting.desc)}}) : e("p", [t._v("温馨提示： 每日打卡时间段为6点-9点（上午）12点-15点（下午）")])])])]), t._v(" "), e("div", {staticClass: "form-detail-desc-line"}), t._v(" "), e("div", {staticClass: "form"}, [t.realonly ? e("div", {staticClass: "form-mask"}) : t._e(), t._v(" "), e("ul", [e("li", [e("div", {staticClass: "text"}, [t._m(0), t._v(" "), e("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.date,
                            expression: "date"
                        }],
                        attrs: {readonly: "", type: "text", placeholder: ""},
                        domProps: {value: t.date},
                        on: {
                            input: function (i) {
                                i.target.composing || (t.date = i.target.value)
                            }
                        }
                    })])]), t._v(" "), e("li", [e("div", {staticClass: "text"}, [t._m(1), t._v(" "), e("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.uinfo.realname,
                            expression: "uinfo.realname"
                        }],
                        attrs: {readonly: "", type: "text", placeholder: ""},
                        domProps: {value: t.uinfo.realname},
                        on: {
                            input: function (i) {
                                i.target.composing || t.$set(t.uinfo, "realname", i.target.value)
                            }
                        }
                    })])]), t._v(" "), e("li", [e("div", {staticClass: "text"}, [t._m(2), t._v(" "), e("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.uinfo.role.number,
                            expression: "uinfo.role.number"
                        }],
                        attrs: {readonly: "", type: "text", placeholder: ""},
                        domProps: {value: t.uinfo.role.number},
                        on: {
                            input: function (i) {
                                i.target.composing || t.$set(t.uinfo.role, "number", i.target.value)
                            }
                        }
                    })])]), t._v(" "), ["" == t.xgh ? e("li", [e("div", {
                        staticClass: "text",
                        staticStyle: {cursor: "pointer"},
                        attrs: {name: "area"},
                        on: {
                            click: function (i) {
                                return t.getLocation()
                            }
                        }
                    }, [t._m(3), t._v(" "), e("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.info.area,
                            expression: "info.area"
                        }],
                        attrs: {readonly: "", type: "text", placeholder: "点击获取地理位置"},
                        domProps: {value: t.info.area},
                        on: {
                            input: function (i) {
                                i.target.composing || t.$set(t.info, "area", i.target.value)
                            }
                        }
                    })])]) : t._e(), t._v(" "), "" != t.xgh ? e("li", [e("div", {attrs: {name: "jtszd"}}, [t._m(4), t._v(" "), e("div", {staticClass: "hcqbtn-wrap"}, [e("select", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.jtszd.myprovice,
                            expression: "jtszd.myprovice"
                        }], staticClass: "hcqbtn hcqbtn-danger", attrs: {id: "myprovice"}, on: {
                            change: [function (i) {
                                var e = Array.prototype.filter.call(i.target.options, function (t) {
                                    return t.selected
                                }).map(function (t) {
                                    return "_value" in t ? t._value : t.value
                                });
                                t.$set(t.jtszd, "myprovice", i.target.multiple ? e : e[0])
                            }, function (i) {
                                return t.handleChangeCity()
                            }]
                        }
                    }, [e("option", {attrs: {value: ""}}, [t._v("请选择")]), t._v(" "), t._l(t.Allprovice, function (i) {
                        return e("option", {domProps: {value: i.name}}, [t._v(t._s(i.name))])
                    })], 2), t._v(" "), e("select", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.jtszd.mycity,
                            expression: "jtszd.mycity"
                        }], staticClass: "hcqbtn hcqbtn-warning", attrs: {id: "mycity"}, on: {
                            change: [function (i) {
                                var e = Array.prototype.filter.call(i.target.options, function (t) {
                                    return t.selected
                                }).map(function (t) {
                                    return "_value" in t ? t._value : t.value
                                });
                                t.$set(t.jtszd, "mycity", i.target.multiple ? e : e[0])
                            }, function (i) {
                                return t.handleChangeArea()
                            }]
                        }
                    }, [e("option", {attrs: {value: ""}}, [t._v("请选择")]), t._v(" "), t._l(t.Allcity, function (i) {
                        return e("option", {domProps: {value: i.name}}, [t._v(t._s(i.name))])
                    })], 2), t._v(" "), t.Allarea.length > 0 ? e("select", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.jtszd.myarea,
                            expression: "jtszd.myarea"
                        }], staticClass: "hcqbtn hcqbtn-primary", attrs: {id: "myarea"}, on: {
                            change: [function (i) {
                                var e = Array.prototype.filter.call(i.target.options, function (t) {
                                    return t.selected
                                }).map(function (t) {
                                    return "_value" in t ? t._value : t.value
                                });
                                t.$set(t.jtszd, "myarea", i.target.multiple ? e : e[0])
                            }, function (i) {
                                return t.changearea()
                            }]
                        }
                    }, [e("option", {attrs: {value: ""}}, [t._v("请选择")]), t._v(" "), t._l(t.Allarea, function (i) {
                        return e("option", {domProps: {value: i}}, [t._v(t._s(i))])
                    })], 2) : t._e()])])]) : t._e()], t._v(" "), e("li", [e("div", {
                        staticClass: "radio",
                        attrs: {name: "tw"}
                    }, [t._m(5), t._v(" "), e("div", [e("div", {
                        on: {
                            click: function (i) {
                                t.info.tw = "0"
                            }
                        }
                    }, [e("span", {class: {active: "0" == t.info.tw}}, [e("i")]), t._v(" "), e("span", [t._v("36℃以下（Below 36℃）")])]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.tw = "1"
                            }
                        }
                    }, [e("span", {class: {active: "1" == t.info.tw}}, [e("i")]), t._v(" "), e("span", [t._v("36℃-36.5℃")])]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.tw = "2"
                            }
                        }
                    }, [e("span", {class: {active: "2" == t.info.tw}}, [e("i")]), t._v(" "), e("span", [t._v("36.5℃-36.9℃")])]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.tw = "3"
                            }
                        }
                    }, [e("span", {class: {active: "3" == t.info.tw}}, [e("i")]), t._v(" "), e("span", [t._v("36.9℃-37.3℃")])]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.tw = "4"
                            }
                        }
                    }, [e("span", {class: {active: "4" == t.info.tw}}, [e("i")]), t._v(" "), e("span", [t._v("37.3℃-38℃")])]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.tw = "5"
                            }
                        }
                    }, [e("span", {class: {active: "5" == t.info.tw}}, [e("i")]), t._v(" "), e("span", [t._v("38℃-38.5℃")])]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.tw = "6"
                            }
                        }
                    }, [e("span", {class: {active: "6" == t.info.tw}}, [e("i")]), t._v(" "), e("span", [t._v("38.5℃-39℃")])]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.tw = "7"
                            }
                        }
                    }, [e("span", {class: {active: "7" == t.info.tw}}, [e("i")]), t._v(" "), e("span", [t._v("39℃-40℃")])]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.tw = "8"
                            }
                        }
                    }, [e("span", {class: {active: "8" == t.info.tw}}, [e("i")]), t._v(" "), e("span", [t._v("40℃以上（Above 40℃）")])])])])]), t._v(" "), e("li", [e("div", {
                        staticClass: "radio",
                        attrs: {name: "ymtys"}
                    }, [t._m(6), t._v(" "), e("div", [e("div", {
                        on: {
                            click: function (i) {
                                t.info.ymtys = "0"
                            }
                        }
                    }, [e("span", {class: {active: "0" === t.info.ymtys}}, [e("i")]), t._v(" "), t._m(7)]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.ymtys = 1
                            }
                        }
                    }, [e("span", {class: {active: 1 == t.info.ymtys}}, [e("i")]), t._v(" "), t._m(8)]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.ymtys = 2
                            }
                        }
                    }, [e("span", {class: {active: 2 == t.info.ymtys}}, [e("i")]), t._v(" "), t._m(9)])])])]), t._v(" "), e("li", [e("div", {
                        staticClass: "radio",
                        attrs: {name: "sfzx"}
                    }, ["buu" == t.appConfig.id ? e("span", [t._v("今日是否到校？"), e("em", {staticClass: "tab-title-desc-little"}, [t._v("(Will you be at school today？)")]), e("i", {staticClass: "icon iconfont icon-shuoming"}), e("em")]) : e("span", [t._v("是否在校？"), e("em", {staticClass: "tab-title-desc-little"}, [t._v("(Are you staying in the university apartment TODAY？)")]), e("i", {staticClass: "icon iconfont icon-shuoming"}), e("em")]), t._v(" "), e("div", [e("div", {
                        on: {
                            click: function (i) {
                                t.info.sfzx = 1
                            }
                        }
                    }, [e("span", {class: {active: 1 == t.info.sfzx}}, [e("i")]), t._v(" "), t._m(10)]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.sfzx = 0
                            }
                        }
                    }, [e("span", {class: {active: 0 == t.info.sfzx}}, [e("i")]), t._v(" "), t._m(11)])])])]), t._v(" "), e("li", [e("div", {
                        staticClass: "radio",
                        attrs: {name: "sfcyglq"}
                    }, [t._m(12), t._v(" "), e("div", [e("div", {
                        on: {
                            click: function (i) {
                                t.info.sfcyglq = 1
                            }
                        }
                    }, [e("span", {class: {active: 1 == t.info.sfcyglq}}, [e("i")]), t._v(" "), t._m(13)]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.sfcyglq = 0
                            }
                        }
                    }, [e("span", {class: {active: 0 == t.info.sfcyglq}}, [e("i")]), t._v(" "), t._m(14)])])])]), t._v(" "), e("li", [e("div", {
                        staticClass: "radio",
                        attrs: {name: "sfyzz"}
                    }, [t._m(15), t._v(" "), e("div", [e("div", {
                        on: {
                            click: function (i) {
                                t.info.sfyzz = 1
                            }
                        }
                    }, [e("span", {class: {active: 1 == t.info.sfyzz}}, [e("i")]), t._v(" "), t._m(16)]), t._v(" "), e("div", {
                        on: {
                            click: function (i) {
                                t.info.sfyzz = 0
                            }
                        }
                    }, [e("span", {class: {active: 0 == t.info.sfyzz}}, [e("i")]), t._v(" "), t._m(17)])])])]), t._v(" "), e("li", [e("div", {staticClass: "multiText"}, [t._m(18), t._v(" "), e("div", [e("textarea", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.info.qtqk,
                            expression: "info.qtqk"
                        }],
                        attrs: {name: "qtqk", rows: "", cols: "", placeholder: ""},
                        domProps: {value: t.info.qtqk},
                        on: {
                            input: function (i) {
                                i.target.composing || t.$set(t.info, "qtqk", i.target.value)
                            }
                        }
                    })])])])], 2)]), t._v(" "), e("div", {staticClass: "list-box"}, [e("div", {staticClass: "footers"}, [t.ontime ? t._e() : e("a", {staticStyle: {background: "#d0d0d0"}}, [t._v("未到填报时间 "), e("em", {staticClass: "tab-title-desc-little"})]), t._v(" "), t.ontime && t.realonly ? e("a", {staticStyle: {background: "#d0d0d0"}}, [t._v("您已提交过信息 "), e("em", {staticClass: "tab-title-desc-little"}, [t._v("(you have been submitted)")])]) : t._e(), t._v(" "), t.ontime && !t.realonly ? e("a", {
                        staticStyle: {background: "#4285f4"},
                        on: {
                            click: function (i) {
                                return t.confirm()
                            }
                        }
                    }, [t._v("提交信息 "), e("em", {staticClass: "tab-title-desc-little"}, [t._v("(Submit)")])]) : t._e(), t._v(" "), t.setting.copyright ? e("span", [t._v("   " + t._s(t.setting.copyright))]) : t._e()])])])])]), t._v(" "), e("pophint", {
                        attrs: {
                            img: t.img,
                            dec: t.dec,
                            appkey: "ncov"
                        }
                    }), t._v(" "), t.nonetworkimg ? e("network", {
                        attrs: {
                            nonetworkimg: t.nonetworkimg,
                            nonetworktext: t.nonetworktext
                        }
                    }) : t._e(), t._v(" "), e("hint", {
                        attrs: {msg: t.msg, icontip: t.icontip},
                        on: {clkmsg: t.btnhide}
                    })], 1)
                }, staticRenderFns: [function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("填报日期"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Today's date)")]), i("i", {
                        staticClass: "icon iconfont icon-shuoming",
                        staticStyle: {display: "none"}
                    })])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("姓名"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Name)")]), i("i", {
                        staticClass: "icon iconfont icon-shuoming",
                        staticStyle: {display: "none"}
                    })])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("学工号"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Student/Faculty ID)")])])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("所在地点"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Current location)")]), this._v("（请打开手机位置功能，并在手机权限设置中选择允许微信访问位置信息）"), i("i", {staticClass: "icon iconfont icon-shuoming"})])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("所在地点"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Current location)")]), i("i", {staticClass: "icon iconfont icon-shuoming"})])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("今日体温范围"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Today's temperature range)")]), i("i", {staticClass: "icon iconfont icon-shuoming"}), i("em")])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("今日西安“一码通”颜色？"), i("em", {staticClass: "tab-title-desc-little"}), i("i", {staticClass: "icon iconfont icon-shuoming"}), i("em")])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("A 绿色"), i("em", {staticClass: "tab-title-desc-little"})])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("B 黄色"), i("em", {staticClass: "tab-title-desc-little"})])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("C 红色"), i("em", {staticClass: "tab-title-desc-little"})])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("是"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Yes)")])])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("否"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(No)")])])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("是否处于隔离期？"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Are you in quarantine period?)")]), this._v(" "), i("i", {staticClass: "icon iconfont icon-shuoming"}), i("em")])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("是"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Yes)")])])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("否"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(No)")])])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("是否出现乏力、干咳、呼吸困难等症状？"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Are you having a fever, coughing or feeling feeble today)")]), this._v(" "), i("i", {staticClass: "icon iconfont icon-shuoming"}), i("em")])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("是"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Yes)")])])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("否"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(No)")])])
                }, function () {
                    var t = this.$createElement, i = this._self._c || t;
                    return i("span", [this._v("其他情况"), i("em", {staticClass: "tab-title-desc-little"}, [this._v("(Personal statement)")])])
                }]
            }, p = e("C7Lr")(h, f, !1, null, null, null);
        i.default = p.exports
    }
});
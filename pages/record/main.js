const t = getApp();
const util = require('../../utils/util.js');
Page({
    data: {
        date: util.getNowDate(new Date()),
        ifLoading: !0,
        deptList: [],
        
    },
    reqParam: {
        page: 1
    },
    leaveTypes: ["年假", "事假", "病假", "调休", "婚假", "产假", "陪产假", "其它"],
    onLoad: function (e) {
        var a = this;
        this.setData({
                userId: "UID",
                teamId: e.teamId,
                storeUserInfo: wx.getStorageSync("storeUserInfo"), //t.getStoreUserInfo()
                ifInOut2: "Y" == wx.getStorageSync("ifInOut2"),
                ifPickDate: "管理员" == wx.getStorageSync("role") || "主管" == wx.getStorageSync("role"),
                ifEnablePublicAttend: wx.getStorageSync("ifEnablePublicAttend"),
                todayInfo: wx.getStorageSync("attend_record_main_todayinfo") || {}
            })
    },
    onChooseAvatar(e) {
        const {
            avatarUrl
        } = e.detail
        this.setData({
            avatarUrl: avatarUrl
        })
    },
    bindDateChange: function (e) {
        this.setData({
            currentDate: e.detail.value
        })
    },
    getTodayInfo: function () {
        var e = this;
        return t.request("", {
            teamId: this.data.teamId,
            date: this.data.date
        }).then(function (t) {
            t.data.obj.lackCount = t.data.obj.inLack + t.data.obj.outLack, e.setData({
                todayInfo: t.data.obj
            }), wx.setStorage({
                key: "attend_record_main_todayinfo",
                data: t.data.obj
            });
        });
    },
    getDeptList: function () {
        var e = this;
        return t.request("/attend/dept/getList", this.reqParam).then(function (t) {
            t.data.obj.forEach(function (t) {
                e.data.deptList.push({
                    deptName: t.deptName,
                    list: []
                });
            }), e.data.deptList.push({
                deptName: "暂无部门",
                list: []
            }), e.setData({
                deptList: e.data.deptList
            });
        });
    },
    getList: function () {
        var e = this;
        t.request("/attend/rec/getListWithSign", this.reqParam).then(function (a) {
            a.data.obj.list.forEach(function (e) {
                e.outsignList.forEach(function (e) {
                    e.signDatetime = t.utils.dayjs(e.signDatetime).format("HH:mm");
                });
            });
            var s = 1 == e.reqParam.page ? a.data.obj.list : e.data.list.concat(a.data.obj.list);
            e.data.currentType && (s = s.filter(function (t) {
                switch (e.data.currentType) {
                    case "迟到":
                    case "早退":
                    case "外出":
                    case "加班":
                        return t.inStatus == e.data.currentType || t.inStatus2 == e.data.currentType || t.outStatus == e.data.currentType || t.outStatus2 == e.data.currentType;

                    case "请假":
                        return -1 != e.leaveTypes.indexOf(t.inStatus) || -1 != e.leaveTypes.indexOf(t.inStatus2) || -1 != e.leaveTypes.indexOf(t.outStatus) || -1 != e.leaveTypes.indexOf(t.outStatus2);

                    case "缺卡":
                        return "缺卡" == t.inStatus || "缺卡" == t.inStatus2 || "缺卡" == t.outStatus || "缺卡" == t.outStatus2;

                    case "补上班卡":
                        return "补卡" == t.inStatus || "补卡" == t.inStatus2;

                    case "补下班卡":
                        return "补卡" == t.outStatus || "补卡" == t.outStatus2;
                }
            })), e.data.deptList.forEach(function (t) {
                t.list = [];
            }), s.forEach(function (t) {
                var a = e.data.deptList.findIndex(function (e) {
                    return e.deptName == t.deptName;
                }); -
                1 == a ? e.data.deptList[e.data.deptList.length - 1].list.push(t) : e.data.deptList[a].list.push(t);
            }), e.setData({
                list: s,
                deptList: e.data.deptList,
                noData: {
                    noData: 0 == s.length && 1 == e.reqParam.page,
                    noMoreData: 0 == s.length && e.reqParam.page > 1
                }
            });
        });
    },
    filterList: function (t) {
        t.currentTarget.dataset.type == this.data.currentType ? this.setData({
            currentType: ""
        }) : this.setData({
            currentType: t.currentTarget.dataset.type
        }), this.reqParam.page = 1, this.getList();
    },
    onPullDownRefresh: function () {
        this.reqParam.page = 1, this.getTodayInfo(), this.getList();
    },
    pickedDate: function (t) {
        this.setData({
            date: t.detail.value
        }), this.reqParam.date = this.data.date, this.getTodayInfo(), this.getList();
    },
    showInfo: function (t) {
        var e = t.currentTarget.dataset.mode,
            a = t.currentTarget.dataset.idx,
            s = t.currentTarget.dataset.index,
            i = this.data.deptList[a].list[s];
        this.selectComponent("#modal").show({
            title: "详情",
            closeOnOverlay: !0
        }), this.selectComponent("#recordInfo").show({
            item: i,
            mode: e
        });
    },
    showDeptDropdownList: function (t) {
        var e = this;
        this.selectComponent("#dropdownList").show({
            e: t,
            teamId: this.data.teamId,
            docType: "dept",
            ifShowPickAll: !0,
            success: function (t) {
                e.setData({
                    deptName: t.deptName
                }), e.reqParam.deptId = t.deptId, e.reqParam.page = 1, e.getList();
            }
        });
    },
    setFilterValue: function (t) {
        var e = t.currentTarget.id,
            a = t.detail;
        "deptId" == e && (this.reqParam.deptId = a.deptId), this.reqParam.page = 1, this.getList();
    }
});
var i = getApp();

Component({
    properties: {},
    data: {},
    methods: {
        show: function(i) {
            var t = i.item, o = {};
            "in" == i.mode ? (o.time = t.tempInTime || t.myInTime, o.diff = t.inDiff, o.status = t.inStatus, 
            o.location = t.inLocation || t.gpsLocation || "", o.imgFileUrl = t.inImgFileUrl, 
            o.remark = t.inRemark) : "in2" == i.mode ? (o.time = t.tempInTime2 || t.myInTime2, 
            o.diff = t.inDiff2, o.status = t.inStatus2, o.location = t.inLocation2 || t.gpsLocation || "", 
            o.imgFileUrl = t.inImgFileUrl2, o.remark = t.inRemark2) : "out" == i.mode ? (o.time = t.tempOutTime || t.myOutTime, 
            o.diff = t.outDiff, o.status = t.outStatus, o.location = t.outLocation || t.gpsLocation || "", 
            o.imgFileUrl = t.outImgFileUrl, o.remark = t.outRemark) : "out2" == i.mode && (o.time = t.tempOutTime2 || t.myOutTime2, 
            o.diff = t.outDiff2, o.status = t.outStatus2, o.location = t.outLocation2 || t.gpsLocation || "", 
            o.imgFileUrl = t.outImgFileUrl2, o.remark = t.outRemark2), this.setData({
                ifShow: !0,
                obj: o
            });
        },
        openFile: function(t) {
            i.utils.openFile(this.data.obj.imgFileUrl);
        }
    }
});
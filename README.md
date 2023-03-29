# Face-Attendance-Wechat

负责人: 钟鑫云、马文浩



## **快速使用**



#### **环境：**

系统环境：linux/Mac/Windows均可

开发环境：无需安装额外运行环境，直接下载并使用微信开发者工具即可，为保证代码运行效果一致微信开发者工具请使用2.19.4基础调试库

特殊要求：为保证功能完整，设备需要可以开启摄像头和GPS功能

#### **代码部署及使用：**

1、下载本仓库代码并解压，在微信开发者工具中打开

2、根据需要修改小程序绑定的appid以及app.json中的配置参数

3、点击编译即可运行

#### **代码参数配置：**

1、可以使用自己微信注册的appid绑定项目（可选）或直接使用默认填写的appid

2、在app.json 文件中serverHost填写并确认个人配置的后端服务器IP地址以及端口（**必须**）

3、app.json 文件中mapkey字段为腾讯位置服务开发者密钥。重新填写app.json中的mapkey（可选），或直接使用本代码中已有的mapkey（**注：若发现代码中原本使用的mapkey失效可能是本人已注销用个人信息登记注册的腾讯地图服务的API key，请至[官网](https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview)页面申请并替换**）

4、app.json中的templateID为小程序订阅消息模板ID。若第一步中没有更改源代码使用的appid则不需要变动；若第一步更改为自身appid，请在微信开发者平台中注册订阅消息，选择时模板为考勤通知（类目为企业管理），模板选择的内容如下图所示

<img src="readme_imgs\fig6.png" style="zoom:50%;" />

<img src="readme_imgs\fig7.jpg" style="zoom: 50%;" />

5、保证微信小程序前端所使用的appid以及templateID和该项目flask后端代码配置文件config.py中填写的一致即可（**必须**）

"weui-miniprogram": "^1.2.7"

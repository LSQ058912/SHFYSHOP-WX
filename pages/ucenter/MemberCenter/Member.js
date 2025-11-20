import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import user from '../../../utils/user.js';
const app = getApp();

// Page({
//   data: {
//     url: "http://192.168.1.99:3000/h5pay/",
//     showPopup: true,
//     showWebview: false,  // 控制 web-view 显示
//     animationData: {}
//   },
  
//   onLoad(options) {
//     // 如果需要从上一页传参
//     if (options.url) {
//       this.setData({
//         url: decodeURIComponent(options.url)
//       });
//     }
//   },
  
//   closePopup() {
//     // 创建动画
//     const animation = wx.createAnimation({
//       duration: 300,
//       timingFunction: 'ease'
//     });
    
//     animation.opacity(0).translateY(-20).step();
    
//     this.setData({
//       animationData: animation.export()
//     });
    
//     // 300ms 后隐藏弹窗并显示 web-view
//     setTimeout(() => {
//       this.setData({
//         showPopup: false,
//         showWebview: true  // 显示 web-view
//       });
//     }, 300);  // 改为 300 毫秒，你写的 300000 是 5 分钟
//   }
// })
Page({
  data: {
    selectedMember: '' // 当前选中的会员类型: 'basic', 'premium', 'supreme'
  },

  // 选择会员卡片
  selectMember(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedMember: type
    });
  },

  // 购买会员
  buyMember(e) {
    const type = e.currentTarget.dataset.type;

    // 先选中当前卡片
    this.setData({
      selectedMember: type
    });

    // 获取会员名称和价格
    const memberInfo = {
      'basic': { name: '基础会员', price: '9' },
      'premium': { name: '高级会员', price: '18.8' },
      'supreme': { name: '至尊会员', price: '28.8' }
    };

    const info = memberInfo[type];

    // 显示确认提示
    wx.showModal({
      title: '确认购买',
      content: `确认购买${info.name}（¥${info.price}/月）？`,
      confirmText: '确认支付',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 这里调用支付接口
          this.processPurchase(type, info);
        }
      }
    });
  },

  // 处理购买流程
  processPurchase(type, info) {
    wx.showLoading({
      title: '正在支付...',
    });

    // 模拟支付流程，实际项目中调用真实的支付接口
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '购买成功',
        icon: 'success',
        duration: 2000
      });

      // 这里可以跳转到支付页面或其他页面
      // wx.navigateTo({
      //   url: '/pages/payment/payment?type=' + type
      // });
    }, 1500);
  },

  // 跳转充值页面
  navigateToRecharge() {
    wx.showToast({
      title: '跳转充值页面',
      icon: 'none'
    });
    // wx.navigateTo({
    //   url: '/pages/recharge/recharge'
    // });
  }
});
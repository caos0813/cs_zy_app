package com.zhiyazhiyuan.zyzy;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.reactlibrary.RNAliyunOssPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import cn.jiguang.share.reactnative.JSharePackage;
import cn.jiguang.share.android.api.JShareInterface;
import cn.jpush.reactnativejanalytics.JAnalyticsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.theweflex.react.WeChatPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.beefe.picker.PickerViewPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.remobile.toast.RCTToastPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import cn.jpush.reactnativejpush.JPushPackage;

/* 极光统计 */
import cn.jiguang.analytics.android.api.JAnalyticsInterface;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

   private boolean SHUTDOWN_TOAST = true;
   private boolean SHUTDOWN_LOG = true;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGestureHandlerPackage(),
            new RNCWebViewPackage(),
            new BlurViewPackage(),
            new RNAliyunOssPackage(),
            new PickerPackage(),
            new JAnalyticsPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new JSharePackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new ReactVideoPackage(),
            new BackgroundTimerPackage(),
            new RNDeviceInfo(),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG,"http://codepush.junyanginfo.com:3000/"),
            new WeChatPackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new PickerViewPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new ReactNativeConfigPackage(),
            new RCTToastPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    /* 极光统计 */
    JAnalyticsInterface.init(this);
    JShareInterface.init(this); 
  }
}

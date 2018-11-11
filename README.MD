# 安卓

## 测试环境

### 测试环境打包
 ```bash
  gradlew assembleStagingRelease
 ```
 ### 测试环境发布热更新
```
code-push release-react zyzyapp-android android  --t 1.0.0 --d Staging --des "修改标题样式了" --m true
```
 ### 测试环境热更新包提升到正式环境
 ```
  code-push promote zyzyapp-android android Staging Production
 ```
 ### 查看热更新
 ```
 code-push deployment ls  zyzyapp-android
 ```
 ### 测试环境打包
  ```
 gradlew assembleReleaseStaging
 ```
 ### 安装
  react-native run-android --variant=releaseStaging
 ## 正式环境
 
### 正式环境打包
 ```bash
  gradlew assembleRelease
 ```
code-push release-react zyzyapp-android android  --t 1.0.0 --dev false --d Production  --des "有新的更新" --m true




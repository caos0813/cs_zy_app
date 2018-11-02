# 安卓

## 测试环境

### 测试环境打包
 ```bash
  gradlew assembleReleaseStaging
 ```
 ### 测试环境发布热更新
```
code-push release-react zyzy-android android  --t 1.0.1 --dev false --d Staging --des "更新一下" --m true
```
 ### 查看热更新
 ```
 code-push deployment ls  zyzy-android
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
code-push release-react zyzy-android android  --t 1.0.0 --dev false --d Production  --des "试一下更新" --m true


 # 热更新key
 ```
code_push_key_production=6MspA6500RgXSFJ-vmQ9Hs0mUht16c2286f0-5ac2-4dcf-b111-16564f0de8dd
code_push_key_staging=_HT_UmOwymR1XdfRiwa9xksSBi296c2286f0-5ac2-4dcf-b111-16564f0de8dd
```


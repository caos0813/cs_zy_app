# 安卓

## 测试环境

 ### 测试环境发布热更新
```
code-push release-react zyzyapp-android android  --t 1.1.1 --d Staging --des "提交正式环境" --m true
```
 ### 测试环境热更新包提升到正式环境
 ```
code-push promote zyzyapp-android  Staging Production
 ```
 ### 查看热更新
 ```
 code-push deployment ls  zyzyapp-android
 ```

 ## 正式环境
 
### 正式环境发布热更新
```
code-push release-react zyzyapp-android android  --t 1.0.1 --dev false --d Staging  --des "有新的更新" --m false
code-push release-react zyzyapp-ios ios  --t 1.0.1 --dev false --d Staging  --des "有新的更新" --m false

code-push promote zyzyapp-ios  Staging Production

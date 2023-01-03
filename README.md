# RandomStrings

てきとうにランダム文字列を生成するスクリプトです。

# 実行方法
下記どちらかお好きな方へ

・Windows上で実行
　「RandomStrings.wsf」を実行すると結果ファイル「RandomStrings.txt」が作成される。

・htmlで表示
　「RandomStrings.html」をブラウザで表示

# オプション
上記ファイルどちらでもランダム文字列オプションを指定することが可能

```js
var rs=new RandomStrings({
	file:"./" + WScript.ScriptName.replace(/\.\w+$/, ".txt"),
	ptn:"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\-\_])(?=.*[\+])[0-9a-zA-Z][0-9a-zA-Z\-\_\+]+[0-9a-zA-Z]$",
	str:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_+",
	num:1,
	len:16
});
```

ptn:正規表現マッチパターン。指定した書式にマッチするまで生成を繰り返す。
str:ランダム文字列に使用できる文字。
num:生成するランダム文字列の個数。
len:ランダム文字列の長さ。（固定長）

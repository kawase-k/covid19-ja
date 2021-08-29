# covid19-ja

## What is covid19-ja?

"covid19-ja" is a library that obtains open data currently published from the website of the Cabinet Secretariat.
You can get the latest public data. As items, you can check "Number of positives nationwide", "Total number of positives by prefecture", "People who need inpatient treatment", and "Total number of deaths".

https://corona.go.jp/dashboard/

## Install

The covid-19 CLI is available for free on npm.

```shell
% npm i -g covid19-ja
```

## Usage

This CLI is very easy to use.

1. Execute the command.

```shell
% covid19-ja
```

2. You can display the information you want to know by selecting the content that will be displayed after execution.

```shell
? 知りたい内容を選択してください … 
❯ 全国の累積陽性者数
  都道府県別の累積陽性者数
  入院治療等を要する者の数
  累積の死亡者数
```

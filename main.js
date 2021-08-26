async function getTotalPeople () {
  const fetch = require('node-fetch')
  const url = 'https://data.corona.go.jp/converted-json/covid19japan-npatients.json' // 最新の感染者数
  const res = await fetch(url)
  const json = await res.json()
  const latestDate = await json.slice(-1)[0]
  console.log(`${latestDate.date}時点の全国の累積陽性者数は${latestDate.npatients}人です。`) // 最新の感染者数の合計

  // const numberAllPrefectures = 47
  // const array = []
  // const url2 = 'https://opendata.corona.go.jp/api/Covid19JapanAll' // 全国の感染者数の推移
  // const res2 = await fetch(url2)
  // const json2 = await res2.json()
  // const itemList = await json2.itemList
  // for (let pref = 0; pref < numberAllPrefectures; pref++) {
    // array.push(itemList.shift())
  // }
  // const arrayAllPrefectures = array.map(a => (Number(a.npatients)))
  // const reducer = (accumulator, currentValue) => accumulator + currentValue
  // const total = arrayAllPrefectures.reduce(reducer)
  // const date = array[0].date
  // console.log(`${date}時点の累積陽性者数は${total}人です。`) // これまでの感染者数の合計

  // console.log(`${array[0].date}時点での都道府県別累積の陽性者数です`)
  // for (let pref = 0; pref < numberAllPrefectures; pref++) {
    // console.log(`${array[pref].name_jp}は${array[pref].npatients}人です`)
  // }
}

// getTotalPeople()

const enquirer = require('enquirer')
async function outputSelectedResults () {
  const question = {
    type: 'select',
    name: 'title',
    message: '知りたい情報を選択してください',
    choices: ['全国の累積陽性者数', '都道府県別の累積陽性者数', '入院治療等を要する者の数', '累積の死亡者数']
  }
  const answer = await enquirer.prompt(question)
  // console.log(question)
  // console.log(answer)
  // console.log(`僕も${answer.title}が好きだよ`)
  if (answer.title === '全国の累積陽性者数') { getTotalPeople() }
}

outputSelectedResults()

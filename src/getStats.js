const fetch = require('node-fetch')

class GetStats {
  constructor (info) {
    this._info = info
    this._urlNationwide = 'https://data.corona.go.jp/converted-json/covid19japan-npatients.json'
    this._urlPrefecture = 'https://opendata.corona.go.jp/api/Covid19JapanAll'
    this._urlInpatient = 'https://data.corona.go.jp/converted-json/covid19japan-ncures.json'
    this._urlCorpse = 'https://data.corona.go.jp/converted-json/covid19japan-ndeaths.json'
  }

  // get info () {
    // return this._info
  // }

  // get urlNationwide () {
    // return this._urlNationwide
  // }

  // get urlPrefecture () {
    // return this._urlPrefecture
  // }

  // get urlInpatient () {
    // return this._urlInpatient
  // }

  // get urlCorpse () {
    // return this._urlCorpse
  // }

  async fetchNationwideData () {
    const res = await fetch(this._urlNationwide)
    const json = await res.json()
    const latestDate = await json.slice(-1)[0]
    console.log(`${latestDate.date}時点の全国の累積陽性者数は${latestDate.npatients}人です。`) // 最新の感染者数の合計
  }

  async fetchPrefectureData () {
    const res = await fetch(this._urlPrefecture)
    const numberAllPrefectures = 47
    const array = []
    const json = await res.json()
    const itemList = await json.itemList
    for (let pref = 0; pref < numberAllPrefectures; pref++) {
      array.push(itemList.shift())
    }
    // const arrayAllPrefectures = array.map(a => (Number(a.npatients)))
    // const reducer = (accumulator, currentValue) => accumulator + currentValue
    // const total = arrayAllPrefectures.reduce(reducer)
    // const date = array[0].date
    // console.log(`${date}時点の累積陽性者数は${total}人です。`) // これまでの感染者数の合計

    console.log(`${array[0].date}時点での都道府県別累積の陽性者数です`)
    for (let pref = 0; pref < numberAllPrefectures; pref++) {
      console.log(`${array[pref].name_jp}は${array[pref].npatients}人です`)
    }
  }
}

module.exports = GetStats

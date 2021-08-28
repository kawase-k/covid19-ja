const fetch = require('node-fetch')

class GetData {
  constructor () {
    this._urlNationwide = 'https://data.corona.go.jp/converted-json/covid19japan-npatients.json'
    this._urlPrefecture = 'https://opendata.corona.go.jp/api/Covid19JapanAll'
    this._urlInpatient = 'https://data.corona.go.jp/converted-json/covid19japan-ncures.json'
    this._urlCorpse = 'https://data.corona.go.jp/converted-json/covid19japan-ndeaths.json'
  }

  async formatter (url) {
    const res = await fetch(url)
    const json = await res.json()
    return json
  }

  async fetchNationwideData () {
    const json = await this.formatter(this._urlNationwide)
    const latestDate = await json.slice(-1)[0]
    return latestDate
  }

  async fetchPrefectureData () {
    const numberAllPrefectures = 47
    const array = []
    const json = await this.formatter(this._urlPrefecture)
    const itemList = await json.itemList
    for (let pref = 0; pref < numberAllPrefectures; pref++) {
      array.push(itemList.shift())
    }
    return array
  }

  async fetchInpatientData () {
    const json = await this.formatter(this._urlInpatient)
    const latestDate = await json.slice(-1)[0]
    return latestDate
  }

  async fetchCorpseData () {
    const json = await this.formatter(this._urlCorpse)
    const latestDate = await json.slice(-1)[0]
    return latestDate
  }
}

module.exports = GetData

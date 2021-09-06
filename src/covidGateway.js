const fetch = require('node-fetch')

class CovidGateway {
  constructor () {
    this._urlNationwide = 'https://data.corona.go.jp/converted-json/covid19japan-npatients.json'
    this._urlPrefecture = 'https://opendata.corona.go.jp/api/Covid19JapanAll'
    this._urlInpatient = 'https://data.corona.go.jp/converted-json/covid19japan-ncures.json'
    this._urlDeath = 'https://data.corona.go.jp/converted-json/covid19japan-ndeaths.json'
  }

  async formatData (url) {
    const res = await fetch(url)
    return res.json()
  }

  async fetchNationwideData () {
    const json = await this.formatData(this._urlNationwide)
    return json.slice(-1)[0]
  }

  async fetchPrefectureData () {
    const numberAllPrefectures = 47
    const array = []
    const json = await this.formatData(this._urlPrefecture)
    const itemList = await json.itemList
    for (let pref = 0; pref < numberAllPrefectures; pref++) {
      array.push(itemList.shift())
    }
    return array
  }

  async fetchInpatientData () {
    const json = await this.formatData(this._urlInpatient)
    return json.slice(-1)[0]
  }

  async fetchDeathData () {
    const json = await this.formatData(this._urlDeath)
    return json.slice(-1)[0]
  }
}

module.exports = CovidGateway

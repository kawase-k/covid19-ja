const GetData = require('./getData')

class GetStats {
  constructor (info) {
    this._answer = info.answer
    this._queryFirst = info.query[0]
    this._querySecond = info.query[1]
    this._queryThird = info.query[2]
    this._queryFour = info.query[3]
    this._getData = new GetData()
  }

  async output () {
    if (this._answer === this._queryFirst) {
      const result = await this._getData.fetchNationwideData()
      console.log(`${result.date}時点の${this._queryFirst}は${result.npatients}人です。`)
    } else if (this._answer === this._querySecond) {
      const result = await this._getData.fetchPrefectureData()
      const preLen = result.map(res => (res.name_jp).length)
      const numLen = result.map(res => (res.npatients).length)
      const padding = 2

      console.log(`${result[0].date}時点の${this._querySecond}です。\n`)
      for (let pref = 0; pref < result.length; pref++) {
        const pre = result[pref].name_jp
        const num = result[pref].npatients

        if (pre.length === Math.max(...preLen)) {
          process.stdout.write(`${pre}：`)
          process.stdout.write(String(num).padEnd((Math.max(...numLen)) + padding, ' '))
        } else {
          process.stdout.write(`${pre}  ：`)
          process.stdout.write(String(num).padEnd((Math.max(...numLen)) + padding, ' '))
        }
        if ((pref + 1) % 5 === 0) process.stdout.write('\n')
      }
    } else if (this._answer === this._queryThird) {
      const result = await this._getData.fetchInpatientData()
      console.log(`${result.date}時点の${this._queryThird}は${result.ncures}人です。`)
    } else {
      const result = await this._getData.fetchCorpseData()
      console.log(`${result.date}時点の${this._queryFour}は${result.ndeaths}人です。`)
    }
  }
}

module.exports = GetStats

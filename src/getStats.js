const GetData = require('./getData')

class GetStats {
  constructor (info) {
    this._answer = info.answer
    this._cont1 = info.choices[0]
    this._cont2 = info.choices[1]
    this._cont3 = info.choices[2]
    this._cont4 = info.choices[3]
    this._getData = new GetData()
  }

  async output () {
    if (this._answer === this._cont1) {
      const result = await this._getData.fetchNationwideData()
      console.log(`${result.date}時点の${this._cont1}は${result.npatients}人です。`)
    } else if (this._answer === this._cont2) {
      const result = await this._getData.fetchPrefectureData()
      console.log(`${result[0].date}時点の${this._cont2}です。\n`)
      for (let pref = 0; pref < result.length; pref++) {
        // console.log(`${result[pref].name_jp}は${result[pref].npatients}人です`)
        const text = `${result[pref].name_jp}は${result[pref].npatients}人`
        const length = text.length
        process.stdout.write(text.padEnd(length + 2))
        if ((pref + 1) % 5 === 0) process.stdout.write('\n')
      }
    } else if (this._answer === this._cont3) {
      const result = await this._getData.fetchInpatientData()
      console.log(`${result.date}時点の${this._cont3}は${result.ncures}人です。`)
    } else {
      const result = await this._getData.fetchCorpseData()
      console.log(`${result.date}時点の${this._cont4}は${result.ndeaths}人です。`)
    }
  }
}

module.exports = GetStats

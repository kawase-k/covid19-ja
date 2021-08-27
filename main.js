const GetStats = require('./src/getStats')
const enquirer = require('enquirer')

class Main {
  static async getInfo () {
    const questions = {
      type: 'select',
      name: 'title',
      message: '知りたい情報を選択してください',
      choices: ['全国の累積陽性者数', '都道府県別の累積陽性者数', '入院治療等を要する者の数', '累積の死亡者数']
    }
    const answer = await enquirer.prompt(questions)
    const arrayQuestions = questions.choices.map(question => question.name)
    const foundTitle = arrayQuestions.find(title => title === answer.title)
    if (answer.title === foundTitle) { return answer.title }
  }

  static run (info) {
    const formatter = new GetStats(info)
    formatter.fetchNationwideData()
    formatter.fetchPrefectureData()
  }
}

(async () => {
  const info = await Main.getInfo()
  if (info) {
    Main.run(info)
  }
})()

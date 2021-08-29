const GetStats = require('./src/getStats')
const enquirer = require('enquirer')

class Main {
  static async getInfo () {
    const questions = {
      type: 'select',
      name: 'title',
      message: '知りたい内容を選択してください',
      choices: ['全国の累積陽性者数', '都道府県別の累積陽性者数', '入院治療等を要する者の数', '累積の死亡者数']
    }
    const answer = await enquirer.prompt(questions)
    const choices = questions.choices.map(question => question.name)
    return {
      answer: answer.title,
      query: choices
    }
  }

  static run (info) {
    const getStats = new GetStats(info)
    getStats.output()
  }
}

(async () => {
  const info = await Main.getInfo()
  Main.run(info)
})()

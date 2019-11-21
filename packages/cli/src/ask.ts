import * as inquirer from 'inquirer'

export default async (questions: any[]): Promise<any> => {
  const answers = {}
  while(questions.length) {
    const question = questions.shift()
    const { type = 'input', name, message, choices } = question
    if(type === 'multiple') {
      const answer = await inquirer.prompt([{ name, message, choices }]) as any
      if(answer[name]){
        answers[name] = answers[name] || []
        answers[name].push(answer[name])
        questions.unshift({ type, name, message: '-', choices })
      }
    } else {
      const answer = await inquirer.prompt([{ type, name, message, choices }]) as any
      answers[name] = answer[name]
    }
  }
  return answers
}

import * as inquirer from 'inquirer'

export default (questions: any[]): Promise<any> => inquirer.prompt(questions)
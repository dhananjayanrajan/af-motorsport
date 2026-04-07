import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { checkboxFieldFactory } from '@/fields/factories/fields/checkboxField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const traitsFields: Field[] = [
  groupFactory(
    {
      name: 'checklist',
      label: { en: 'Checklist', es: 'Lista de Verificación', pt: 'Lista de Verificação' },
      entity: { en: 'Task', es: 'Tarea', pt: 'Tarefa' },
      description: { en: 'Onboarding tasks', es: 'Tareas de incorporación', pt: 'Tarefas de integração' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'task', dictionary: undefined, width: 3, minLength: 1, maxLength: 200 }),
      checkboxFieldFactory({ name: 'required', dictionary: undefined, width: 1 }),
      checkboxFieldFactory({ name: 'completed', dictionary: undefined, width: 1 }),
      dateFieldFactory({ name: 'due_date', dictionary: undefined, width: 2, pickerAppearance: 'dayOnly' }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'modules',
      label: { en: 'Modules', es: 'Módulos', pt: 'Módulos' },
      entity: { en: 'Module', es: 'Módulo', pt: 'Módulo' },
      description: { en: 'Training modules', es: 'Módulos de entrenamiento', pt: 'Módulos de treinamento' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'duration', dictionary: undefined, width: 2, minLength: 1, maxLength: 50 }),
      textFieldFactory({ name: 'type', dictionary: undefined, width: 2, minLength: 1, maxLength: 50 }),
      textareaFieldFactory({ name: 'content', dictionary: undefined, width: 4, minLength: 1, maxLength: 1000, rows: 3 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'quizzes',
      label: { en: 'Quizzes', es: 'Cuestionarios', pt: 'Questionários' },
      entity: { en: 'Quiz', es: 'Cuestionario', pt: 'Questionário' },
      description: { en: 'Assessment quizzes', es: 'Cuestionarios de evaluación', pt: 'Questionários de avaliação' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'question', dictionary: undefined, width: 3, minLength: 1, maxLength: 500 }),
      textFieldFactory({ name: 'answer', dictionary: undefined, width: 3, minLength: 1, maxLength: 500 }),
      textareaFieldFactory({ name: 'explanation', dictionary: undefined, width: 4, minLength: 1, maxLength: 1000, rows: 3 }),
    ],
    true
  ),
]

import ChronoTask from './ChronoTask.jsx'

export default {
  component: ChronoTask,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  title: 'Authentication / ChronoTask',
}

const Template = (args) => <ChronoTask {...args} />

export const basic = Template.bind()
basic.args = {
  title: 'Titre',
  description: 'Description',
}

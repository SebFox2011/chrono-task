import ChronoScreen from './ChronoScreen.jsx'

export default {
  component: ChronoScreen,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  title: 'Authentication / ChronoScreen',
}

const Template = (args) => <ChronoScreen {...args} />

export const basic = Template.bind()
basic.args = {
  title: 'Titre',
  description: 'Description',
}

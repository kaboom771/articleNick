import _ from 'lodash'

export const articles = _.times(100, (i) => {
  return {
    nick: `article-nick-${i}`,
    name: `article ${i}`,
    description: `description of article ${i}`,
    text: _.times(100, (j) => `<p>Text paragrph ${j} of article ${i}...</p>`).join(''),
  }
})

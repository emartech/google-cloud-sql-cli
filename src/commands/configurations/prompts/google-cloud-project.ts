import { fetchGoogleCloudProjects } from '../../../lib/gcloud/projects'
import { ConfigurationCreateAnswers } from '../../../lib/types'
import { search } from '../../../lib/util/search'

const source = (answers: ConfigurationCreateAnswers, input?: string) => {
  const projects = fetchGoogleCloudProjects()
  return search(projects, input)
}

export const googleCloudProjectPrompt = {
  type: 'autocomplete',
  name: 'googleCloudProject',
  message: 'Choose Google Cloud project:',
  source,
}

import { bold, cyan } from 'chalk'
import { execCommand, execCommandAttached } from '../util/exec'

type CloudSqlProxyPod = {
  name: string
  namespace: string
  serviceAccount: string
  instance: string
  localPort: number
  remotePort: number
}

export const runCloudSqlProxyPod = (pod: CloudSqlProxyPod): string => {
  return execCommand(`
    kubectl run \
      --image=gcr.io/cloudsql-docker/gce-proxy \
      --namespace ${pod.namespace} \
      --serviceaccount=${pod.serviceAccount} \
      --labels=app=google-cloud-sql \
      ${pod.name} \
      -- /cloud_sql_proxy -ip_address_types=PRIVATE -instances=${pod.instance}=tcp:${pod.remotePort}
  `)
}

export const deletePod = (pod: string, namespace: string) => {
  console.log(`Deleting pod '${bold(cyan(pod))}'.`)
  execCommand(`
    kubectl delete pod ${pod} --namespace=${namespace}
  `)
  console.log(`Pod '${bold(cyan(pod))}' deleted.`)
}

export const waitForPodReady = (pod: string, namespace: string) => {
  console.log(`Waiting for pod '${bold(cyan(pod))}'.`)
  execCommand(`
    kubectl wait pod ${pod} \
      --for=condition=ready \
      --namespace=${namespace}
  `)
  console.log(`Pod '${bold(cyan(pod))}' is ready.`)
}

export const portForward = (pod: CloudSqlProxyPod) => {
  console.log(`Starting port forwarding to pod '${bold(cyan(pod.name))}'.`)
  execCommandAttached(`
    kubectl port-forward ${pod.name} ${pod.localPort}:${pod.remotePort} \
      --namespace=${pod.namespace}
  `)
}

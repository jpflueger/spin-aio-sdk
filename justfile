node_ip := `kubectl get nodes -o json | jq -r '.items[0].status.addresses[] | select(.type | contains("InternalIP")).address'`

install openwhisk local:
  helm upgrade --install owdev openwhisk/openwhisk \
    -n openwhisk --create-namespace \
    -f deploy/openwhisk/local.yaml \
    --set 'whisk.ingress.apiHostName={{node_ip}}'

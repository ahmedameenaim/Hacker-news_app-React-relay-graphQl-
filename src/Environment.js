import {Environment,Network,RecordSource,Store,} from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { GC_AUTH_TOKEN } from './constants'

function fetchQuery(operation,variables,) {
    return fetch('https://api.graph.cool/relay/v1/cjluq8a9923wg0195oe3vajoi', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => {
      return response.json();
    });
  }

  const setupSubscription = (config, variables, cacheConfig, observer) => {
    const query = config.text

    const subscriptionClient = new SubscriptionClient('wss://subscriptions.__REGION__.graph.cool/v1/__PROJECT_ID__', {reconnect: true})
    subscriptionClient.subscribe({query, variables}, (error, result) => {
      observer.onNext({data: result})
    })
  }

  const environment = new Environment({
      network: new Network.create(fetchQuery(),setupSubscription),
      store: new Store(new RecordSource())
  });

  export default environment;
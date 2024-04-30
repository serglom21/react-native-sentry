import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as Sentry from "@sentry/react-native"
import { Platform } from 'react-native';
import { breadcrumbsIntegration } from '@sentry/react';


Sentry.init({
  dsn: "",
  tracesSampleRate: 1.0,
  integrations: function (integrations) {
    const defaultIntegrations = integrations.filter(function (integration) {
    // excluding Breadcrumbs, HttpContext
        return ["InboundFilters", "FunctionToString", "LinkedErrors", "Dedupe"].includes(integration.name);
    });

    return defaultIntegrations.concat([breadcrumbsIntegration({ dom: false, history: false, console: false })]);
  },
})

export default function App() {
  console.log('platform is: ', Platform);
  Sentry.captureException("this is an error")
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

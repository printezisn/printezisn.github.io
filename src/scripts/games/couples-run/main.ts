import '@printezisn/games-couples-run/style.css';
import '@scripts/base';
import renderGame from '@printezisn/games-couples-run';

renderGame({
  assetsBasePath: '/games/couples-run/assets',
  creditsUrl: '/games/couples-run/credits',
  privacyPolicyUrl: '/games/couples-run/privacy-policy',
  fireBaseApiKey: import.meta.env.PUBLIC_COUPLES_RUN_FIREBASE_API_KEY ?? '',
  fireBaseAuthDomain:
    import.meta.env.PUBLIC_COUPLES_RUN_FIREBASE_AUTH_DOMAIN ?? '',
  fireBaseProjectId:
    import.meta.env.PUBLIC_COUPLES_RUN_FIREBASE_PROJECT_ID ?? '',
  fireBaseStorageBucket:
    import.meta.env.PUBLIC_COUPLES_RUN_FIREBASE_STORAGE_BUCKET ?? '',
  fireBaseMessagingSenderId:
    import.meta.env.PUBLIC_COUPLES_RUN_FIREBASE_MESSAGING_SENDER_ID ?? '',
  fireBaseAppId: import.meta.env.PUBLIC_COUPLES_RUN_FIREBASE_APP_ID ?? '',
});

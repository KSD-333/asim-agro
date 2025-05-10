import * as admin from 'firebase-admin';

const serviceAccount = {
  type: "service_account",
  project_id: "asim-agro",
  private_key_id: "47a5ead0a84a1061fb03ce4842cf6b0b93657b5a",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC02hRHI1oxKsg0\nc0eSEyZulPeZNEfRQvFsXNROfaqJAqWG1/C2V+4PUhrzu8q50OO10IptBKM9xf2o\nXplRxZTBv7x7ew83i+qbeSfV/ZGY61bpjKhhqoRh2aF18DjH3w+gwmGjXEUgbdsn\ncmy4l+631fdivPPV9yJb4lo2suPQEKrJgBMLHgq4r6F+BaYJACD88gXPx8UrvEj2\naGlVRUkMvmmpxzMG7ihO2OCjw73L8ikCzBdFgRqHg+6euUsyR0OBi2qyJiJvIP4J\noTp6L6aVPAUTAM21kdGIU558LJ1UxS0kN53XFV0K9b+Rr9RuyjLQQtrYdHv4Miib\nhyQDWzq3AgMBAAECggEABUStDMSSNEFYylc+r5n+w/Fzazpt/EHohg2WN+eRsNud\nUsuZy0fNyYTpOPjbQdp1fQPxgM6bVW0d+PiGuC5smyWaf1ST78qFoX+VWUTsJ8Dm\n1pO80UuGG7ZFtLRChPVY9MDKLDtqUBgxYCQh1/wW0wgf8r7VBx7VbhA81zG9iZwN\nH4UWdGOTCMEGtJKgaKe8pRm6q2vGyw47MuZjTmVUl2j7wpo4OdmD0t3AAvWTtHV/\nK2PqHCAZ/dqIWjZ54L/Qhc/gN0oIFlyZIz9RlQyTqanPeQg2ku82ztR47WmZAEpI\ngE7huAp7jUloK9lhaboNTMzUXxlyTmGNfwodjzshMQKBgQD5Z8t8RT44LF6ZZy98\nriM6JFLnpiWwOxNA7fw16H7g3QW+ko5b4VYjid3ZLQlVB0xltGBAqi9hkKvI13Hj\n6i0Ti8futRUZ2Mhkf2kmSKGTdOPZ2x6kiWyL3I55UDhKn5uiSRHRxvzMcna/62df\naQqVRH+Ecq4AQvjtuEYvnw+IhQKBgQC5okAy7abOPi0qvTt25dqcmEu2ZgjjXN7n\nKY33AeQxQfSdf5v9EjrK8FXMGWT6F1s6Ddnr/y0GU9XLr8ahpE+I/SFJYhw7Zpst\na+HowehyqIkBYyIw+YvQYK9Gl2W9o+K5Yb3L2YmWBSmMm38WaY5mPqB3CV1Izh/U\nCGezsnv5CwKBgARTsasRRHgTBP0iVieSmdfbY3jTYBoDnFznBBYnV3QtQXlB76hW\na3koXinzZxMLkl69V2In0bSenuxYGIi8ulV5elmA2MHfCfL8ZuWcIvl88KsJ6ykt\nnS18ARjHtIJO7JNPMzjxe9dMMRU5T0zPdLiMPK4ekzg78Teml8khuFJFAoGAR6ao\nwP+Z8uFs7aI84Ze22dqu3qhjpd6i6vbPJRhFy/15PZGT1ArFRq+dbjofD6kUPUQ7\naSwFZPvW+dfPA3U4fde2kWydGRBxtQZ/HCg8YIVM3Iw3FlA79yJahRTK4HfxezyO\n1bARuyYi83LRiwUTQcPKjCfBKejlwCG+ZU3vLCECgYEA1B6If+Z6m2RNZUu7C4Qo\nAzO8fiyc2AybBSmCl+9h3Durjtz1Zn3bPnSG7QPxSu00dSK5SWvE1eHgQz4Ocy+c\nIg6TTKYiRdfCMD044LUyssfYnWdQvhTCZg03I/qHf8WqK/4hRJx48PAFJHvYF2Kb\n0QxaReEv5Zs8F9rDsH/W2hc=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@asim-agro.iam.gserviceaccount.com",
  client_id: "106769962291022610335",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40asim-agro.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export const adminStorage = admin.storage(); 
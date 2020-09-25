import firebase from 'firebase';

var firebaseConfig = {
	apiKey: 'AIzaSyBAGTJBBSeUUV-TskHrCdg4S3RIrI7ZSRs',
	authDomain: 'react--clone-c9a0e.firebaseapp.com',
	databaseURL: 'https://react--clone-c9a0e.firebaseio.com',
	projectId: 'react--clone-c9a0e',
	storageBucket: 'react--clone-c9a0e.appspot.com',
	messagingSenderId: '806171888991',
	appId: '1:806171888991:web:53ea6eaeaceb62f927faea',
	measurementId: 'G-0NV1D3G7HJ',
};

const fire = firebase.initializeApp(firebaseConfig);

const auth = fire.auth();
const db = fire.firestore();

export { auth, db };

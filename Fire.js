import FirebaseKeys from "./firebaseDb"
import firebase from "firebase";

class Fire {
    constructor() {
        //firebase.initializeApp(FirebaseKeys) //might or might not need HAHA
    }

    updateProfilePic = async (user, email) => {
        let remoteUri = await this.uploadPhotoAsync(user, `avatars/${this.uid}/${Date.now()}.jpg`)
        let db = this.firestore.collection("users").doc(email);
        await db.set({ avatar: remoteUri }, { merge: true }).then(() => { console.log("pic uploaded to " + email) })
    }

    /*
    createProfile = async (user) => {
        let remoteUri = null

        try {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((userInfo) => {
                userInfo.user.updateProfile({ displayName: user.name , photoURL: user.email}).then(() => { console.log(userInfo); })
                console.log("created successfully")
            }).catch(function(error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == 'auth/email-already-in-use') {
                    Alert.alert('This email is already in use', "Please use another email");
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });

            let db = this.firestore.collection("users").doc(String(user.email));

            await db.set({
                name: user.name,
                email: user.email,
                avatar: null,
                household: user.email,
                householdName: user.name
            })

            /*
            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(user.avatar, 'avatars/${user.email}')

                await db.set({ avatar: remoteUri }, { merge: true })
            } //
        } catch (error) {
            alert("Error :" + error);
        }
    } */

    addItem = async ({ name, type, location, quantity, description, owner, localUri, expiry, ownerEmail }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}.jpg`).then();
        var expiryChanged = (expiry === 0 ? "" : new Date(expiry));

        return new Promise((res, rej) => {
            this.firestore.collection("items").doc(firebase.auth().currentUser.photoURL).collection('items').add({
                name,
                type,
                location,
                quantity,
                description: description ? description : "None",
                owner,
                ownerEmail,
                expiry: expiry ? new Date(expiry) : "None",
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri,
                status: 'nil'
            })
                .then(ref => {
                    this.firestore.collection("items").doc(firebase.auth().currentUser.photoURL).collection('items')
                        .doc(ref.id).set({ uid: ref.id }, { merge: true });
                    console.log("reset uid");
                    //console.log(firebase.firestore.Timestamp(expiry))
                    res(ref);
                }, (err) => {console.log('error in adding (Fire.shared)'); rej(err)})
                .catch(error => {
                    rej(error);
                });
        });
    };

    uploadPhotoAsync = async (uri, path) => {

        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase.storage().ref(path).put(file)

            upload.on("state_changed",
                snapshot => { },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );

        });
    };

    get firestore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get timestamp() {
        return Date.now()
    }
}

Fire.shared = new Fire();
export default Fire;
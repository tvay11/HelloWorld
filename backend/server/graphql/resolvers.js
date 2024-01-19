var admin = require("firebase-admin");

var serviceAccount = require("../firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://flight-project-1a1b6-default-rtdb.firebaseio.com"
});


const db = admin.firestore();
const Users = db.collection('users');
const Presets = db.collection('presets');

const resolvers = {
  Query: {
	getUserPresets: (parent, args) => {
		return new Promise((resolve, reject) => {
			fetchUserPresets(args.id, (presets) => {
			resolve(presets);
			});
		});
		}
  },
  Mutation: {
  
      createPreset: async (parent, args) => {
      const { id, title, locations } = args;
      
      // create a new preset document in the "presets" collection
      const newPresetRef = await Presets.add({ title, locations });
      const newPresetDoc = await newPresetRef.get();

      // add the new preset document reference to the user's "presets" array
      const userRef = Users.doc(id);
      const userDoc = await userRef.get();
      const userPresets = userDoc.data().presets || [];
      userPresets.push(newPresetRef);
      console.log(id);
      await userRef.update({ presets: userPresets });

      // return the newly created preset
      return newPresetDoc.data();
  },
  deletePreset: async (parent, args) => {
      const { id, index } = args;
      const userRef = Users.doc(id);
      const userDoc = await userRef.get();
      const userPresets = userDoc.data().presets || [];

      // remove the preset at the specified index from the user's "presets" array
      const presetRef = userPresets[index];
      userPresets.splice(index, 1);

      // delete the preset document from the "presets" collection
      await db.doc(presetRef.path).delete();

      // update the user's "presets" array
      await userRef.update({ presets: userPresets });

      // return the deleted preset
      return userDoc.data().presets.length;
    },
    editPreset: async (parent, args) => {
      const { id, index, title, locations } = args;
	  console.log(title);
      const userRef = Users.doc(id);
      const userDoc = await userRef.get();
      const userPresets = userDoc.data().presets || [];

      // update the preset document at the specified index in the "presets" collection
      const presetRef = userPresets[index];
      await db.doc(presetRef.path).update({ title, locations });

      // update the user's "presets" array
      userPresets[index] = presetRef;
      userPresets[index].title = title;
      userPresets[index].locations = locations;
      await userRef.update({ presets: userPresets });

      // return the updated preset
      return { title, locations };
    }
}
};


// Function to fetch all users presets
const fetchUserPresets = (userId, callback) => {
	Users.doc(userId)
	  .get()
	  .then((doc) => {
		const presetRefs = doc.data()?.presets || [];
		const promises = [];
		presetRefs.forEach((ref) => {
		  promises.push(
			db.doc(ref.path)
			  .get()
			  .then((presetDoc) => {
				return presetDoc.data();
			  })
			  .catch((error) => {
				console.log(error);
			  })
		  );
		});
		Promise.all(promises).then((presets) => {
		  return callback(presets);
		});
	  })
	  .catch((error) => {
		console.log(error);
	  });
  };

module.exports = resolvers;

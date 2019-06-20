import store from '@/store/store'
import firebase from 'firebase/app'
import 'firebase/storage'
import firebaseConfig from '@/config/firebase'

// configure firebase
firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

const FirebaseService = {
  convertDataURLToFile (dataURL) {
    // generate unique filename from time since epoch
    const fileName = `${Date.now()}.jpg`

    // split base64 string into data and content-type
    const block = dataURL.split(';')
    const contentType = block[0].split(':')[1]
    const data = block[1].split(',')[1]

    const sliceSize = 512

    const byteChars = atob(data)
    let byteArrays = []

    for (let offset = 0; offset < byteChars.length; offset += sliceSize) {
      const slice = byteChars.slice(offset, offset + sliceSize)

      let byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      let byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })
    return new File([ blob ], fileName)
  },

  async upload (dataURL) {
    // convert data:<url> string into JS File
    const file = this.convertDataURLToFile(dataURL)
    const filename = file.name

    // upload to firebase
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(filename)
      const task = storageRef.put(file)

      task.on('state_changed',
        (s) => {
          // update progress in modal VueX module
          const progressAsDecimal = s.bytesTransferred / s.totalBytes * 100
          store._actions['modal/updateProgress'][0](Math.floor(progressAsDecimal))
        },
        (err) => {
          reject(err)
        },
        async () => {
          const url = await storageRef.getDownloadURL()
          resolve(url)
        })
    })
  }
}

export default FirebaseService

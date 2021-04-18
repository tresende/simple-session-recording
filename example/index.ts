import { startSessionRecording } from '../src/simple-session-recording'

const start = () => {
  startSessionRecording({ fenceSize: 100, debugView: true })
}

start()

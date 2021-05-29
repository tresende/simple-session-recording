import { startSessionRecording } from '../src/simple-session-recording'

const start = () => {
  startSessionRecording({ interval: 35, fenceSize: 100, debugView: true })
}

start()

import { startSessionRecording } from '../src/simple-session-recording'

const start = () => {
  const element = document.getElementById('text')
  const text = startSessionRecording({ text: element.textContent })
  element.innerHTML = text
}

start()

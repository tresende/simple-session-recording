import './index.css'

export type SessionRecordingProps = {
  interval?: number
  fenceSize?: number
  debugView?: boolean
}

type SessionRecordingData = {
  interval?: number
  fenceSize?: number
  data?: number[]
}

function createBlockElement(fenceSize: number, text: number) {
  const blockElement = document.createElement('div')
  blockElement.setAttribute('style', `height:${fenceSize}px`)
  blockElement.setAttribute('class', 'session-container-block')
  blockElement.innerHTML += text
  return blockElement
}

const addDebugGrid = (fenceSize: number, debugView: boolean, add: (id: number) => void) => {
  document.body.innerHTML += `<div class="session-container" style="grid-template-columns: repeat(auto-fill, minmax(${fenceSize}px, 1fr));"></div>`
  const container = document.querySelector('.session-container')
  let id = 0
  while (window.outerHeight > container.clientHeight) {
    id++
    const blockElement = createBlockElement(fenceSize, id)
    const data = id
    blockElement.addEventListener('mouseenter', () => add(data))
    container.appendChild(blockElement)
  }
}

const initStore = (callback: () => void) => setInterval(() => callback(), 5000)

const storeData = (actualData: number[] = [], fenceSize: number, interval: number) => {
  const sessionData: SessionRecordingData = JSON.parse(localStorage.getItem('SESSION_DATA')) ?? {}
  const localStorageData: SessionRecordingData = { interval, fenceSize, data: sessionData.data }
  localStorageData.data = (localStorageData.data || []).concat(actualData)
  localStorage.setItem('SESSION_DATA', JSON.stringify(localStorageData))
}

let lastId: any = 0

const startSessionRecording = ({ interval = 250, fenceSize = 100, debugView = false }: SessionRecordingProps) => {
  const actualData: number[] = []
  initStore(() => storeData(actualData, interval, fenceSize))

  const add = (id: number) => {
    clearTimeout(lastId)
    lastId = setTimeout(() => actualData.push(id), interval)
  }

  addDebugGrid(fenceSize, debugView, add)
}

export { startSessionRecording }

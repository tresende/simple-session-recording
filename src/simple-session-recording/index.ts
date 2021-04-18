import './index.css'
export type SessionRecordingProps ={
  interval?: number,
  fenceSize?: number,
  debugView?: boolean,
}

const add = (x:number, y:number) => {
  console.log(x, y)
}

const addDebugGrid = (fenceSize: number) => {
  const bodyHtml = document.body.innerHTML
  document.body.innerHTML = `<div style="background-size:${fenceSize}px ${fenceSize}px;" class="session-container"></div>${bodyHtml}`
}

const startSessionRecording = ({ interval = 250, fenceSize = 100, debugView = false }: SessionRecordingProps) => {
  let x = 0
  let y = 0
  document.onmousemove = (e: MouseEvent) => {
    x = e.clientX
    y = e.clientY
  }

  if (debugView) addDebugGrid(fenceSize)
  setInterval(() => add(x / fenceSize, y / fenceSize), interval)
}

export { startSessionRecording }

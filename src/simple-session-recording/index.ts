export type SessionRecordingProps ={
  text: string
}

const startSessionRecording = ({ text }: SessionRecordingProps) => {
  return text.toUpperCase()
}

export { startSessionRecording }

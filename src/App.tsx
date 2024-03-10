import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Code, MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css';


const theme = createTheme({
  fontFamily: 'Inter',
  fontFamilyMonospace: 'JetBrains Mono'
})

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider theme={theme}>
      <div>
        <Code>console.log('Hello world!')</Code>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </MantineProvider>
  )
}

export default App

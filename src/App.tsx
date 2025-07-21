import { useState } from 'react';
import MaintanenceTicketing from './MaintanenceTicketing';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Testing</h1>
      <div className="text-3xl text-red-500">
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

      <MaintanenceTicketing />
    </>
  );
}

export default App;

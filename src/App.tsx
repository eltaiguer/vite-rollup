import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { rollup } from '@rollup/browser';
import './App.css';

function App() {
  const run = () => {
    const modules = {
      'main.js': "import foo from 'foo.js'; console.log(foo);",
      'foo.js': 'export default 42;',
    };

    rollup({
      input: 'main.js',
      plugins: [
        {
          name: 'loader',
          resolveId(source) {
            // eslint-disable-next-line no-prototype-builtins
            if (modules.hasOwnProperty(source)) {
              return source;
            }
            return null;
          },
          // eslint-disable-next-line @typescript-eslint/no-shadow
          load(id: any) {
            // eslint-disable-next-line no-prototype-builtins
            if (modules.hasOwnProperty(id)) {
              return modules[id as keyof typeof modules];
            }
            return null;
          },
        },
      ],
    })
      .then(bundle => bundle.generate({ format: 'es' }))
      .then(({ output }) => console.log(output[0].code));
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => run()}>Run code!</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;

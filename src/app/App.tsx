import './App.css';
import { useCallback, useState } from 'react';
import Counter from './components/Counter/Counter';
import { PipProviderComponent, usePipWindow } from './components/Pip/PiPProvider';
import PipWindow from './components/Pip/PiPWindow';

function App() {
	return (
		<PipProviderComponent>
			<PipWindowWidget />
		</PipProviderComponent>
	);
}

function PipWindowWidget() {
	const { isSupported, pipWindow, closePipWindow, requestPipWindow } = usePipWindow();

	const openPipWindow = useCallback(() => {
		console.log(`{} OPEN de: `);
		requestPipWindow({
			width: 400,
			height: 200,
		});
	}, [requestPipWindow]);

	const [count, setCount] = useState(0);

	const CounterComponent = () => <Counter count={count} setCount={setCount} />;

	return (
		<div>
			<div className='card'>{pipWindow ? 'running on floating window' : <CounterComponent />}</div>
			<>
				{isSupported && <button onClick={pipWindow ? closePipWindow : openPipWindow}>{pipWindow ? 'Close PiP' : 'Open PiP'}</button>}
				{pipWindow && (
					<PipWindow pipWindow={pipWindow}>
						<div className='pipRoot'>
							<CounterComponent />
						</div>
					</PipWindow>
				)}
			</>
		</div>
	);
}

export default App;

/* function PipWindow() {
	const { isSupported, requestPipWindow, pipWindow, closePipWindow } = usePiPWindow();

	const startPiP = useCallback(() => {
		requestPipWindow({
			width: 400,
			height: 200,
		});
	}, [requestPipWindow]);

	const [count, setCount] = useState(0);

	return (
		<div>
			<h1>PipWindow</h1>
			{isSupported ? (
				<>
					<button onClick={pipWindow ? closePipWindow : startPiP}>{pipWindow ? 'Close PiP' : 'Open PiP'}</button>
					{pipWindow && (
						<PiPWindow pipWindow={pipWindow}>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
								}}
							>
								<h3>Hello in PiP!</h3>
								<button
									onClick={() => {
										setCount((count) => count + 1);
									}}
								>
									Clicks count is {count}
								</button>
							</div>
						</PiPWindow>
					)}
				</>
			) : (
				<div className='error'>Document Picture-in-Picture is not supported in this browser</div>
			)}
		</div>
	);
}
 */

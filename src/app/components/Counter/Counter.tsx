import { FCC } from '../../../utils/types/component.type';

type Props = {
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
};

const Counter: FCC<Props> = ({ count, setCount }) => {
	return <button onClick={() => setCount((count) => count + 1)}>Clicks count is {count}</button>;
};

export default Counter;

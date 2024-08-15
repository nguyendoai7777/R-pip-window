import { createPortal } from 'react-dom';
import { FCC } from '../../../utils/types/component.type';

type PiPWindowProps = {
	pipWindow: Window;
};

const PipWindow: FCC<PiPWindowProps> = ({ pipWindow, children }) => {
	return createPortal(children, pipWindow.document.body);
};

export default PipWindow;

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { FCC } from '../../../utils/types/component.type';
import copyCssToPipWindow from './copy-css';

/**
 * @see [Document](https://developer.chrome.com/docs/web-platform/document-picture-in-picture)
 */
interface RequestPipWindowOptions {
	width?: number;
	height?: number;
	disallowReturnToOpener?: boolean;
}

type PiPContextType = {
	isSupported: boolean;
	pipWindow: Window | null;
	requestPipWindow: (option: RequestPipWindowOptions) => Promise<void>;
	closePipWindow: () => void;
};

declare const documentPictureInPicture: {
	requestWindow: (options?: RequestPipWindowOptions) => Promise<Window>;
};

const PiPContext = createContext<PiPContextType | undefined>(undefined);

export const PipProviderComponent: FCC = ({ children }) => {
	// Detect if the feature is available.
	const isSupported = 'documentPictureInPicture' in window;

	// Expose pipWindow that is currently active
	const [pipWindow, setPipWindow] = useState<Window | null>(null);

	// Close pipWidnow programmatically
	const closePipWindow = useCallback(() => {
		if (pipWindow) {
			pipWindow.close();
			setPipWindow(null);
		}
	}, [pipWindow]);

	// Open new pipWindow
	const requestPipWindow = useCallback(
		async ({ height, width }: RequestPipWindowOptions) => {
			// We don't want to allow multiple requests.\
			if (pipWindow) {
				return;
			}

			const pip = await documentPictureInPicture.requestWindow({
				width,
				height,
			});
			pip.addEventListener('pagehide', () => {
				setPipWindow(null);
			});
			copyCssToPipWindow(pip);
			setPipWindow(pip);
		},
		[pipWindow]
	);

	const value = useMemo(() => {
		return {
			isSupported,
			pipWindow,
			requestPipWindow,
			closePipWindow,
		} as PiPContextType;
	}, [isSupported, pipWindow, requestPipWindow, closePipWindow]);

	return <PiPContext.Provider value={value}>{children}</PiPContext.Provider>;
};

export function usePipWindow(): PiPContextType {
	const context = useContext(PiPContext);

	if (!context) {
		throw new Error('usePiPWindow must be used within a PiPContext');
	}

	return context;
}

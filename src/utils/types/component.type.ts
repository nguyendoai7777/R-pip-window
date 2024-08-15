import { ReactElement, ReactNode } from 'react';

export type PropsWithChildren<P> = P & { children?: ReactNode };

export interface FunctionComponent<P = {}> {
	(props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
	defaultProps?: Partial<P> | undefined;
	displayName?: string | undefined;
}

export type FCC<P = {}> = FunctionComponent<P>;

import React, { lazy, Suspense } from "react";
import { useAuth, useUserActions, useUserCustomization } from "../../hooks";

const ContextMemo = lazy(() => import("./ContextMemo"));

export const Quote = () => {
	const {
		storageAuth: { subscriptionSummary },
	} = useAuth();
	const {
		storageUserCustomization: { quotes, quotesVisible },
	} = useUserCustomization();
	const { setWidgetReady, skipQuote, toggleQuoteFavourite } = useUserActions();
	const hasPlus = !!subscriptionSummary?.plan;

	return (
		<>
			{quotesVisible && (
				<Suspense fallback={null}>
					<ContextMemo
						{...{
							hasPlus,
							quotes,
							setWidgetReady,
							skipQuote,
							toggleQuoteFavourite,
						}}
					/>
				</Suspense>
			)}
		</>
	);
};

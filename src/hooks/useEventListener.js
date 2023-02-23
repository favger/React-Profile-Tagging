import { useEffect } from "react";

export default function useEventListener(e, handler, passive = false) {
	useEffect(() => {
		window.addEventListener(e, handler, passive);

		return function remove() {
			window.removeEventListener(e, handler);
		};
	});
}

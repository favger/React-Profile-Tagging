import { useEffect } from "react";

function useElOutsideActionAlerter(ref, callback) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 **/
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback && callback(event);
			}
		};

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, callback]);
}

export default useElOutsideActionAlerter;

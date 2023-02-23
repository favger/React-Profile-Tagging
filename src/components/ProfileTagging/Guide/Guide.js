import { useRef, useState } from "react";
import useElOutsideActionAlerter from "../../../hooks/useElOutsideActionAlerter";

const defaultText = "Click photo to tag people";

function ProfileTaggingGuide({ text }) {
	const elRef = useRef(null);
	const [show, setShow] = useState(true);

	// actions
	const handleActionAlerter = () => {
		setShow(false);
	};

	// effects
	useElOutsideActionAlerter(elRef, handleActionAlerter);

	if (!show) {
		return null;
	}

	return (
		<div ref={elRef} className="profile-tagging-guide-tooltip">
			{text || defaultText}
		</div>
	);
}

export default ProfileTaggingGuide;

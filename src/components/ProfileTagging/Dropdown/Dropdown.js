import React, { useMemo, useRef } from "react";
import { useProfileTaggingContext } from "../Context";
import ProfileTaggingSearch from "./Search/Search";
import ProfileTaggingList from "./List/List";
import ProfileTaggingLoading from "./Loading/Loading";
import useElOutsideActionAlerter from "../../../hooks/useElOutsideActionAlerter";

function ProfileTaggingDropdown(props) {
	const elRef = useRef(null);
	const { pos, closeDropdown } = useProfileTaggingContext();

	// actions
	const handleActionAlerter = () => {
		closeDropdown();
	};

	// effects
	const dropdownPosStyle = useMemo(() => {
		if (!pos) return null;
		const marginSize = 30;

		return {
			left: pos.x - marginSize,
			top: pos.y - (marginSize - (marginSize - 10))
		};
	}, [pos]);

	// effects
	useElOutsideActionAlerter(elRef, handleActionAlerter);

	return (
		<div ref={elRef} className="profile-tagging-dropdown" style={dropdownPosStyle} {...props}>
			<ProfileTaggingSearch />
			<ProfileTaggingList />
			<ProfileTaggingLoading />
		</div>
	);
}

export default ProfileTaggingDropdown;

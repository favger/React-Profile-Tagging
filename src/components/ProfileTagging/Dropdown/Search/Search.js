import { useEffect, useRef } from "react";
import { useProfileTaggingContext } from "../../Context";

function ProfileTaggingDropdownSearch() {
	const inputRef = useRef(null);
	const { pos, setSearch } = useProfileTaggingContext();

	// actions
	const handleChange = (e) => setSearch(e.target.value);

	// effects
	useEffect(() => {
		if (!inputRef.current) return;
		inputRef.current.focus();
	}, [pos]);

	return (
		<input
			ref={inputRef}
			type="text"
			className="profile-tagging-dropdown-search"
			placeholder="Search"
			onChange={handleChange}
			autoFocus
		/>
	);
}

export default ProfileTaggingDropdownSearch;

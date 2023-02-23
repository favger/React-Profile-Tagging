import isEmpty from "lodash/isEmpty";
import { useProfileTaggingContext } from "../../Context";
import ProfileTaggingDropdownListItem from "./Item/Item";

function ProfileTaggingDropdownList() {
	const PTContext = useProfileTaggingContext();

	// renders
	if (isEmpty(PTContext.list)) {
		return null;
	}

	return (
		<div className="profile-tagging-dropdown-list">
			{PTContext.list.map((item, index) => (
				<ProfileTaggingDropdownListItem
					key={item[PTContext.keyField] || index}
					item={item}
				/>
			))}
		</div>
	);
}

export default ProfileTaggingDropdownList;

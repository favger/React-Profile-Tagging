import { useProfileTaggingContext } from "../Context";
import ProfileTaggingTagsTag from "./Tag/Tag";
import isEmpty from "lodash/isEmpty";

function ProfileTaggingTags() {
	const { keyField, tags } = useProfileTaggingContext();

	// renders
	if (isEmpty(tags)) {
		return null;
	}

	return (
		<div className="profile-tagging-tags">
			{tags.map((tag, index) => (
				<ProfileTaggingTagsTag key={`${index}-${tag[keyField]}`} tag={tag} />
			))}
		</div>
	);
}

export default ProfileTaggingTags;

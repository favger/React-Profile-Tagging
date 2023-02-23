import { useProfileTaggingContext } from "../../Context";

function ProfileTaggingLoading() {
	const PTContext = useProfileTaggingContext();

	// renders
	if (!PTContext.isLoading) {
		return null;
	}

	return <div className="profile-tagging-dropdown-loading">{PTContext.loading}</div>;
}

export default ProfileTaggingLoading;

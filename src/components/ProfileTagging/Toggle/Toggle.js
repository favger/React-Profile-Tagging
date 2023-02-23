import { useProfileTaggingContext } from "../Context";

function ProfileTaggingToggle() {
	const { tags, toggle } = useProfileTaggingContext();

	// actions
	const handleClick = () => {
		toggle();
	};

	// renders
	if (tags.length === 0) {
		return null;
	}

	return (
		<div className="profile-tagging-toggle" onClick={handleClick}>
			<svg
				color="#ffffff"
				fill="#ffffff"
				height="14"
				width="14"
				role="img"
				viewBox="0 0 24 24">
				<path d="M21.334 23H2.666a1 1 0 0 1-1-1v-1.354a6.279 6.279 0 0 1 6.272-6.272h8.124a6.279 6.279 0 0 1 6.271 6.271V22a1 1 0 0 1-1 1ZM12 13.269a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6Z" />
			</svg>
		</div>
	);
}

export default ProfileTaggingToggle;

import isEmpty from "lodash/isEmpty";
import ProfileTaggingGuide from "../Guide/Guide";
import ProfileTaggingDropdown from "../Dropdown/Dropdown";
import ProfileTaggingTags from "../Tags/Tags";
import ProfileTaggingToggle from "../Toggle/Toggle";
import { useProfileTaggingContext } from "../Context";

function ProfileTagging({ children }) {
	const {
		tags,
		max,
		pos,
		setPos,
		setShowToggle,
		showToggleButton,
		guideTooltipText
	} = useProfileTaggingContext();

	// actions
	const handleTargetClick = (e) => {
		if (tags.length >= max) {
			return;
		}

		const el = e.currentTarget;

		if (!e.target.classList.contains("profile-tagging-target")) {
			return;
		}

		const rect = el.getBoundingClientRect();
		//const elOriginalWidth = el.naturalWidth;
		//const elOriginalHeight = el.naturalHeight;

		const clientX = e.clientX;
		const clientY = e.clientY;

		const x = clientX - rect.left;
		const y = clientY - rect.top;

		const xPercent = (x / rect.width) * 100;
		const yPercent = (y / rect.height) * 100;

		setPos({
			clientX,
			clientY,
			x,
			y,
			width: rect.width,
			height: rect.height,
			xPercent,
			yPercent
		});

		setShowToggle(true);
	};

	return (
		<div className="profile-tagging-container">
			{/*begin::ProfileTaggingDropdown*/}
			{!isEmpty(pos) && <ProfileTaggingDropdown />}
			{/*end::ProfileTaggingDropdown*/}

			{/*begin::ProfileTaggingTarget*/}
			<div className="profile-tagging-target" onClick={handleTargetClick}>
				{/*begin::ProfileTaggingGuide*/}
				{!isEmpty(guideTooltipText) && <ProfileTaggingGuide text={guideTooltipText} />}
				{/*end::ProfileTaggingGuide*/}

				{/*begin::ProfileTaggingTags*/}
				<ProfileTaggingTags />
				{/*end::ProfileTaggingTags*/}

				{/*begin::ProfileTaggingToggle*/}
				{showToggleButton && <ProfileTaggingToggle />}
				{/*end::ProfileTaggingToggle*/}

				{children}
			</div>
			{/*end::ProfileTaggingTarget*/}
		</div>
	);
}

export default ProfileTagging;

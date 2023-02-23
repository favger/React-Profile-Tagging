import { useProfileTaggingContext } from "../../../Context";

function ProfileTaggingDropdownListItem({ item, ...props }) {
	const PTContext = useProfileTaggingContext();

	const handleClick = () => {
		PTContext.addTag(item, {
			...PTContext.pos,
			y: PTContext.pos.y,
			x: PTContext.pos.x
		});
		PTContext.closeDropdown();
	};

	return (
		<div className="profile-tagging-dropdown-list-item" onClick={handleClick} {...props}>
			<div className="profile-tagging-dropdown-list-item-avatar">
				<img src={`https://picsum.photos/100/100/?id=${item.id}`} alt="" />
			</div>
			<div className="profile-tagging-dropdown-list-item-body">
				<div className="profile-tagging-dropdown-list-item-body-title">{item.username}</div>
				<div className="profile-tagging-dropdown-list-item-body-subtitle">{item.name}</div>
			</div>
		</div>
	);
}

export default ProfileTaggingDropdownListItem;

import { useProfileTaggingContext } from "../../Context";
import isEmpty from "lodash/isEmpty";
import Draggable from "react-draggable";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function ProfileTaggingTags({ tag }) {
	const tagRef = useRef();
	const { tags, showToggle, updateTag, removeTag } = useProfileTaggingContext();

	const getPosByTargetSize = useCallback(
		(basePos) => {
			if (!tagRef.current) {
				return basePos;
			}

			const parent = tagRef.current.parentNode;

			if (!parent || !parent.classList.contains("profile-tagging-tags")) {
				return basePos;
			}

			const targetWidth = parent.clientWidth; // 512
			const targetHeight = parent.clientHeight; // 512

			const boxWBypercent = Math.round((tag.pos.x / tag.pos.width) * 100);
			const boxXByBoxW = (targetWidth * boxWBypercent) / 100;

			const boxHBypercent = Math.round((tag.pos.y / tag.pos.height) * 100);
			const boxYByBoxH = (targetHeight * boxHBypercent) / 100;

			//console.log("w:", targetWidth, boxWBypercent, boxXByBoxW);
			//console.log("h:", targetHeight, boxHBypercent, boxYByBoxH);

			//console.log("target width", targetWidth, "target height", targetHeight);
			//console.log("x", basePos.x, "static width", basePos.width);
			//console.log("box w percent", boxWBypercent, "box x", boxXByBoxW);

			return {
				...basePos,
				x: boxXByBoxW,
				y: boxYByBoxH
			};
		},
		[tag.pos]
	);

	const [basePos, setBasePos] = useState(tag.pos);

	/*
	const posByTagElement = useMemo(() => {
		const tagElWidth = tagRef.current.clientWidth;
		const tagElHeight = tagRef.current.clientHeight;

		return {
			...basePos,
			x: basePos.x - tagElWidth / 2
			//y: basePos.y - (tagElHeight / 2)
		};
	}, [tagRef.current, basePos]);
	*/

	// effects
	// this effect will provide to this component with sync with coming tag data
	useEffect(() => {
		setBasePos((basePos) =>
			basePos.x !== tag.pos.x && basePos.y !== tag.pos.y ? tag.pos : basePos
		);
	}, [tag.pos]);

	useEffect(() => {
		if (!tagRef.current) return; // wait for the elementRef to be available
		let initialized = false;
		const resizeObserver = new ResizeObserver(() => {
			if (!initialized) {
				initialized = true;
				return;
			}

			setBasePos(getPosByTargetSize);
		});
		resizeObserver.observe(tagRef.current.parentNode);
		return () => resizeObserver.disconnect(); // clean up
	}, [getPosByTargetSize]);

	// actions
	const handleRemove = (data) => (e) => {
		removeTag(data);
	};

	const onStart = (e, data) => {
		const newPos = { x: data.lastX, y: data.lastY };
		setBasePos((basePos) => ({ ...basePos, ...newPos }));
	};

	const onStop = (e, data) => {
		const newPos = { x: data.lastX, y: data.lastY };
		setBasePos((basePos) => ({ ...basePos, ...newPos }));
		updateTag(tag, newPos);
	};

	// renders
	if (isEmpty(tags)) {
		return null;
	}

	return (
		<Draggable
			bounds="parent"
			//positionOffset={{ x: "10px", y: "10px" }}
			position={basePos}
			defaultClassName=""
			defaultClassNameDragging="dragging"
			defaultClassNameDragged="dragged"
			onStart={onStart}
			onStop={onStop}>
			<div
				ref={tagRef}
				className={`profile-tagging-tags-item ${!showToggle ? "hidden" : ""}`}>
				<div className="profile-tagging-tags-item-inner">
					{tag.username}
					<div
						className="profile-tagging-tags-item-remove-btn"
						onClick={handleRemove(tag)}
					/>
				</div>
			</div>
		</Draggable>
	);
}

export default ProfileTaggingTags;

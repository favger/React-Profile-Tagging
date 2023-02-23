import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import toLower from "lodash/toLower";
import isArray from "lodash/isArray";
import isNull from "lodash/isNull";
import isNil from "lodash/isNil";
import { uniqBy } from "lodash";

const ProfileTagging = createContext();

export const useProfileTaggingContext = () => useContext(ProfileTagging);

function ProfileTaggingContextProvider({
	keyField,
	localData,
	tags: initialTags,
	max,
	guideTooltipText,
	loading,
	showToggleButton,
	onSearch,
	onSelect,
	onChange,
	children,
	...rest
}) {
	const inited = useRef(false);
	const [pos, setPos] = useState(null);
	const [tags, setTags] = useState([]);
	const [search, setSearch] = useState(null);
	const [profilesData, setProfilesData] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [showToggle, setShowToggle] = useState(true);

	const extra = {
		keyField,
		localData,
		guideTooltipText,
		max,
		loading,
		showToggleButton,
		onSearch,
		onSelect
	};

	// data
	const filteredList = useMemo(() => {
		let results = [];

		// if the search box is empty
		if (isEmpty(search)) {
			return results;
		}

		// if there is raw data
		if (isArray(localData) && !isEmpty(localData)) {
			const findedInRawData = localData.filter(
				(item) =>
					toLower(item.name).indexOf(toLower(search)) !== -1 ||
					toLower(item.username).indexOf(toLower(search)) !== -1
			);

			results = [...results, ...findedInRawData];
		}

		// if there is profiles data
		if (isArray(profilesData) && !isEmpty(profilesData)) {
			results = [...results, ...profilesData];
		}

		return results;
	}, [localData, profilesData, search]);

	// actions
	const addTag = (tag, pos) => {
		if (tags.length >= max) {
			return;
		}

		onSelect && onSelect(tag, pos);
		setTags((prevTags) => {
			const newTag = { ...tag, pos };

			// if tag added before then update object
			const findedTag = prevTags.find((x) => x[keyField] === tag[keyField]);
			if (findedTag) {
				const filteredPrevTags = prevTags.filter((x) => x[keyField] !== tag[keyField]);
				return [...filteredPrevTags, newTag];
			}

			// add new tag to tags pool
			return [...prevTags, newTag];
		});
	};

	const updateTag = (tag, newPos) => {
		setTags((tags) =>
			tags.map((x) =>
				x[keyField] === tag[keyField] ? { ...x, pos: { ...x.pos, ...newPos } } : x
			)
		);
	};

	const removeTag = (tag) => {
		setTags((tags) => tags.filter((x) => x[keyField] !== tag[keyField]));
	};

	const closeDropdown = () => {
		setPos(null);
		setLoading(false);
		setSearch(null);
	};

	const toggle = (status) => {
		if (!isNil(status)) {
			setShowToggle(!!status);
			return;
		}

		setShowToggle((status) => !status);
	};

	// effects
	useEffect(() => {
		if (!onSearch || isNull(search)) {
			return;
		}

		(async () => {
			if (!isEmpty(search)) {
				setLoading(true);
				setProfilesData([]);
				const results = await onSearch(search);
				setProfilesData(results);
			}

			setLoading(false);
		})();
	}, [search, onSearch]);

	useEffect(() => {
		if (isEmpty(initialTags) || !isArray(initialTags)) {
			return;
		}

		setTags(initialTags);
	}, [initialTags, keyField]);

	useEffect(() => {
		if (inited.current === false) {
			inited.current = true;
			return;
		}

		if (!onChange) return;
		onChange(tags);
	}, [tags]);

	const value = {
		// data
		keyField,
		list: filteredList,

		// states
		search,
		setSearch,
		pos,
		setPos,
		tags,
		loading,
		isLoading,
		setLoading,
		showToggle,
		setShowToggle,

		// actions
		addTag,
		updateTag,
		removeTag,
		closeDropdown,
		toggle,

		// extra
		...extra
	};

	return <ProfileTagging.Provider value={value}>{children}</ProfileTagging.Provider>;
}

ProfileTaggingContextProvider.propTypes = {
	keyField: PropTypes.string,
	localData: PropTypes.array,
	max: PropTypes.number,
	guideTooltipText: PropTypes.string,
	loading: PropTypes.any,
	onSearch: PropTypes.func,
	onSelect: PropTypes.func
};

ProfileTaggingContextProvider.defaultProps = {
	keyField: "id",
	loading: "Loading...",
	showToggleButton: true
};

export default ProfileTaggingContextProvider;

import ProfileTaggingContextProvider from "./Context";
import ProfileTaggingContainer from "./Container/Container";

function ProfileTagging({ children, ...props }) {
	return (
		<ProfileTaggingContextProvider {...props}>
			<ProfileTaggingContainer>{children}</ProfileTaggingContainer>
		</ProfileTaggingContextProvider>
	);
}

export default ProfileTagging;

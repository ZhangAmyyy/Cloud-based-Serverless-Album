const spacesUrl = 'https://snio6evmy9.execute-api.us-west-2.amazonaws.com/prod/'

export const config = {
    REGION: 'us-west-2',
    USER_POOL_ID: 'us-west-2_PUedaHU9f',
    APP_CLIENT_ID: 'bcr6nf7a4fn208gsgjj9huq4d',
    IDENTITY_POOL_ID: 'us-west-2:0d36c467-19ad-4cb1-b7a6-548cb3f8a240',
    TEST_USER_NAME: 'barosanu2',
    TEST_USER_PASSWORD: 'askjskfT7sdf&',
    SPACES_PHOTOS_BUCKET: 'spaces-photos-0626d32a0917',
    PROFILE_PHOTOS_BUCKET: 'profile-photos-0626d32a0917',
    api: {
        baseUrl: spacesUrl,
        spacesUrl: `${spacesUrl}spaces/`,
        reservationsUrl: `${spacesUrl}reservations/`
    }
}
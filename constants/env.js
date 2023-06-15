const API_URL = "https://server.marketrix.co"; // "https://api.marketrix.io/";

const END_POINTS = {
    MEETING: {
        TEST: "/posts",
        CLIENT_JOIN: 'videoSDK/video_sdk/client_join_meeting',
        USER_JOIN: 'videoSDK/video_sdk/user_join_meeting',
        TOKEN_JOIN: 'videoSDK/video_sdk/token_join_meeting',
        GUEST_JOIN: 'videoSDK/video_sdk/guest_join_meeting',
        ADMIN_JOIN: 'videoSDK/video_sdk/admin_join_meeting',
        //    END_MEETING: 'videoSDK/video_sdk/end_meeting',
        MEETING_CREATE: 'admin/meeting/create_meeting',
        UPDATE_PITCH: 'admin/meeting/update/',
        UPDATE_CLIENTS: 'admin/meeting/update_clients/',
        GET_ALL: 'admin/meeting/all',
        START_MEETING: 'videoSDK/video_sdk/create_meeting',
        END_MEETING: 'admin/meeting/end_meeting/',
        RESEND_EMAIL: 'admin/email/resend_email/',
        RESEND_EMAIL_V2: 'admin/email/resend_email_v2',
        DELETE_MEETING: 'admin/meeting/delete/'
    }
}

const NICO2_API_ENDPOINT_VIDEO = "https://api.search.nicovideo.jp/api/v2/video/contents/search";
const NICO2_API_ENDPOINT_LIVE = "https://api.search.nicovideo.jp/api/v2/live/contents/search";

type field_val =
    "contentId" |
    "title" |
    "description" |
    "userId" |
    "viewCounter" |
    "mylistCounter" |
    "lengthSeconds" |
    "thumbnailUrl" |
    "startTime" |
    "threadId" |
    "commentCounter" |
    "lastCommentTime" |
    "categoryTags" |
    "channelId" |
    "tags" |
    "tagsExact" |
    "lockTagsExact" |
    "genre" |
    "genre.keyword";
/**
 * niconico search query interface
 */
interface nico2Query {
    q: string
    targets: string
    fields?: Array<field_val>
    filters?: string
    jsonFilter?: string
    _sort: string
    _offset?: number
    _limit?: number
    _context: string
};

interface videoField {
    "contentId": string
    "title": string
    "description": string
    "userId": string
    "viewCounter": number
    "mylistCounter": number
    "lengthSeconds": number
    "thumbnailUrl": string
    "startTime": string
    "threadId": number
    "commentCounter": number
    "lastCommentTime": string
    "categoryTags": string
    "channelId": number
    "tags": string
    "tagsExact": string
    "lockTagsExact": string
    "genre": string
    "genre.keyword": string
}

class nico2test {
    private _query: nico2Query;

    constructor(query: nico2Query) {
        this._query = {
            q: query.q,
            targets: query.targets,
            fields: query.fields,
            filters: query.filters,
            jsonFilter: query.jsonFilter,
            _sort: query._sort,
            _offset: query._offset,
            _limit: query._limit,
            _context: query._context
        };
    };
}
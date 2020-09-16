import fetch, { Headers } from "node-fetch";

export const NICO2_API_ENDPOINT_VIDEO = "https://api.search.nicovideo.jp/api/v2/video/contents/search";
export const NICO2_API_ENDPOINT_LIVE = "https://api.search.nicovideo.jp/api/v2/live/contents/search";
const USER_AGRNT = "nico2searchLib(twitter @ytg_vip)";

/**
 * niconico search query interface
 */
export interface nico2Query {
    q: string
    targets: TVideoFields
    fields?: Array<TVideoCanGetFields>
    filters?: string
    jsonFilter?: string
    _sort: TVideoCanSort
    _offset?: number
    _limit?: number
    _context: string
};

export class nico2test {
    public query: nico2Query;
    public header: Headers;

    constructor(query: nico2Query) {
        this.header = new Headers();
        this.header.append('User-Agent', USER_AGRNT);

        this.query = {
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

    getQuery(): string {
        let res = `?q=${this.query.q}`;
        res += `&targets=${this.query.targets}`
        res += `&_sort=${this.query._sort}`
        res += `&_context=${this.query._context}`
        return res;
    }

    async getContent() {
        let url = NICO2_API_ENDPOINT_VIDEO + this.getQuery();
        url = encodeURI(url);
        let res = await fetch(url, { headers: this.header });
        let json = await res.json();
        console.log(url)
        console.log(json);
    }
}

let a: nico2Query = {
    q: "初音ミク",
    targets: "title",
    _sort: "-viewCounter",
    _context: "tsStudy(twitter@ytg_vip)"
};

let test = new nico2test(a);
test.getContent();
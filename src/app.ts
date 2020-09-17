import fetch, { Headers } from "node-fetch";
import { IResponse, IVideoField, nico2Query } from "./@types/video";

export const NICO2_API_ENDPOINT_VIDEO = "https://api.search.nicovideo.jp/api/v2/video/contents/search";
export const NICO2_API_ENDPOINT_LIVE = "https://api.search.nicovideo.jp/api/v2/live/contents/search";
const USER_AGRNT = "nico2searchLib(twitter @ytg_vip)";

/** niconico search query interface */
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

    /** クエリを連結する */
    makeQuery(): string {
        let res = `?q=${this.query.q}`;
        res += `&targets=${this.query.targets}`
        res += `&_sort=${this.query._sort}`
        res += `&_context=${this.query._context}`

        if (this.query.fields) {
            this.query.fields.forEach((val, i) => {
                if (i == 0) {
                    res += `&fields=${val}`
                } else {
                    res += `,${val}`
                }
            });
        }

        return res;
    }


    /** コンテンツ取得関数 */
    async getContents(): Promise<IResponse> {
        let url = NICO2_API_ENDPOINT_VIDEO + this.makeQuery();
        console.log(url);
        url = encodeURI(url);
        console.log(url);
        let res = await fetch(url, { headers: this.header });
        let json: IResponse = await res.json();

        if (json.meta.status !== 200) {
            // コンテンツ取得失敗時、空データを詰める
            Object.assign(json, json, {
                data: [{
                    "contentId": "",
                    "title": "",
                    "description": "",
                    "userId": 0,
                    "viewCounter": 0,
                    "mylistCounter": 0,
                    "lengthSeconds": 0,
                    "thumbnailUrl": 0,
                    "startTime": "",
                    "threadId": 0,
                    "commentCounter": 0,
                    "lastCommentTime": "",
                    "categoryTags": "",
                    "channelId": 0,
                    "tags": "",
                    "tagsExact": "",
                    "lockTagsExact": "",
                    "genre": "",
                    "genre.keyword": ""
                }]
            });
        }
        return json;
    }

    /**
     * クエリ作成支援関数  
     * notは単体では使用できません  
     * この関数で作成できない複雑なクエリを作成する際は以下を参照してください  
     * https://site.nicovideo.jp/search-api-docs/search.html
     * @param and 
     * @param or 
     * @param not 
     */
    static getQ(or?: Array<string>, and?: Array<string>, not?: Array<string>): string {
        let ret = "";
        if (and) {
            and.forEach((val, i) => {
                if (i == 0) {
                    ret = val;
                } else {
                    ret += ` ${val}`
                }
            });
        }

        if (or) {
            or.forEach((val, i) => {
                if (i == 0) {
                    ret += and ? ` OR ${val}` : val;
                } else {
                    ret += ` OR ${val}`
                }
            });
        }

        if ((or || and) && not) {
            not.forEach((val) => {
                ret += ` -${val}`
            })
        }

        return ret;
    }
}

let a: nico2Query = {
    q: nico2test.getQ(["初音ミク", "ボーカル"], undefined, ["歌ってみた"]),
    targets: "title",
    fields: ["title", "description", "tags", "viewCounter"],
    _sort: "+viewCounter",
    _limit: 10,
    _context: USER_AGRNT,
};

let test = new nico2test(a);
test.getContents().then(val => {
    console.log(val);
    val.data.map((val, i) => {
        console.log(`${i}: ${val.title} 再生回数:${val.viewCounter} タグ:${val.tags}`);
    });
});
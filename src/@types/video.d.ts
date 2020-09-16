type TVideoFields =
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
    "tagExact" |
    "lockTagsExact" |
    "genre" |
    "genre.keyword";

type TVideoCanGetFields =
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
    "lockTagsExact" |
    "genre" |
    "genre.keyword";

type TVideoCanSort =
    /**A */
    "+userId" |
    /**B */
    "-userId" |
    "+viewCounter" |
    "-viewCounter" |
    "+mylistCounter" |
    "-mylistCounter" |
    "+lengthSeconds" |
    "-lengthSeconds" |
    "+startTime" |
    "-startTime" |
    "+threadId" |
    "-threadId" |
    "+commentCounter" |
    "-commentCounter" |
    "+lastCommentTime" |
    "-lastCommentTime" |
    "+channelId";

type TVideoCanFilters =
    "userId" |
    "viewCounter" |
    "mylistCounter" |
    "lengthSeconds" |
    "startTime" |
    "threadId" |
    "commentCounter" |
    "lastCommentTime" |
    "categoryTags" |
    "channelId" |
    "tags" |
    "tagExact" |
    "lockTagsExact" |
    "genre" |
    "genre.keyword";

    export interface nico2Query {
        /**
         * 検索キーワード
         */
        q: string
    
        /**
         * 検索対象のフィールド
         */
        targets: TVideoFields
    
        /**
         * レスポンスに必要なフィールド
         */
        fields?: Array<TVideoCanGetFields>
    
        /**
         * フィルタ
         */
        filters?: string
    
        /**
         * 複雑な条件を指定する際のフィルタ
         */
        jsonFilter?: string
    
        /**
         * ソートする対象、方向
         */
        _sort: TVideoCanSort
    
        /**
         * 取得コンテンツオフセット  
         * default : 0  
         * max : 1600  
         */
        _offset?: number
    
        /**
         * 取得コンテンツ最大数  
         * default : 10  
         * max : 100  
         */
        _limit?: number
    
        /**
         * サービス、アプリケーション名  
         * 最大40文字
         */
        _context: string
    };
    
    export interface IVideoField {
        /**
         * コンテンツID
         * https://nico.ms/ の後に連結することでコンテンツのURLになります
         */
        "contentId"?: string,
        /** タイトル */
        "title"?: string,
        /** コンテンツの説明文 */
        "description"?: string,
        /** 投稿者のID */
        "userId"?: number,
        /** 再生数 */
        "viewCounter"?: number,
        /** マイリスト数 */
        "mylistCounter"?: number,
        /** 再生時間(秒) */
        "lengthSeconds"?: number,
        /** サムネイルのURL */
        "thumbnailUrl"?: number,
        /** 動画の登校時間 */
        "startTime"?: string,
        /** スレッドのID */
        "threadId"?: number,
        /** コメント数 */
        "commentCounter"?: number,
        /** 最終コメント時間 */
        "lastCommentTime"?: string,
        /** カテゴリタグ */
        "categoryTags"?: string,
        /** チャンネルのID */
        "channelId"?: number,
        /** タグ(空白区切り) */
        "tags"?: string,
        /** タグ完全一致(空白区切り) */
        "tagsExact"?: string,
        /** ロックされたタグ(空白区切り) */
        "lockTagsExact"?: string,
        /** ジャンル */
        "genre"?: string,
        /** ジャンル完全一致 */
        "genre.keyword"?: string
    }

    export interface IResponse {
        /** レスポンスのメタ情報フィールド */
        "meta": {
            /** HTTPステータス */
            "status": number,
            /** ヒット件数 */
            "totalCount": number,
            /** リクエストID */
            "id": string
        },
        /** 
         * ヒットしたコンテンツ 
         * 要素の内容はパラメータfieldsによって異なる
         * */
        "data": Array<IVideoField>
    }
    
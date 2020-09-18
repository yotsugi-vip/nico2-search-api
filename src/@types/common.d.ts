interface IFilterBase<T> {
    /** 設定値以上を取得するフィルタ */
    gte?: T
    /** 設定値以下を取得するフィルタ */
    lt?: T
}

type TFilter<T> = Array<T> | IFilterBase<T>;


type base = {
    gte?: number,
    lt?: number
}
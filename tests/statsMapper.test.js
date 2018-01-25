import statsReducer from "../src/reducers/statsReducer"
import statsMapper from "../src/api/statsMapper"

test('Object from mapper must be equals reducer stage', () => {
    const fakeResponse = {
        "stats": {
            "rating": 1334,
            "matches_cnt": 66,
            "win_matches_cnt": 0,
            "topten_matches_cnt": 7,
            "kills_sum": 43,
            "kills_max": 5,
            "assists_sum": 5,
            "headshot_kills_sum": 10,
            "deaths_sum": 66,
            "longest_kill_max": 302,
            "rank_avg": 52.92424242424242,
            "damage_dealt_avg": 88.61011082575757,
            "time_survived_avg": 680.1432727272727,
            "_model_0": "API\\UserRankedStatsStats"
        },
        "ranks": {
            "rating": 470359,
            "_model_1": "API\\UserRankedStatsRanks"
        },
        "max_ranks": {
            "rating": 1286103,
            "_model_2": "API\\UserRankedStatsRanks"
        },
        "_model_3": "API\\UserRankedStats"
    }

    const convertedData = statsMapper(fakeResponse)
    const reducerState = statsReducer(undefined, { type: 'ACTION_FROM_TESTS' })

    expect(Object.keys(convertedData).sort()).toEqual(Object.keys(reducerState).sort());
});
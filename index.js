const fetch = require("node-fetch");
let baseUrl = "https://9gag.com/";

let self = module.exports = {
    getFetch(url) {
        return fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36",
                "Content-Type": "application/json"
            },
        })
    },
    async getType({ type = "hot", cursor = "", simplified = false }) {
        let url = `${baseUrl}v1/group-posts/group/default/type/${type}`;
        if (cursor.length > 0) {
            url += `?${cursor}`
        }

        let res = await self.getFetch(url);
        let json = await res.json();
        if (json["meta"]["status"] !== "Success") {
            if (typeof json["meta"]["errorMessage"] !== "undefined" && json["meta"]["errorMessage"] !== "") {
                throw new Error(json["meta"]["errorMessage"]);
            } else {
                throw new Error("Request failed.");
            }
        }

        return {
            posts: (!simplified) ? json["data"]["posts"] : json["data"]["posts"].map(p => {
                let { id, title, type, upVoteCount, downVoteCount, creationTs, images, commentsCount } = p;
                return { id, title, type, upVoteCount, downVoteCount, creationTs, images, commentsCount };
            }),
            cursor: json["data"]["nextCursor"]
        };
    },
    async getComments({ id = "", orderKey = "" }) {
        let url = `https://comment-cdn.9gag.com/v1/cacheable/comment-list.json?appId=a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b&url=http:%2F%2F9gag.com%2Fgag%2F${id}&count=30&order=score&origin=https:%2F%2F9gag.com`
        if (orderKey.length > 0) {
            url += `&ref=${orderKey}`;
        }

        let res = await self.getFetch(url);
        let json = await res.json();
        if (json["status"] !== "OK") {
            throw new Error("Request failed.");
        }

        return json["payload"]["comments"];
    }
}

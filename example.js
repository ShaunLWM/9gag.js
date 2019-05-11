const NineGag = require("./index"); // const NineGag = require("9gag.js");
(async () => {
    // Fetch the first page of the hot section
    let hot = await NineGag.getType({ type: "hot" });
    console.log(hot["posts"]);

    // Fetch comments of the first post in the hot section
    let comments = await NineGag.getComments({ id: hot["posts"][0]["id"] });
    console.log(comments);

    // Getting page 2 of hot section
    let hotPage2 = await NineGag.getType({ type: "hot", cursor: hot["cursor"] });
    console.log(hotPage2["posts"]);

    // Getting page 2 of specified post's comments
    let commentsPage2 = await NineGag.getComments({ id: hot["posts"][0]["id"], orderKey: comments[comments.length - 1]["orderKey"] });
    console.log(commentsPage2);

    // Simplified view of the hot section page 1
    let simplifiedHot = await NineGag.getType({ type: "hot", simplified: true });
    console.log(simplifiedHot["posts"]);

    // Fetch simplified comments of the first post in the hot section
    let comments = await NineGag.getComments({ id: simplifiedHot["posts"][0]["id"], simplified: true });
    console.log(comments);
})();
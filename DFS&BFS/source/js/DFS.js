// 深度优先
const findPathDFS = (data, goal) => {
    let startTime = new Date().getTime();
    let dataSource = data;
    let res = [];
    return (function dfs(data) {

        /**
         * 先压入 dataSource 的第一个元素，
         * 如果该元素有 child ，则继续压入，重复到没有 child 为止
         */
        res.push(data);
        if (data.child) {
            return dfs(data.child.shift());
        }

        /**
         * 开始遍历 res，从 res 的最后一个元素开始匹配目标，
         * 如果目标存在，返回目标，不再匹配
         */
        if (res[res.length - 1].name == goal) {
            let endTime = new Date().getTime();
            let duration = (endTime - startTime) / 1000; // 搜索速度
            let result = {
                id:       res[res.length - 1].id,
                name:     res[res.length - 1].name,
                duration: duration  
            }
            return result
        }

        /**
         * 需要注意的是，如果没有匹配到结果，
         * 则弹出 res 的最后一个元素，该元素是倒数第二个元素的 child，
         * 因此在后续步骤需要删除倒数第二个元素的 child 中对应的这个元素
         */
        res.pop();

        /**
         * 如果 res 数组没有剩余元素，并且 dataSource 还有剩余元素，
         * 那么 res 继续压入 dataSource 的剩余元素，
         * 否则返回 null
         */
        if (res.length < 1) {
            return (dataSource.length > 0 ?
                dfs(dataSource.shift()) : null)
        }

        /**
         * 因为 res 没有匹配到目标，
         * 删除 res[res.length - 1].child 即 lastNode.child
         */
        let lastNode = res[res.length - 1];
        lastNode.child.shift();

        /**
         * 当 lastNode.child 没有剩余元素时，
         * 删除 lastNode.child，继续匹配 res 弹出（最后一个）的元素
         */
        if (lastNode.child.length < 1) {
            delete lastNode.child
            return dfs(res.pop());
        }

        /**
         * 删除 lastNode.child 第一个元素后，继续匹配 lastNode.child[0]
         */
        return dfs(lastNode.child[0])

    })(dataSource.shift())
};
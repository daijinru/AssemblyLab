const findPathBFS = function(data, goal) {
    let startTime = new Date().getTime();
    let res = [];

    /**
     * res 用展开数组的方式压入所有 data.child，
     * 在遍历过程中，res 是一个不断增加元素的数组，
     * 因为将 res 的 child，和 child 的 child 都横向压入到 res
     */
    res.push(...data);

    /**
     * 遍历 res 数组
     * 如果 res[i] 匹配成功，则返回，不再匹配，
     * 在每一次遍历过程中的匹配失败后，检查 res[i] 是否有 child 元素，如果有的话，将 child 元素展开并压入 res 数组，
     * 如果最终匹配失败，返回 null
     */
    for (let i = 0; i < res.length; i++) {

        if (res[i].name == goal) {
            let duration = new Date().getTime() - startTime;
            let result = {
                id:       res[i].id,
                name:     res[i].name,
                child:    res[i].child,
                duration: duration  
            }
            return result
        }

        if (res[i].child) {
            res.push(...res[i].child);
        }
    }

    return null;
};
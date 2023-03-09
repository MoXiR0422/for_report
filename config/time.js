const sellTime = () => {
    let vaqt =new Date()
    let clock=[vaqt.getUTCFullYear(),vaqt.getMonth()+1,vaqt.getDate(),vaqt.getHours(),vaqt.getMinutes,vaqt.getDay()]
    return clock
}
module.exports= sellTime
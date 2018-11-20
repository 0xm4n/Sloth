const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var res = await mysql("partTimeList")
  var num = res.length
  var str = "{\"data\":["
  var count = 0
  for (var i = 0; i < num; i++) {
    var job_name = res[i].pt_name
    var work_time = res[i].work_time
    var work_address = res[i].work_address
    var work_require = res[i].work_requirement
    var job_tag1 = res[i].pt_type
    var job_tag2 = res[i].time_validity
    var salary = res[i].pt_salary

    if (count == 0)
      str += "{"
    else
      str += ",{"
    str += "\"job_name\":\"" + job_name + "\","
    str += "\"work_time\":\"" + work_time + "\","
    str += "\"work_address\": \"" + work_address + "\","
    str += "\"work_require\": \"" + work_require + "\","
    str += "\"job_tag1\": \"" + job_tag1 + "\","
    str += "\"job_tag2\": \"" + job_tag2 + "\","
    str += "\"salary\": \"" + salary + "\""
    str += "}"
    count += 1
  }
  str += "]}"
  ctx.state.data = JSON.parse(str)
}

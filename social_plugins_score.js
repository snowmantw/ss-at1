/*
 * for beautifier student score page
 */

var tmpl = {}
tmpl['total_cal'] = function(course) {
    var t = 
    [
        "<div class='total-div'>",
        "<h3>成績統計：</h3>",
        "<ul class='total-ul' style='float: right'>",
            "<li>總修習學分："+course.total_all_credits+"</li>",
            "<li>總修課堂數："+course.total_all_number_courses+"</li>",
            "<li>通過總學分數（不含軍訓）："+course.total_passed_credits+"</li>",
            "<li>通過總課堂數（不含軍訓）："+course.total_passed_number_courses+"</li>",
            "<li>通過選修學分數："+course.total_passed_elective_course+"</li>",
            "<li>通過必修學分數："+course.total_passed_requirement_course+"</li>",
            "<li>通過軍訓學分數："+course.total_passed_military_training+"</li>",
            "<li>通過自然通識學分數："+course.total_passed_science_common+"</li>",
            "<li>通過人文通識學分數："+course.total_passed_humanity_common+"</li>",
            "<li>通過社會通識學分數："+course.total_passed_society_common+"</li>",
            "<li>通過跨領域通識學分數："+course.total_passed_cross_common+"</li>",
            "<li>通過體育通識堂數："+course.total_passed_pe_course_num+"</li>",
            "<li>棄修課堂數："+course.total_dropped_number_courses+"</li>",
        "</ul>",
        "<p>此功能由 <a href='http://socialstudy.tw/'>Social Study</a> Chrome Extension 提供</p>",
        "</div>"
    ].join('')

    return t
}

tables = $('table');

$table3 = $(tables[3]);
$table2 = $(tables[2]);


$data = $table3.find('tr').not(':first');
$exemption_data = $table2.find('tr').not(':first');

var parseInfoRow =// _.memoize
(   function($row)
    {
        var __text = function(td){ return $(td).text().replace(/\s/g,"") }
        var parseSlots = 
        [   
            { 'semester'   : __text }
            ,{ 'semeseter_number'   : __text }
            ,{ 'course_number'    : __text }
            ,{ 'course_name'     : __text }
            ,{ 'course_category'   : __text }
            ,{ 'credits'      : __text }
            ,{ 'score'        : __text }
            ,{ 'note'   : __text }
        ]

        var tds = $row.find('td')
        return _.reduce
        (   tds
        ,   function(result, td, idx)
            {
                var key = _.keys(parseSlots[idx])[0]
                var fn  = _.values(parseSlots[idx])[0]
                result[key] = fn(td)
                return result
            }
        ,   {}
        )
    }
)

score_json = []
exemption_score_json = []

_.each($data, function(row){
    $row = $(row);
    score_json.push(parseInfoRow($row));

});

_.each($exemption_data, function(row) {
    $row = $(row);
    each_row_json = parseInfoRow($row);
    if (each_row_json.semester.indexOf("無資料") === 0) {
        return ;
    };
    each_row_json.score = "60.00";
    name = each_row_json.course_name;
    if ( name.indexOf("自然") == 0 ) {
        each_row_json.note = "自然";
    } else if ( name.indexOf("社會") === 0 ) {
        each_row_json.note = "社會";
    } else if ( name.indexOf("人文") === 0 ) {
        each_row_json.note = "人文";
    } else {
        each_row_json.note = "";
    }
    exemption_score_json.push(each_row_json);
});

console.log(exemption_score_json);


total_data = {
    'total_all_credits': 0.0,
    'total_passed_credits': 0.0,
    'total_passed_number_courses': 0,
    'total_all_number_courses': 0,
    'total_passed_society_common': 0.0,
    'total_passed_science_common': 0.0,
    'total_passed_humanity_common': 0.0,
    'total_passed_cross_common': 0.0,
    'total_passed_requirement_course': 0.0,
    'total_passed_elective_course': 0.0,
    'total_passed_pe_course_num': 0,
    'total_passed_military_training': 0.0,
    'total_dropped_number_courses': 0
}

var calculate = function (data) {
    _.map(data, function(item){
        var PASS_FLAG = false;
        if ( item.score.indexOf("棄修") === 0 ) {
            total_data['total_dropped_number_courses'] += 1;
            return;
        } else if ( item.score.indexOf("通過") === 0 ) {
             PASS_FLAG = true;
        }
        item.score = parseFloat(item.score)
        item.credits = parseFloat(item.credits)


        total_data['total_all_credits'] += item.credits;
        total_data['total_all_number_courses'] += 1;

        if (item.course_name.indexOf("軍訓") > 0 ) {
            total_data['total_passed_military_training'] += item.credits;
            return;
        }


        if ( item.score >= 60 || PASS_FLAG ) {
            total_data['total_passed_credits'] += item.credits;
            total_data['total_passed_number_courses'] += 1;
            if (item.course_name.indexOf("體育") === 0 || item.course_name.indexOf("運動代表") === 0) {
                total_data['total_passed_pe_course_num'] += 1;
            }

            if (item.note.indexOf("自然") === 0) {
                total_data['total_passed_science_common'] += item.credits;
            } else if (item.note.indexOf("社會") === 0) {
                total_data['total_passed_society_common'] += item.credits;
            } else if (item.note.indexOf("人文") === 0) {
                total_data['total_passed_humanity_common'] += item.credits;
            } else if (item.note.indexOf("跨領域") === 0) {
                total_data['total_passed_cross_common'] += item.credits;
            } else if (item.course_category.indexOf("群") === 0) {
                total_data['total_passed_elective_course'] += item.credits;
            } else if (item.course_category.indexOf('必') === 0) {
                total_data['total_passed_requirement_course'] += item.credits;
            }
        }
    });
}

calculate(score_json);
calculate(exemption_score_json);

$(tmpl['total_cal'](total_data)).prependTo("body");

console.log("total data:");
console.log(total_data);

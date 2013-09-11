/*
 * This source is for placing likable and comment systen to news.
 */
function get_like_iframe(url) {
    quoted_url = encodeURIComponent(url);
    return '<iframe src="//www.facebook.com/plugins/like.php?href='+ quoted_url +'&amp;send=false&amp;layout=standard&amp;width=410&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=80&amp;appId=152510458201961" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:410px; height:80px;" allowTransparency="true"></iframe>'
}

function get_comment_box(url) {
    quoted_url = encodeURIComponent(url);

    //return '<div class="fb-comments" data-href="'+ quoted_url +'" data-num-posts="10" data-width="410"></div>'
    return '<iframe src="http://dl.dropbox.com/u/2587385/fbsdk/comment_box.html?url='+ quoted_url +'" width=410 height="500" scrolling="auto" frameborder="0" style="border:none; overflow:hidden; overflow-x: hidden; width: 410px;"></iframe>';
}

$("body").prepend($("<div></div>").attr("id","fb-root"));

$(".Footer").prepend($("<div></div>").attr("id", "nccu-news-like"));
$("#newsBack").parent().append($("<div></div>").attr("id", "nccu-news-comment"));


$("#nccu-news-like").html(get_like_iframe(window.location));
$("#nccu-news-comment").html(get_comment_box(window.location));


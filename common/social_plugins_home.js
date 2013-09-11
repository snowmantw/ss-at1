/*
 * This file describes the replacement on homepage.
 */

$banner_img = $('img[src$="nccubanner.gif"]')

$banner_img.attr('src', chrome.extension.getURL("img/nccubanner-chrome.png"));

if ( window.location.href === "http://www.nccu.edu.tw/" ) {
    $banner_img.wrap('<a></a>').parent('a').attr('href', 'https://www.facebook.com/dialog/feed?app_id=142892519093949&redirect_uri=http%3A%2F%2Fwww.nccu.edu.tw&link=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Flpihnfnmcibhakaadhjhdfppndhomkid&mode=popup');
    
}



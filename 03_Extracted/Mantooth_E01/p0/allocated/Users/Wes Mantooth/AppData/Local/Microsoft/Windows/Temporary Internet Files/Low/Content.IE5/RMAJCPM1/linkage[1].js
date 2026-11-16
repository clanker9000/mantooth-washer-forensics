/*
    Build del.icio.us and Digg.com links

    del.icio.us links -  http://del.icio.us/post?url=http://URL&title=Title+Using+Plus
    Digg.com links - http://digg.com/submit?phase=2&url=www.UniqueURL.com&title=StoryTitle&bodytext=StoryDescription&topic=YourSelectedTopic
*/

function update_links() {

    var a_url     = document.URL;
    var a_title   = document.getElementById("dc_title").content;
    var a_desc    = document.getElementById("dc_description").content;

    var bbs_topic_element = document.getElementById("topic");
    if (bbs_topic_element) {
        a_title = bbs_topic_element.innerHTML;
        a_desc = bbs_topic_element.innerHTML;
    }

    /* FIXME: Map sections to actual digg.com topics */
    var digg_topic = 'offbeat_news';

    var delicious_link = 'http://del.icio.us/post?url=' + encode_component(a_url) + '&title=' + encode_component(a_title);
    var digg_link      = 'http://digg.com/submit?phase=2&url=' + encode_component(a_url) + '&title=' + encode_component(a_title) +
                         '&bodytext=' + encode_component(a_desc) + '&topic=' + digg_topic;

    var delicious_element = document.getElementById('delicious');
    var digg_element      = document.getElementById('digg');

    delicious_element.href = delicious_link;
    digg_element.href      = digg_link;
}

function encode_component(component) {

    return encodeURI(encodeURIComponent(component));

}

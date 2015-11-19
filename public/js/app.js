/**
 * 
 * @param  {[type]} 
 * @param  {[type]} type:    'GET'            [description]
 * @param  {[type]} success: 
 * @param  {[type]} error:   
 * @return {[type]}          [description]
 */
//TODO - Fix rendering issues on page.
//TODO - Fix endpoint request and logic.
$( document ).ready(function() {
    $('#more').click(function(){
    	//get the next three posts
    	//append the posts to the exiting posts
    	$.ajax({
    		url: '/posts',
    		data: {format: 'json'},
    		type: 'GET',
    		success: function(data){
                var length = data.length,
                     i = 0,
                     $clear = $('<div>').css({'clear':'both','width':'0px', 'height' : '0px'});     
                for(;i<length;i++){
                    $('#group_3').append(createPost(data[i], i)); 
                    $('#group_3').append($clear); 
                }                      			
    		},
    		error: function(){
    			console.log('Error');
    			$('#group_3').html('<p>An error has occurred</p>');
    		}
    	});
    
        var createPost = function(post, i){
            i++;
            var col = 'colx'+ i;
            var news_box = 'news_text_box'+ i;
            var $parent_div = $('<div>').addClass(col),
                $small_box = $('<div>')
                                     .addClass('small_box')
                                     .attr('id', 'news_box')
                                     .css('background-image', 'url('+ post.image.secure_url +')'),
                $post_title = $('<div>').attr('id', 'post_title'),
                $title = $('<p>').addClass('title').text(post.title),
                $label = $('<div>').addClass('label label_news').html('IDEAS'),
                $news_text_box = $('<div>').addClass('news_text_box').attr('id', news_box),
                $news_content = $('<div>').addClass('news_content').html(post.content.brief);

                $post_title.append($label);
                $post_title.append($title);
                $small_box.append($post_title);
                $news_text_box.append($news_content);
                $parent_div.append($small_box);
                $parent_div.append($news_text_box);

                return $parent_div;
        }
    });    
});
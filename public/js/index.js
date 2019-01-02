$(function(){
    /*TODO: switch back to handlebars
                add wipe modal that removes comments and posts and resets the postid attr on modal close.
        */
        
       var currentModalPostId = "";

       function postComment(title, body, id) {

           $.post("/submit", {
               title: title,
               body: body,
               postId: id
           }, function (result) {
               addCommentToModal(result)
           });
       }

       function populateComments(id) {
           $.ajax({
               method: "GET",
               url: "/populated/" + id
           }).then(function (data) {
               //the exoected return data is a single element array containing the

               if (data[0].comments) {
                   var commentsArr = data[0].comments;
                   displayComments(id, commentsArr);
               }

           });
       }
       function displayComments(id, data) {
           if (data) {
               data.forEach(element => {
                   addCommentToModal(element);
               });

           }

       }
       //attachs a comment to the modal 
       function addCommentToModal(element) {
           var comment = $("<div>").text(element.title);
           var body = $("<div>").text(element.body).addClass("float-left");
           var removeButton = $("<button>").attr({
               "type": "button",
               "class": "close",
               "aria-label": "Close",
               "id": element._id
           });
           removeButton.addClass("remove-comment float-right");
           removeButton.text("X");
           var commentContainer = $("<div>").addClass(element._id + " comment-container clearfix border border-gray rounded");
           commentContainer.append(comment, body, removeButton, $("<br>"));
           $(".comment-group").append(commentContainer);
       }
       function emptyForm() {
           $("#comment-body-box").val("");
           $("#comment-title-box").val("");
       }
       //event listeners
       $(".submit-comment-button").on("click", function () {
           event.preventDefault();
           var text = $("#comment-body-box").val().trim();
           var title = $("#comment-title-box").val().trim();
           //console.log(comment);
           postComment(title, text, currentModalPostId);
           emptyForm();
       });

       //make a new scrape then display posts.
       $(".new-scrape").on("click", function () {
           event.preventDefault();
           $.ajax({
               method: "GET",
               url: "/scrape"
           }).then(function (data) {
               // For each one
               //console.log("data returned " + data);
               window.location.href = "/";
               

           });

       });
       //remove comment
       $(document).on("click", '.remove-comment', function (event) {
           console.log(event.target);
           var targetID = event.target.id;
           $.ajax({
               method: "DELETE",
               url: "/comments/" + targetID
           }).then(function (data) {
               $("." + event.target.id).remove();
           });
       });
       $(document).on("click", '.remove-post', function (event) {
        console.log(event.target);
        var targetID = event.target.id;
        $.ajax({
            method: "DELETE",
            url: "/posts/" + targetID
        }).then(function (data) {
            $("." + event.target.id).remove();
        });
    });

       //display the modal with the corresponding post and comment data
       $(document).on('click', '.modalTrigger', function (event) {
           event.preventDefault();
           $(".comment-group").empty();
           currentModalPostId = event.target.id;
           populateComments(currentModalPostId);

       });

       $('#exampleModal').on('hidden.bs.modal', function () {
           event.preventDefault();
           $(this).find(".form-control").empty();
           sanitizeModal(currentModalPostId);
           console.log("modal closed");

       });
       /*
       on modal close we
       *empty form
       *remove comments from modal
       *remove any id related classes from the static elements in the modal
       *set current modal id to ""
       */
       function sanitizeModal(modalPostId) {
           //$('.submit-comment-button').removeData();
           $(".comment-group").empty();
           emptyForm();
           //$(".modalTrigger").removeData();
           currentModalPostId = "";
       }
});
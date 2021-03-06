$(document).on('ready', function(){

  //Grabs data from data dashes and builds post url for (Bid Acception)
  $(document).on('click', '.accepting', function(){
    var jobID = $(this).data("job");
    var bidID = $(this).data("bid");
    var bidderID = $(this).data("bidder");
    $("#bidAcceptModal").removeClass("hide").addClass("show");
    $("#accept-form").attr("action", "/job/bid/accept/" + jobID + "/" + bidID + "/" + bidderID + "?_method=PUT");
  })

  //Grabs data from data dashes and builds post url for (Application Acception)
  $(document).on('click', '.app-accepting', function(){
    var jobID = $(this).data("job");
    var appID = $(this).data("app");
    var applicantID = $(this).data("applicant");
    $("#appAcceptModal").removeClass("hide").addClass("show");
    $("#app-accept-form").attr("action", "/job/app/accept/" + jobID + "/" + appID + "/" + applicantID + "?_method=PUT");
  })

  //Closes (Bid) accept modal with 2 separate buttons
  $(document).on('click', '.close-accept', function(){
    $("#bidAcceptModal").removeClass("show").addClass("hide");
    $("#accept-form").attr("action", "");
  })

  //Closes (Application) accept modal with 2 separate buttons
  $(document).on('click', '.close-app-accept', function(){
    $("#appAcceptModal").removeClass("show").addClass("hide");
    $("#app-accept-form").attr("action", "");
  })

  //Grabs data from data dashes and builds post url for (Bid Rejection)
  $(document).on('click', '.rejecting', function(){
    var jobID = $(this).data("job");
    var bidID = $(this).data("bid");
    $("#bidRejectModal").removeClass("hide").addClass("show");
    $("#reject-form").attr("action", "/job/bid/reject/" + bidID + "?_method=PUT");
  })

  //Closes (Bid) reject modal with 2 separate buttons
  $(document).on('click', '.close-reject', function(){
    $("#bidRejectModal").removeClass("show").addClass("hide");
    $("#reject-form").attr("action", "");
  })

  //Begin rating system
  //  Check Radio-box
  $(".rating input:radio").attr("checked", false);
  $('.rating input').click(function () {
      $(".rating span").removeClass('checked');
      $(this).parent().addClass('checked');
  });

  $('input:radio').change(
  function(){
      var userRating = this.value;
      $('#job_rated').val(userRating);
      // alert(userRating);
  }); 
  //End rating system

  //Grabs data from data dashes and builds post url for (Job Completion)
  $(document).on('click', '.completing', function(){
    var jobID = $(this).data("job");
    var employerID = $(this).data("employer");
    var employeeID = $(this).data("employee");
    $("#jobCompleteModal").removeClass("hide").addClass("show");
    $("#job-complete-form").attr("action", "/job/complete/" + jobID + "/" + employerID + "/" + employeeID + "?_method=PUT");
  })

  //Closes (Job Completion) modal with 2 separate buttons
  $(document).on('click', '.close-complete', function(){
    $("#jobCompleteModal").removeClass("show").addClass("hide");
    $("#job-complete-form").attr("action", "");
  })

  //Grabs data from data dashes and builds post url for (Job Completion No Review)
  $(document).on('click', '.completing-no-review', function(){
    var jobID = $(this).data("job");
    $("#jobCompleteNoReviewModal").removeClass("hide").addClass("show");
    $("#job-complete-no-form").attr("action", "/job/complete/noReview/" + jobID + "?_method=PUT");
  })

  //Closes (Job Completion No Review) modal with 2 separate buttons
  $(document).on('click', '.close-no-complete', function(){
    $("#jobCompleteNoReviewModal").removeClass("show").addClass("hide");
    $("#job-complete-no-form").attr("action", "");
  })

});
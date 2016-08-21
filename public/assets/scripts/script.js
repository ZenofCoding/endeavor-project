// document.getElementById("closeSuccess1").onclick = function() {closeAcctModal()};

// function closeAcctModal() {
//   document.getElementById("successModal").className = "modal hide";
// }
$(document).on('ready', function(){

  $(document).on('click', '.accepting', function(){
    var jobID = $(this).data("job");
    var bidID = $(this).data("bid");
    var bidderID = $(this).data("bidder");
    $("#bidAcceptModal").removeClass("hide").addClass("show");
    $("#accept-form").attr("action", "/job/bid/accept/" + jobID + "/" + bidID + "/" + bidderID + "?_method=PUT");
  })

  $(document).on('click', '.close-accept', function(){
    $("#bidAcceptModal").removeClass("show").addClass("hide");
    $("#accept-form").attr("action", "");
  })

  $(document).on('click', '.rejecting', function(){
    var jobID = $(this).data("job");
    var bidID = $(this).data("bid");
    $("#bidRejectModal").removeClass("hide").addClass("show");
    $("#reject-form").attr("action", "/job/bid/reject/" + jobID + "/" + bidID + "?_method=PUT");
  })

  $(document).on('click', '.close-reject', function(){
    $("#bidRejectModal").removeClass("show").addClass("hide");
    $("#reject-form").attr("action", "");
  })

});
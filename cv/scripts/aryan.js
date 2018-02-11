$(document).ready(function(){
    var birthday = new Date("22 Dec 1997");
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    var result =  Math.abs(ageDate.getUTCFullYear() - 1970);
    $("#year-of-birth").text(result);
});
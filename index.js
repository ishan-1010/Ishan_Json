/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stDBName = "SCHOOL-DB";
var stRelationName = "STUDENT-TABLE";
var connToken = "90933093|-31949318081998484|90951633";

$("#rollno").focus();

function saveRecNo2LS(jsonObj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getRollNoAsJsonObj(){
    var rollno = $("#rollno").val();
    var jsonStr={
        id:rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#stname").val(record.name);
    $("#stclass").val(record.class);
    $("#birth").val(record.birth);
    $("#addr").val(record.addr);
    $("#enroll").val(record.enroll);
}

function resetForm(){
    $("rollno").val("");
    $("#stname").val("");
    $("#stclass").val("");
    $("#birth").val("");
    $("#addr").val("");
    $("#enroll").val("");
    
    $("#rollno").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollno").focus();   
}



function validateData() {
    var rollno, stname, stclass, birth, addr, enroll;
    rollno = $("#rollno").val();
    stname = $("#stname").val();
    stclass = $("#stclass").val();
    birth = $("#birth").val();
    addr = $("#addr").val();
    enroll = $("#enroll").val();
    
    
    if (rollno === "") {
        alert("Roll No Required Value");
        $("#rollno").focus();
        return "";
    }
    if (stname === "") {
        alert("Student Full Name Required Value");
        $("#stname").focus();
        return "";
    }
    if (stclass === "") {
        alert("Student Class Required Value");
        $("#stclass").focus();
        return "";
    }
    if (birth === "") {
        alert("Birth Date Required Value");
        $("#birth").focus();
        return "";
    }
    if (addr === "") {
        alert("Address Required Value");
        $("#addr").focus();
        return "";
    }
    if (enroll === "") {
        alert("Enrollment Date Required Value");
        $("#enroll").focus();
        return "";
    }
    
    
    var jsonStrObj = {
        id: rollno,
        name: stname,
        class: stclass,
        birth: birth,
        addr: addr,
        enroll: enroll
    };
    return JSON.stringify(jsonStrObj);
}


function getSt(){
    var RollNoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stDBName, stRelationName, RollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status===400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#rollno").focus();
    }
    else if(resJsonObj.status===200){
        $("rollno").prop("disabled", true);
        fillData(resJsonObj);
        
        $("#update").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#rollno").focus();
    }
}

function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj===""){
        return "";
    }
    
    var putRequest = createPUTRequest(connToken, jsonStrObj, stDBName, stRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $("#rollno").focus();
}

function updateData(){
    $("#update").prop("disabled", true);
    jsonUpd=validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonUpd, stDBName, stRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $("#rollno").focus();
}


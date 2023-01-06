"use strict";

document.addEventListener('DOMContentLoaded', init);

function init()
{
    let users = data["users"];
    let sqlStats = "";
    let counterUser = 1;
    let counterStatus = 1;

    let counterUserId = 0;
    let counterStatusId = 0;
    let counterLevelsId = 0;
    let counterVitalsId = 0;
    let counterThoughtsId = 0;
    let counterSuggestionsId = 0;
    let counterSettingsId = 0;
    let counterFamilyMembersId = 0;


    
    

    const sqlStatUsersStatic = "INSERT INTO users VALUES";
    const sqlStatStatusesStatic = "INSERT INTO statuses VALUES";
    const sqlStatLevelsStatic = "INSERT INTO levels VALUES";
    const sqlStatVitalsStatic = "INSERT INTO vitals VALUES";
    const sqlStatThoughtsStatic = "INSERT INTO thoughts VALUES";
    const sqlStatSuggestionsStatic = "INSERT INTO suggestions VALUES";
    const sqlStatSettingsStatic = "INSERT INTO settings VALUES";
    const sqlStatFamilyMembersStatic = "INSERT INTO familyMembers VALUES";


    users.forEach(user => 
    {
        sqlStats += "<br><br>-- User" +  counterUser + "<br><br>";
        const userId = counterUserId;
        const userName = "'" + user["name"] + "'";
        /* Statuses */
        user["status"].forEach(status => 
        {
            sqlStats += "<br>-- Status" +  counterStatus + "<br><br>";
            const userStatusId = counterStatusId;
            const userStatusTimestamp = status["timestamp"];

            /* LEVEL*/
            const userStatusLevel_Id = counterLevelsId;
            const userStatusLevel_Happy = status["level"]["happy"];
            const userStatusLevel_Tired = status["level"]["tired"];
            const userStatusLevel_Stresed = status["level"]["stressed"];
            const userStatusLevel_Angry = status["level"]["angry"];
            const userStatusLevel_Frustrated = status["level"]["frustrated"];
            const userStatusLevel_Scared = status["level"]["scared"];
            const userStatusLevel_Surprised = status["level"]["surprised"];
            const userStatusLevel_Relieved = status["level"]["relieved"];
            counterLevelsId++;

            const sqlStatLevelsValues = sqlStatLevelsStatic + getSqlValue9(userStatusLevel_Id, userStatusLevel_Happy, userStatusLevel_Tired, userStatusLevel_Stresed, userStatusLevel_Angry, userStatusLevel_Frustrated, userStatusLevel_Scared, userStatusLevel_Surprised, userStatusLevel_Relieved);// + "(0, 50, 50, 50, 50, 50, 50, 50, 50);"
            sqlStats += sqlStatLevelsValues + "<br>";
            
            /* VITAL */
            const userStatusVital_Id = counterVitalsId;
            const userStatusVital_Organ = "'" + status["vital"]["organ_status"] + "'";
            const userStatusVital_Blood = "'" + status["vital"]["blood_pressure"] + "'";
            const userStatusVital_Temperature = status["vital"]["temperature"];
            counterVitalsId++;

            const sqlStatVitalsValues = sqlStatVitalsStatic + getSqlValue4(userStatusVital_Id, userStatusVital_Organ, userStatusVital_Blood, userStatusVital_Temperature);
            sqlStats += sqlStatVitalsValues + "<br>";

            /* Thought */
            const userStatusThought_Id = counterThoughtsId;
            const userStatusThought_Text = "'" + status["thought"]["text"] + "'";
            const userStatusThought_Img = "'" + status["thought"]["img"] + "'";
            counterThoughtsId++;

            const sqlStatThoughtsValues = sqlStatThoughtsStatic + getSqlValue3(userStatusThought_Id, userStatusThought_Text, userStatusThought_Img);
            sqlStats += sqlStatThoughtsValues + "<br>";

            /* Suggestion */
            status["suggestion"].forEach(suggestion => 
            {
                const userStatusSuggestion_Id =  counterSuggestionsId;
                const userStatusSuggestion_Category = "'" + suggestion["category"] + "'";
                const userStatusSuggestion_SubCategory = "'" + suggestion["subCategory"]+ "'";
                const userStatusSuggestion_Title = "'" + suggestion["title"]+ "'";
                const userStatusSuggestion_Description = "'" + suggestion["description"]+ "'";
                const userStatusSuggestion_Term = "'" + suggestion["term"] + "'";
                counterSuggestionsId++;
                
                const sqlStatSuggestionsValues = sqlStatSuggestionsStatic + getSqlValue7(userStatusSuggestion_Id, userStatusSuggestion_Category, userStatusSuggestion_SubCategory, userStatusSuggestion_Title, userStatusSuggestion_Description, userStatusSuggestion_Term, userStatusId);
                sqlStats += sqlStatSuggestionsValues + "<br>";
            });
            
    
            const sqlStatStatusesValues = sqlStatStatusesStatic + getSqlValue6(userStatusId, userStatusTimestamp, userStatusLevel_Id, userStatusVital_Id, userStatusThought_Id, userId);
            sqlStats += sqlStatStatusesValues + "<br>";
            counterStatus++;
            counterStatusId++;
        });
        /* Settings */
        const userSettingsId = counterSettingsId;
        const userSettings_Do_Not_Disturb = user["settings"]["do_Not_Disturb"];
        const userSettings_Food_And_Drinks = user["settings"]["food_And_Drinks"];
        const userSettings_Health = user["settings"]["food_And_Drinks"];
        const userSettings_Energy = user["settings"]["energy"];
        const userSettings_Others = user["settings"]["others"];
        counterSettingsId++;

        sqlStats += "<br>--Others " + "<br><br>";

        const sqlStatSettingsValues = sqlStatSettingsStatic + getSqlValue6(userSettingsId, userSettings_Do_Not_Disturb, userSettings_Food_And_Drinks, userSettings_Health, userSettings_Energy, userSettings_Others);
        sqlStats += sqlStatSettingsValues + "<br>";

        /* Familymembers */
        user["familyMembers"].forEach(familyMember => 
        {
            const userFamilyMembers_Id = counterFamilyMembersId;
            const userFamilyMembers_Name = "'" + familyMember["name"] + "'";
            const userFamilyMembers_ToggleDataGathering = familyMember["toggleDataGathering"];
            const userFamilyMembers_UserId = counterUserId;
            counterFamilyMembersId++;

            const sqlStatFamilyMembersValues = sqlStatFamilyMembersStatic + getSqlValue4(userFamilyMembers_Id, userFamilyMembers_Name, userFamilyMembers_ToggleDataGathering, userFamilyMembers_UserId);
            sqlStats += sqlStatFamilyMembersValues + "<br>";
        });
        // Add user sql
        const sqlStatUsersValues = sqlStatUsersStatic + getSqlValue3(userId, userName, userSettingsId);
        sqlStats += sqlStatUsersValues + "<br>";

        
    
        counterStatus = 1;
        counterUser++;
        counterUserId++;
    });
    showData(sqlStats);
}

function showDataUsers(users)
{
    document.querySelector('#data').textContent += JSON.stringify(users, undefined, 2);
}
function showData(dataa)
{
    document.querySelector('#data').innerHTML = dataa;
}

function getSqlValue3(a, b, c)
{
    return "("  + a + ", " + b + ", " + c +");";
}
function getSqlValue4(a, b, c, d)
{
    return "("  + a + ", " + b + ", " + c + ", " + d + ");";
}
function getSqlValue5(a, b, c, d, e)
{
    return "("  + a + ", " + b + ", " + c + ", " + d + ", " + e +");";
}
function getSqlValue6(a, b, c, d, e, f)
{
    return "("  + a + ", " + b + ", " + c + ", " + d + ", " + e + ", " + f + ");";
}
function getSqlValue7(a, b, c, d, e, f, g)
{
    return "("  + a + ", " + b + ", " + c + ", " + d + ", " + e + ", " + f + ", " + g + ");";
}
function getSqlValue8(a, b, c, d, e, f, g, h)
{
    return "("  + a + ", " + b + ", " + c + ", " + d + ", " + e + ", " + f + ", " + g + ", " + h + ");";
}
function getSqlValue9(a, b, c, d, e, f, g, h, i)
{
    return "("  + a + ", " + b + ", " + c + ", " + d + ", " + e + ", " + f + ", " + g + ", " + h + ", " + i + ");";
}
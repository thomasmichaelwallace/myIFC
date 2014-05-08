// "What IFC Class Am I?" survey (myIFC)
// Copyright (C) 2014 Thomas Michael Wallace <http://www.thomasmichaelwallace.co.uk>

// myIFC is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// The myIFC is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with The myIFC. If not, see <http://www.gnu.org/licenses/>.

// Setup:
// myIFC depends on a no-conflict jquery running.
// To make it work, stick it on a html page with a <div> of id: survey, and jQuery script loaded before.

jQuery(document).ready(function($) {

    var ifcSurvey;
    // Read in the IFC survey on load.
    $.getJSON("/games/myIFC/json/ifc.json", function (json) {
        ifcSurvey = json;
        drawQuestion(json);
    });

    function drawQuestion(query) {
        // Draws the survey page with event handlers into the survey div.

        if (query.question !== undefined) {
            // JSON question tree terminates in IFC objects without the key "question".

            $("#survey_question").text(query.question);
            $("#survey_answers").empty();

            var index = 0;
            $.each( query.answers, function( key, value ) {

                $("#survey_answers").append( '<li><a id="key_' + index + '" href="#/">' + key + '</a></li>' );
                $("#key_" + index).click(function() {
                    drawQuestion(value);
                });

                index += 1;

            });

        } else {
            // Survey has terminated, show the results and allow to share!

            $("#survey_page").hide();
            $("#survey_result").show();

            $("#survey_ifc").text(query.ifc);
            $("#survey_description").text(query.description);

            var twitlink = "http://twitter.com/home?status=I'm%20an%20" + query.ifc + "IfcResourcesResourceConstraint!%20Find%20out%20your%20%23IFC%20on%20%40beingbrunel%20http://www.beingbrunel.com/ifc/"
            $("#survey_share").prop("href", twitlink);

        }

    }

});

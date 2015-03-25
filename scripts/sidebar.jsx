// Fake data
var newsFeedPlaceholder = [
    {
        type: "comment",
        title: null,
        url: null,
        score: null,
        by: "erbdex",
        timestamp: "1427125337000",
        text: "You win the internet sir. Bravo.",
        commenton: "Cake made of pure awesomeness",
        parent_poster: "You",
        no_of_comments: 43
    },
    {
        type: "news",
        title: "Images that fool computer vision raise security concerns",
        url: "cornell.edu",
        score: null,
        by: "lm60",
        timestamp: "1427124617000",
        text: "Computers are learning to recognize objects with near-human ability. But Cornell researchers have found that computers, like humans, can be fooled by optical illusions, which raises security concerns and opens new avenues for research in computer vision.\nCornell graduate student Jason Yosinski and colleagues at the University of Wyoming Evolving Artificial Intelligence Laboratory have created images that look to humans like white noise or random geometric patterns but which computers identify with great confidence as common objects. They will report their work at the IEEE Computer Vision and Pattern Recognition conference in Boston June 7-12.",
        commenton: null,
        parent_poster: null,
        no_of_comments: 54
    },
    {
        type: "comment",
        title: null,
        url: null,
        score: null,
        by: "lm60",
        timestamp: "1427123297000",
        text: "While I largely agree with you, it strikes me that you've missed an option -- It might be that there's something inefficient in the trial process that holds no weight on \"fairness\". I'm not a legal expert by any means, so it may not be the case, but it seems as though it's a possibility.",
        commenton: "Amtrak police use of passenger data",
        parent_poster: "CapitalistCartr",
        no_of_comments: 91
    },
    {
        type: "comment",
        title: null,
        url: null,
        score: null,
        by: "lm60",
        timestamp: "1427122517000",
        text: "This always frustrates me when discussions of plea bargaining and the right to trial come up, and the argument is given that plea bargaining is a necessity because the courts would be horribly overloaded if every case went to trial. If the system doesn't have the resources to give every accused criminal a fair trial, then either you're making too many criminals, the system doesn't have enough resources, or both. Bypassing trials is just a way to cover your ears and shout \"la la la\" to ignore the problem.",
        commenton: "Amtrak police use of passenger data",
        parent_poster: "msandford",
        no_of_comments: 91
    },
    {
        type: "news",
        title: "Early posts from Larry Page, Linus Torvalds, Jan Koum, and more",
        url: "carlcheo.com",
        score: null,
        by: "carlcheo",
        timestamp: "1427121797000",
        text: "Here’s a list of early posts from tech founders who used to ask questions, self-promote, and interact on forums and discussion groups. Just like us. Fascinating? Yes. I see passion too.\n#1. Google (1996) – When developing Google, Larry Page posted a Java question about setting User-Agent header for his web crawler. Even the smartest people have questions too. Let me Google the answer for you, Larry.",
        commenton: null,
        parent_poster: null,
        no_of_comments: 145
    },
    {
        type: "comment",
        title: null,
        url: null,
        score: null,
        by: "lm60",
        timestamp: "1427121497000",
        text: "If everyone is breaking so many laws that the police and courts can't keep up it doesn't mean that humanity is broken. It means that the law has gotten so far out of sync with humanity that the law is broken. People make the laws, not the other way around. The world would be a much better place if more people realized this.",
        commenton: "Amtrak police use of passenger data",
        parent_poster: "msandford",
        no_of_comments: 91
    },
    {
        type: "news",
        title: "How to save datetimes for future events",
        url: "creativedeletion.com",
        score: null,
        by: "laut",
        timestamp: "1427120717000",
        text: "Imagine that it’s January 2015 and you’re making an appointment in a calendar application for a meeting that will take place in Santiago, Chile on the April 30th at 10:00 in the morning.\nYour calendar software saves the appointment and you can see that it’s there with the description that you made. 2015-04-30 10:00 in Chile. You even checked the box to get a reminder and think to yourself: “What a time to be alive”. Software can remind us of meetings and keep track of timezones and we no longer have to carry around big bulky paper calendars.",
        commenton: null,
        parent_poster: null,
        no_of_comments: 23
    },
    {
        type: "news",
        title: "Canada's CSE cyberwarfare toolbox revealed",
        url: "cbc.ca",
        score: null,
        by: "colinprince",
        timestamp: "1427119937000",
        text: "Online gambling, to a cash-hungry province, must look like a ripe piece of fruit just waiting to be plucked.\nThe logic is easy to see. Gambling on the internet is already happening, so why shouldn't a province get a piece of the action rather than watch the money go elsewhere? What's more, government oversight can keep players safe from shady offshore operators, and protect problem gamblers from themselves by promoting responsible gaming practices.\nOntario used those arguments before jumping into internet gambling in January. Quebec, B.C., and Manitoba are equally well versed in the rationale and Atlantic Canada's gambling overseer is using it right now in a bid to expand the menu of online gaming options available on the East Coast.",
        commenton: null,
        parent_poster: null,
        no_of_comments: 86
    },
]

//==========================================================
// Sidebar container and slider functionality

// Attaches an empty div to the DOM to which we can attach our React code
$(document).ready(function () {
    $("body").append("<div id='sidebar-anchor'></div>");
    React.render(<SidebarBox data={newsFeedPlaceholder} />, $("#sidebar-anchor").get(0));
});

// Sidebar component
var SidebarBox = React.createClass({

    displayName: 'SidebarBox',

    // Set the initial state to cause the div to slide in.
    // Actual animation functionality is set in styles/main.css.
    // --> ISSUE: We should look for an event to trigger the sidebar, rather than setTimeout -- document.onload perhaps
    componentDidMount: function () {
        setTimeout(function () {
            $(".sidebarbox").css({
                right: 0
            });
            $("#sidebarcontentarea")
        }, 500)

    },

    // HTML content to be rendered

    render: function () {
        return <div className="sidebarbox">
            <div className="sidebarbutton">
                <CloseButton />
            </div>
            <div id="sidebarcontentarea"  className="container-fluid">
                <div id="nav-area">
                    <div className="row">
                        <OwnerInfo />
                    </div>
                    <div id="horiz-rule"></div>
                    <NavBar />
                </div>
                <ContentList data={this.props.data} />
            </div>
        </div>;
    }

});

var drawerIsClosed = false;

// Close button component
// --> ISSUE: All these jQuery queries should be stored as variables, so we only need to access them once.
var CloseButton = React.createClass({

    // Functionality: Button causes sidebar to slide closed if it is open, open if it is closed.
    closeBox: function () {
        if (!drawerIsClosed) {
            drawerIsClosed = true;
            setTimeout(function () {
                $(".sidebarbox").css({
                    "right": "-470"
                });
                // Icon changes depending if sidebar is open or closed; shadow goes away if closed
                $("#sidebutton").attr("src", "https://s3.amazonaws.com/gdcreative-general/HNselectlogotab.png");
                $("#sidebarcontentarea").css("box-shadow", "none");
            }, 0);
        }


        else {
            setTimeout(function () {
                drawerIsClosed = false;
                $(".sidebarbox").css({
                    right: 0
                });
                // Icon changes depending if sidebar is open or closed; shadow goes away if closed
                $("#sidebutton").attr("src", "https://s3.amazonaws.com/gdcreative-general/HNselectXtab.png");
                $("#sidebarcontentarea").css("box-shadow", "-2px 0px 3px #C0C0C0");
            }, 0);
        }
    },

    // Renders the actual button
    render: function () {
        return <img src="https://s3.amazonaws.com/gdcreative-general/HNselectXtab.png" id="sidebutton" width="30px" onClick={this.closeBox} />;
    }
})

//End basic Sidebar functionality
//==========================================================

//Sidebar content
//components needed:

// Owner (ownerinfo)
// - username
// - karma
// - # of people following you
// - # of people you follow


var OwnerInfo = React.createClass({
    render: function () {
        return (
            <div>
                <div id="owner-box" className="col-md-6 col-sm-6 col-xs-6">
                    <div id="owner-name">
                        <h2 className="nav-title">glennonymous</h2>
                    </div>
                </div>
                <div id="owner-stats" className="col-md-6 col-sm-6 col-xs-6">
                    <div className="col-md-4 col-sm-4 col-xs-4 owner-stat">
                        <div className="owner-stattitle">karma</div>
                        <div className="owner-statscore">1</div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4 owner-stat">
                        <div className="owner-stattitle">following</div>
                        <div className="owner-statscore">15</div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4 owner-stat">
                        <div className="owner-stattitle">followers</div>
                        <div className="owner-statscore">1</div>
                    </div>
                </div>
            </div>
        )
    }
});

// Suggestions (suggestionarea)

var SuggestionArea = React.createClass({
    render: function () {
        return <div id="suggest-box" className="col-md-6 col-sm-6 col-xs-6">
            <div id="suggest-title">
            {/*<h2 className="nav-title">Who to follow</h2>*/}
            </div>
            <div id="suggest-tags">
            {/*<ul>
             <li>joefred</li>
             &nbsp;
             <li>fredbob</li>
             &nbsp;
             <li>aprilmay</li>
             &nbsp;
             <li>june1972</li>
             &nbsp;
             <li>aLincoln</li>
             &nbsp;
             <li>aynRandy</li>
             &nbsp;
             </ul>*/}
            </div>
            <SearchForm />
        </div>;
    }
});

// Search form
// - input
// - submit

var SearchForm = React.createClass({
    render: function () {
        return <div id="search-box">
        {/*<div className="input-group">
         <input type="text" className="form-control" placeholder="Search" />
         <span className="input-group-btn">
         <button className="btn btn-default" type="button">Submit</button>
         </span>
         </div>*/}
        </div>;
    }
});

// Navbar
// - Feed
// - Updates
// - Connections
// - Favorites
// - Settings

// Make tabs fixed-width divs with inactive tab background.
// Make Newsfeed tab active when sidebar loads.

var NavBar = React.createClass({
    render: function () {
        return <div id="navbar-bar">
            <div id="navbar-buttons" class="row">
                <ul>
                    <li>
                        <div className="col-md-3 col-sm-3 col-xs-3 navbar-button" id="newsfeed" active="true">newsfeed</div>
                    </li>
                    <li>
                        <div className="col-md-3 col-sm-3 col-xs-3 navbar-button" id="notifications">notifications</div>
                    </li>
                    <li>
                        <div className="col-md-3 col-sm-3 col-xs-3 navbar-button" id="connections">connections</div>
                    </li>
                    <li>
                        <div className="col-md-1 col-sm-1 col-xs-1 navbar-button" />
                    </li>
                    <li>
                        <div className="col-md-1 col-sm-1 col-xs-1 navbar-button navbar-button-right" id="favorites">
                            <img src="https://s3.amazonaws.com/gdcreative-general/star_64_gray.png" width="13px" />
                        </div>
                    </li>
                    <li>
                        <div className="col-md-1 col-sm-1 col-xs-1 navbar-button navbar-button-right" id="settings">
                            <img src="https://s3.amazonaws.com/gdcreative-general/gear_64_gray.png" width="13px" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>;
    }
});


// Item (contentarea)
// - type
// - title
// - url
// - favorite_button
// - score
// - by
// - text

var timeToNow = function (timestamp) {
    var now = Date()
    console.log(now)
    var since = now - timestamp
    if (since < 3600000) return Math.floor(since / 60000) + " minutes ago";
    else return Math.floor(since / 360000) + "hours ago";
}

var ContentList = React.createClass({
    render: function () {
        // Determine whether data object is a comment or a news article and render accordingly
        var newsOrComment = this.props.data.map(function (obj) {
            if (obj.type == "news") {
                return (<div className="content-box">
                    <div className="content-title">
                        <h3 className="content-maintitle">{obj.title}</h3>
                        <h4 className="content-secondarytitle"> ({obj.url})</h4>
                    </div>
                    <div className="content-content">
                        <p className="content-text">{obj.text}</p>
                    </div>
                    <div className="content-footer">
                        <p className="content-footertext">by {obj.by} {timeToNow(obj.timestamp)} | {obj.no_of_comments} comments</p>
                    </div>
                </div>);
            }
            else {
                return (<div className="content-box">
                    <div className="content-title">
                        <h4 className="content-secondarytitle">Comment on </h4>
                        <h3 className="content-maintitle">{obj.commenton}</h3>
                        <h4 className="content-secondarytitle"> by {obj.by}</h4>
                    </div>
                    <div className="content-content">
                        <p className="content-text">{obj.text}</p>
                    </div>
                    <div className="content-footer">
                        <p className="content-footertext">original post by {obj.parent_poster} {timeToNow(obj.timestamp)} | {obj.no_of_comments} comments</p>
                    </div>
                </div>);
            }
        })

        return (<div className="content-top">
        {newsOrComment}
        </div>);
    }
});

//var ContentItem = React.createClass({
//    render: function () {
//        return
//        return <div className="content-box">
//            <div className="content-title">
//                <h3 className="content-maintitle">{obj.title}</h3>
//                <h4 className="content-secondarytitle">({obj.url})</h4>
//            </div>
//            <div className="content-content">
//                <p className="content-text">{obj.text}</p>
//            </div>
//            <div className="content-footer">
//                <p className="content-footertext">by {obj.by} {timeToNow(obj.timestamp)} | {obj.no_of_comments} comments</p>
//            </div>
//        </div>;
//    }
//});



import { useState } from "react";
import "./centerPanel.css";
import moment from "moment";
import "moment-timezone";
import comment from "../imgs/comment.svg";
import heart from "../imgs/heart.svg";
import retweet from "../imgs/retweet.svg";
import share from "../imgs/share.svg";
import verified from "../imgs/verified.svg";

import Link from "./link.js";

export default function Tweet(props) {
  const tweetTimeLocal = new Date(props.tweetTime);

  const getTimeSince = (tweetTime) => {
    // get usertimezone based on timezone of terminal
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    //  using moment-tz seperate import from moment to convert tweet time to user timzone
    const tweetInUserTZ = moment(tweetTime).tz(userTimeZone);
    // using fromNow method on tweetInUserTZ._d destructoring to display time from tweet locally.
    // tested by changing timezone on my terminal
    const timeSince = moment(tweetInUserTZ._d).fromNow();

    return timeSince;
  };

  return (
    <div className="newTweet" key="testTweet1">
      <div className="tweetDP">
        <img className="DP" src={props.tweetDP} />
      </div>

      <div className="tweetHeader">
        <h3>{props.username}</h3>
        <img
          src={verified}
          style={
            props.verifiedBool === 0
              ? { display: "block" }
              : { display: "none" }
          }
        />
        <h4>@{props.authorHandle}</h4>
        <p className="grey">&middot;</p>
        <div className="tweetTime" title={tweetTimeLocal}>
          {getTimeSince(tweetTimeLocal)}
        </div>
      </div>

      <div className="tweetContent">{props.content}</div>

      <div className="tweetLinks">
        <Link
          value={props.comment}
          linkType={"comments"}
          tweetId={props.id}
          handle={props.handle}
          setLoggingIn={props.setLoggingIn}
          guest={props.guest}
          userInteraction={props.userCommentsInteraction}
        />
        <Link
          value={props.retweet}
          linkType={"retweet"}
          tweetId={props.id}
          handle={props.handle}
          setLoggingIn={props.setLoggingIn}
          guest={props.guest}
          userInteraction={props.userRetweetInteraction}
        />
        <Link
          value={props.heart}
          linkType={"likes"}
          tweetId={props.id}
          handle={props.handle}
          setLoggingIn={props.setLoggingIn}
          guest={props.guest}
          userInteraction={props.userLikeInteraction}
        />
        <Link
          value={props.share}
          linkType={"share"}
          tweetId={props.id}
          handle={props.handle}
          setLoggingIn={props.setLoggingIn}
          guest={props.guest}
        />
      </div>
    </div>
  );
}

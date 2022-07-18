import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { defaultImgs } from "../defaultimgs";
import TweetInFeed from "../components/TweetInFeed";
import { useMoralis } from "react-moralis";

const Profile = () => {
    const { Moralis } = useMoralis();
    const user = Moralis.User.current();

    return (
        <>
            <div className="pageIdentify">Profile</div>
            <img
                className="profileBanner"
                src={user.attributes.twitter_banner ?? defaultImgs[1]}
                alt="banner"
            />
            <div className="pfpContainer">
                <img
                    className="profilePFP"
                    src={user.attributes.twitter_pfp ?? defaultImgs[0]}
                    alt="pfp"
                />
                <div className="profileName">
                    {user.attributes.twitter_username ?? "Juhizzz"}
                </div>
                <div className="profileWallet">{`${user.attributes.ethAddress.slice(
                    0,
                    4
                )}...${user.attributes.ethAddress.slice(38)}`}</div>
                <Link to="/settings">
                    <div className="profileEdit">Edit Profile</div>
                </Link>
                <div className="profileBio">
                    {user.attributes.twitter_bio ??
                        "Software engineer interested in Web3."}
                </div>
                <div className="profileTabs">
                    <div className="profileTab">Your Tweets</div>
                </div>
            </div>
            <TweetInFeed profile={true} />
        </>
    );
};

export default Profile;

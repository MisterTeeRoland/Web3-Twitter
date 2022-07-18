import React, { useEffect, useState } from "react";
import "./TweetInFeed.css";
import golf from "../images/golf.png";
import canoe from "../images/canoe.png";
import { defaultImgs } from "../defaultimgs";
import { Icon } from "web3uikit";
import { useMoralis } from "react-moralis";

const TweetInFeed = ({ profile }) => {
    const [tweetArr, setTweetArr] = useState([]);
    const { Moralis, account } = useMoralis();

    useEffect(() => {
        const getTweets = async () => {
            try {
                const Tweets = Moralis.Object.extend("Tweets");
                const query = new Moralis.Query(Tweets);
                if (profile) {
                    query.equalTo("tweeterAcc", account);
                }
                const results = await query.find();

                setTweetArr(results);
                console.log("results", results);
            } catch (error) {
                console.error(error);
            }
        };

        getTweets();
    }, [profile]);

    return (
        <>
            {tweetArr
                ?.map((tweet, index) => {
                    return (
                        <div className="feedTweet" key={index}>
                            <img
                                src={
                                    tweet.attributes.tweeterPfp ??
                                    defaultImgs[0]
                                }
                                alt="profilePic"
                                className="profilePic"
                            />
                            <div className="completeTweet">
                                <div className="who">
                                    {tweet.attributes.tweeterUserName ??
                                        "Juhizzz"}
                                    <div className="accWhen">
                                        {`
                                        ${tweet.attributes.tweeterAcc.slice(
                                            0,
                                            4
                                        )}...${tweet.attributes.tweeterAcc.slice(
                                            38
                                        )} - 
                                    ${tweet.attributes.createdAt.toLocaleString(
                                        "en-US",
                                        { month: "short" }
                                    )}
                                    ${tweet.attributes.createdAt.toLocaleString(
                                        "en-US",
                                        { month: "numeric" }
                                    )}
                                    `}
                                    </div>
                                </div>
                                <div className="tweetContent">
                                    {tweet.attributes.tweetText}
                                    {tweet.attributes.tweetImage && (
                                        <img
                                            src={tweet.attributes.tweetImage}
                                            className="tweetImg"
                                            alt="golf"
                                        />
                                    )}
                                </div>
                                <div className="interactions">
                                    <div className="interactionNums">
                                        <Icon
                                            fill="#3f3f3f"
                                            size={20}
                                            svg="messageCircle"
                                        />
                                    </div>
                                    <div className="interactionNums">
                                        <Icon
                                            fill="#3f3f3f"
                                            size={20}
                                            svg="star"
                                        />
                                        12
                                    </div>
                                    <div className="interactionNums">
                                        <Icon
                                            fill="#3f3f3f"
                                            size={20}
                                            svg="matic"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
                .reverse()}
            {/* <div className="feedTweet">
                <img
                    src={defaultImgs[0]}
                    alt="profilePic"
                    className="profilePic"
                />
                <div className="completeTweet">
                    <div className="who">
                        Juhizzz
                        <div className="accWhen">0x42...314 &bull; 1h</div>
                    </div>
                    <div className="tweetContent">
                        Nice day golfing today! Shot 73 (+2)
                        <img src={golf} className="tweetImg" alt="golf" />
                    </div>
                    <div className="interactions">
                        <div className="interactionNums">
                            <Icon
                                fill="#3f3f3f"
                                size={20}
                                svg="messageCircle"
                            />
                        </div>
                        <div className="interactionNums">
                            <Icon fill="#3f3f3f" size={20} svg="star" />
                            12
                        </div>
                        <div className="interactionNums">
                            <Icon fill="#3f3f3f" size={20} svg="matic" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="feedTweet">
                <img
                    src={defaultImgs[0]}
                    alt="profilePic"
                    className="profilePic"
                />
                <div className="completeTweet">
                    <div className="who">
                        Juhizzz
                        <div className="accWhen">0x42...314 &bull; 1h</div>
                    </div>
                    <div className="tweetContent">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam feugiat, arcu eget facilisis convallis, nisi nibh
                        fringilla metus, vitae consequat augue est et ex. Mauris
                        aliquam velit risus, quis efficitur turpis porta nec.
                        Donec sodales nisi erat, non interdum justo interdum sit
                        amet. Nulla massa dolor, mattis at lacus vitae,
                        consectetur dictum mi. Vestibulum dictum ut arcu id
                        aliquam. Etiam efficitur ipsum non tortor tristique,
                        consectetur viverra nisl elementum. Curabitur nulla
                        sapien, accumsan nec nisl maximus, vestibulum porta
                        erat. Etiam a erat et risus rhoncus venenatis at eget
                        tortor. Praesent facilisis urna sit amet interdum
                        mollis.
                    </div>
                    <div className="interactions">
                        <div className="interactionNums">
                            <Icon
                                fill="#3f3f3f"
                                size={20}
                                svg="messageCircle"
                            />
                        </div>
                        <div className="interactionNums">
                            <Icon fill="#3f3f3f" size={20} svg="star" />
                            12
                        </div>
                        <div className="interactionNums">
                            <Icon fill="#3f3f3f" size={20} svg="matic" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="feedTweet">
                <img
                    src={defaultImgs[0]}
                    alt="profilePic"
                    className="profilePic"
                />
                <div className="completeTweet">
                    <div className="who">
                        Juhizzz
                        <div className="accWhen">0x42...314 &bull; 1h</div>
                    </div>
                    <div className="tweetContent">My First Tweet!</div>
                    <div className="interactions">
                        <div className="interactionNums">
                            <Icon
                                fill="#3f3f3f"
                                size={20}
                                svg="messageCircle"
                            />
                        </div>
                        <div className="interactionNums">
                            <Icon fill="#3f3f3f" size={20} svg="star" />
                            12
                        </div>
                        <div className="interactionNums">
                            <Icon fill="#3f3f3f" size={20} svg="matic" />
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default TweetInFeed;

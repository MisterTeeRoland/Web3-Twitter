import React, { useState, useRef } from "react";
import "./Home.css";
import { defaultImgs } from "../defaultimgs";
import { TextArea, Icon } from "web3uikit";
import TweetInFeed from "../components/TweetInFeed";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const Home = () => {
    const { Moralis } = useMoralis();
    const user = Moralis.User.current();
    const contractProcessor = useWeb3ExecuteFunction();

    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState();
    const [theFile, setTheFile] = useState();
    const [tweet, setTweet] = useState("");

    const maticTweet = async () => {
        if (!tweet) return;
        let img;
        if (theFile) {
            const data = theFile;
            const file = new Moralis.File(data.name, data);
            await file.saveIPFS();
            img = file.ipfs();
        } else {
            img = "No image";
        }

        let options = {
            contractAddress: "0xCC395B1462a6431EC4AB7B752E3eB8a313C4C5c7",
            functionName: "addTweet",
            abi: [
                {
                    inputs: [
                        {
                            internalType: "string",
                            name: "tweetText",
                            type: "string",
                        },
                        {
                            internalType: "string",
                            name: "tweetImg",
                            type: "string",
                        },
                    ],
                    name: "addTweet",
                    outputs: [],
                    stateMutability: "payable",
                    type: "function",
                },
            ],
            params: {
                tweetText: tweet,
                tweetImg: img,
            },
            msgValue: Moralis.Units.ETH(1),
        };

        await contractProcessor.fetch({
            params: options,
            onSuccess: () => {
                saveTweet();
            },
            onError: (err) => {
                console.log(err.data.message);
            },
        });
    };

    const saveTweet = async () => {
        if (!tweet) return;

        const Tweets = Moralis.Object.extend("Tweets");
        const newTweet = new Tweets();
        newTweet.set("tweetText", tweet);
        newTweet.set("tweeterPfp", user.attributes.twitter_pfp);
        newTweet.set("tweeterUserName", user.attributes.twitter_username);
        newTweet.set("tweeterAcc", user.attributes.ethAddress);

        if (theFile) {
            const data = theFile;
            const file = new Moralis.File(data.name, data);
            await file.saveIPFS();
            newTweet.set("tweetImage", file.ipfs());
        }

        await newTweet.save();
        window.location.reload();
    };

    const onImageClick = () => {
        inputFile.current.click();
    };

    const changeHandler = (e) => {
        const img = e.target.files[0];
        setTheFile(img);
        setSelectedFile(URL.createObjectURL(img));
    };

    return (
        <>
            <div className="pageIdentify">Home</div>
            <div className="mainContent">
                <div className="profileTweet">
                    <img
                        src={user.attributes.twitter_pfp ?? defaultImgs[0]}
                        alt="profilePic"
                        className="profilePic"
                    />
                    <div className="tweetBox">
                        <TextArea
                            label=""
                            name="tweetTxtArea"
                            value="What's happening?"
                            type="text"
                            width="95%"
                            onChange={(e) => setTweet(e.target.value)}
                        ></TextArea>

                        {selectedFile && (
                            <img
                                src={selectedFile}
                                alt="selectedFile"
                                className="tweetImg"
                            />
                        )}

                        <div className="imgOrTweet">
                            <div className="imgDiv" onClick={onImageClick}>
                                <input
                                    type="file"
                                    name="file"
                                    ref={inputFile}
                                    onChange={changeHandler}
                                    style={{ display: "none" }}
                                />
                                <Icon fill="#1DA1F2" size={20} svg="image" />
                            </div>
                            <div className="tweetOptions">
                                <div className="tweet" onClick={saveTweet}>
                                    Tweet
                                </div>
                                <div
                                    className="tweet"
                                    style={{ backgroundColor: "#8247e5" }}
                                    onClick={maticTweet}
                                >
                                    <Icon fill="#fff" size={20} svg="matic" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TweetInFeed profile={false} />
            </div>
        </>
    );
};

export default Home;

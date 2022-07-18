import React, { useState, useEffect, useRef } from "react";
import "./Settings.css";
import { Input } from "web3uikit";
import { defaultImgs } from "../defaultimgs";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const Settings = () => {
    const { Moralis, isAuthenticated, account } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    const user = Moralis.User.current();

    const [theFile, setTheFile] = useState();
    const [username, setUsername] = useState(
        user.attributes.twitter_username ?? ""
    );
    const [bio, setBio] = useState(user.attributes.twitter_bio ?? "");
    const [selectedPfp, setSelectedPfp] = useState(
        user.attributes.twitter_pfp ?? defaultImgs[0]
    );

    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState(
        user.attributes.twitter_banner ?? defaultImgs[1]
    );

    const [pfps, setPfps] = useState([]);

    const resolveLink = (url) => {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };

    useEffect(() => {
        const fetchNFTs = async () => {
            const options = {
                chain: "rinkeby",
                address: account,
            };

            const mumbaiNFTs = await Web3Api.account.getNFTs(options);
            const images = mumbaiNFTs.result
                .map((e) => {
                    return resolveLink(JSON.parse(e.metadata)?.image);
                })
                .filter((e) => e);

            console.log("images", images);
            setPfps(images);
        };

        fetchNFTs();
    }, [isAuthenticated, account]);

    const onBannerClick = () => {
        inputFile.current.click();
    };

    const changeHandler = (e) => {
        const img = e.target.files[0];
        setTheFile(img);
        setSelectedFile(URL.createObjectURL(img));
    };

    const saveEdits = async () => {
        const User = Moralis.Object.extend("_User");
        const query = new Moralis.Query(User);
        const myDetails = await query.first();

        if (bio) {
            myDetails.set("twitter_bio", bio);
        }

        if (username) {
            myDetails.set("twitter_username", username);
        }

        if (selectedPfp) {
            myDetails.set("twitter_pfp", selectedPfp);
        }

        if (theFile) {
            const data = theFile;
            const file = new Moralis.File(data.name, data);
            await file.saveIPFS();
            myDetails.set("twitter_banner", file.ipfs());
        }

        await myDetails.save();
        window.location.reload();
    };

    return (
        <>
            <div className="pageIdentify">Settings</div>
            <div className="settingsPage">
                <Input
                    label="Name"
                    name="nameChange"
                    width={"100%"}
                    labelBgColor={"#141d26"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    label="Bio"
                    name="bioChange"
                    width={"100%"}
                    labelBgColor={"#141d26"}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />

                <div className="pfp">
                    Profile Image (Your NFTs)
                    <div className="pfpOptions">
                        {pfps.map((pfp, index) => {
                            return (
                                <div key={index}>
                                    <img
                                        src={pfp}
                                        className={
                                            selectedPfp === pfp
                                                ? "pfpOptionSelected"
                                                : "pfpOption"
                                        }
                                        onClick={() => {
                                            setSelectedPfp(pfps[index]);
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="pfp">
                    Profile Banner
                    <div className="pfpOptions">
                        <img
                            src={selectedFile}
                            className="banner"
                            onClick={onBannerClick}
                        />
                        <input
                            type="file"
                            name="file"
                            ref={inputFile}
                            onChange={changeHandler}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>

                <div className="save" onClick={() => saveEdits()}>
                    Save
                </div>
            </div>
        </>
    );
};

export default Settings;
